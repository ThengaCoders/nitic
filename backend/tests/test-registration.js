/**
 * Unit Test Suite for Event Registration Controller & Validations
 * Uses Node.js built-in test runner (zero external dependencies).
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  getRegistrationFields,
  registerParticipant,
  generateTicketForRegistration
} = require('../src/controllers/eventRegistrationController');

function createMockReqRes({ params = {}, body = {} } = {}) {
  const req = { params, body };
  const res = {
    statusCode: 200,
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.data = payload;
      return this;
    }
  };
  return { req, res };
}

test('getRegistrationFields: returns fields sorted by displayOrder and sanitized', async () => {
  const { req, res } = createMockReqRes({ params: { eventId: 'evt_101' } });
  await getRegistrationFields(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.data.success, true);
  assert.ok(Array.isArray(res.data.data));
  assert.ok(res.data.data.length > 0);

  // Check displayOrder ordering
  for (let i = 0; i < res.data.data.length - 1; i++) {
    assert.ok(res.data.data[i].displayOrder <= res.data.data[i + 1].displayOrder);
  }

  // Ensure internal fields (e.g. eventId, createdAt, updatedAt) are NOT leaked
  const firstField = res.data.data[0];
  assert.ok(firstField.id);
  assert.ok(firstField.name);
  assert.ok(firstField.key);
  assert.ok(firstField.type);
  assert.equal(firstField.eventId, undefined);
  assert.equal(firstField.createdAt, undefined);
  assert.equal(firstField.updatedAt, undefined);
});

test('getRegistrationFields: rejects missing/empty eventId', async () => {
  const { req, res } = createMockReqRes({ params: { eventId: '   ' } });
  await getRegistrationFields(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.data.success, false);
});

test('registerParticipant: validates required participant name and email', async () => {
  const { req, res } = createMockReqRes({
    params: { eventId: 'evt_101' },
    body: {
      name: '',
      email: 'not-an-email',
      fields: {}
    }
  });

  await registerParticipant(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.data.success, false);
  const errors = res.data.errors;
  assert.ok(errors.some(e => e.field === 'name'));
  assert.ok(errors.some(e => e.field === 'email'));
});

test('registerParticipant: rejects unknown dynamic field keys', async () => {
  const { req, res } = createMockReqRes({
    params: { eventId: 'evt_101' },
    body: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      fields: {
        college: 'Stanford',
        phoneNumber: '+1987654321',
        agreeTerms: true,
        hackerField: 'malicious-data' // Not configured
      }
    }
  });

  await registerParticipant(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.data.success, false);
  const unknownError = res.data.errors.find(e => e.field === 'hackerField');
  assert.ok(unknownError);
  assert.match(unknownError.message, /Unknown registration field/);
});

test('registerParticipant: validates required dynamic fields', async () => {
  const { req, res } = createMockReqRes({
    params: { eventId: 'evt_101' },
    body: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      fields: {
        // Missing required 'college', 'phoneNumber', and 'agreeTerms'
      }
    }
  });

  await registerParticipant(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.data.success, false);
  assert.ok(res.data.errors.some(e => e.field === 'college'));
  assert.ok(res.data.errors.some(e => e.field === 'phoneNumber'));
  assert.ok(res.data.errors.some(e => e.field === 'agreeTerms'));
});

test('registerParticipant: validates field types (URL, NUMBER, SELECT, MULTI_SELECT)', async () => {
  const { req, res } = createMockReqRes({
    params: { eventId: 'evt_101' },
    body: {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      fields: {
        college: 'Harvard',
        phoneNumber: '+1122334455',
        agreeTerms: true,
        linkedinUrl: 'not-a-valid-url',
        experienceYears: 'five', // invalid number
        tShirtSize: 'XXXXL', // invalid select option
        workshops: ['NonExistentWorkshop'] // invalid multi-select option
      }
    }
  });

  await registerParticipant(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.data.success, false);
  assert.ok(res.data.errors.some(e => e.field === 'linkedinUrl'));
  assert.ok(res.data.errors.some(e => e.field === 'experienceYears'));
  assert.ok(res.data.errors.some(e => e.field === 'tShirtSize'));
  assert.ok(res.data.errors.some(e => e.field === 'workshops'));
});

test('registerParticipant: successful free registration generates ticket immediately', async () => {
  const { req, res } = createMockReqRes({
    params: { eventId: 'evt_101' },
    body: {
      name: 'Diana Prince',
      email: 'diana@example.com',
      fields: {
        college: 'Themyscira Institute',
        phoneNumber: '+19876543210',
        tShirtSize: 'M',
        workshops: ['AI & ML', 'Cybersecurity'],
        linkedinUrl: 'https://linkedin.com/in/dianaprince',
        experienceYears: 5,
        dob: '1995-05-15',
        agreeTerms: true
      }
    }
  });

  await registerParticipant(req, res);

  assert.equal(res.statusCode, 201);
  assert.equal(res.data.success, true);
  assert.equal(res.data.paymentRequired, false);
  assert.ok(res.data.data.registrationId);
  assert.ok(res.data.data.ticket);
  assert.ok(res.data.data.ticket.qrToken);
});

test('registerParticipant: paid registration requires payment and does not generate ticket', async () => {
  const { req, res } = createMockReqRes({
    params: { eventId: 'evt_paid_101' },
    body: {
      name: 'Bruce Wayne',
      email: 'bruce@wayne-enterprises.com',
      fields: {
        college: 'Gotham University',
        phoneNumber: '+19998887777',
        agreeTerms: true
      }
    }
  });

  await registerParticipant(req, res);

  assert.equal(res.statusCode, 201);
  assert.equal(res.data.success, true);
  assert.equal(res.data.paymentRequired, true);
  assert.equal(res.data.data.fee, 75);
  assert.equal(res.data.data.ticket, undefined);
  assert.equal(res.data.data.status, 'PENDING');
});

test('registerParticipant: rejects when event is closed', async () => {
  const { req, res } = createMockReqRes({
    params: { eventId: 'evt_closed_101' },
    body: {
      name: 'Clark Kent',
      email: 'clark@dailyplanet.com',
      fields: {
        college: 'Metropolis U',
        phoneNumber: '+11112223333',
        agreeTerms: true
      }
    }
  });

  await registerParticipant(req, res);

  assert.equal(res.statusCode, 422);
  assert.equal(res.data.success, false);
  assert.match(res.data.message, /status is CLOSED/);
});

test('registerParticipant: rejects when event capacity is reached', async () => {
  const { req, res } = createMockReqRes({
    params: { eventId: 'evt_full_101' },
    body: {
      name: 'Barry Allen',
      email: 'barry@starlabs.com',
      fields: {
        college: 'Central City U',
        phoneNumber: '+15556667777',
        agreeTerms: true
      }
    }
  });

  await registerParticipant(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.data.success, false);
  assert.match(res.data.message, /capacity has been reached/);
});
