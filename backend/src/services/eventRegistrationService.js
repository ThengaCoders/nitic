const { EventStatus, RegistrationStatus } = require('../constants/enums');

/**
 * =============================================================================
 * SERVICE REQUIREMENT: getPublicEvent(eventId)
 * =============================================================================
 * 
 * REQUIREMENTS FOR SERVICE LAYER IMPLEMENTATION:
 * 1. Database Query:
 *    - Query the `Event` table matching `id = eventId`.
 * 2. Capacity & Aggregation:
 *    - Query or aggregate the count of existing confirmed and pending registrations
 *      for this event (`currentRegistrationsCount`) so the controller can enforce capacity limits
 * 3. Validation:
 *    - Return `null` if no event matches `eventId`.
 * 4. Return Object Structure:
 *    - Must return an object with:
 *      {
 *        id: string,
 *        name: string,
 *        description: string,
 *        venue: string,
 *        startTime: Date | string,
 *        endTime: Date | string,
 *        registrationStartAt: Date | string | null,
 *        registrationEndAt: Date | string | null,
 *        capacity: number | null,
 *        registrationFee: number,
 *        status: 'DRAFT' | 'OPEN' | 'CLOSED' | 'COMPLETED' | 'CANCELLED',
 *        currentRegistrationsCount: number
 *      }
 * 5. Error Handling:
 *    - Any database connectivity errors should be thrown or passed to error handlers.
 */
async function getPublicEvent(eventId) {
  // TODO: [COLLEAGUE IMPLEMENTATION] Replace placeholder with actual database query via Prisma ORM

  // Placeholder stub for testing & controller coordination:
  const isPaid = eventId && eventId.includes('paid');
  const isClosed = eventId && eventId.includes('closed');
  const isFull = eventId && eventId.includes('full');

  return {
    id: eventId,
    name: "Tech Summit 2026",
    description: "Annual Engineering Conference",
    venue: "Main Auditorium",
    startTime: new Date(Date.now() + 86400000).toISOString(),
    endTime: new Date(Date.now() + 172800000).toISOString(),
    registrationStartAt: new Date(Date.now() - 86400000).toISOString(),
    registrationEndAt: new Date(Date.now() + 86400000).toISOString(),
    capacity: isFull ? 50 : 500,
    registrationFee: isPaid ? 75 : 0,
    status: isClosed ? EventStatus.CLOSED : EventStatus.OPEN,
    currentRegistrationsCount: isFull ? 50 : 42
  };
}

/**
 * =============================================================================
 * SERVICE REQUIREMENT: getRegistrationFields(eventId)
 * =============================================================================
 * 
 * REQUIREMENTS FOR SERVICE LAYER IMPLEMENTATION:
 * 1. Database Query:
 *    - Query the `RegistrationField` table matching `eventId = eventId`.
 * 2. Ordering:
 *    - Order the records by `displayOrder` in ascending order (`ASC`).
 * 3. Return Object Structure:
 *    - Return an array of field objects:
 *      [
 *        {
 *          id: string,
 *          eventId: string,
 *          name: string,
 *          key: string,
 *          type: 'TEXT' | 'NUMBER' | 'EMAIL' | 'PHONE' | 'URL' | 'DATE' | 'BOOLEAN' | 'SELECT' | 'MULTI_SELECT',
 *          isRequired: boolean,
 *          options: Array<string | { label: string, value: string }> | null,
 *          displayOrder: number
 *        }
 *      ]
 *    - If no fields are configured for the event, return an empty array `[]`.
 * 4. Error Handling:
 *    - Handle database errors gracefully and propagate to the caller.
 */
async function getRegistrationFields(eventId) {
  // TODO: [COLLEAGUE IMPLEMENTATION] Replace placeholder with actual database query via Prisma ORM

  // Placeholder stub returning sample fields matching all RegistrationFieldTypes:
  return [
    {
      id: "fld-1",
      eventId,
      name: "College / Organization",
      key: "college",
      type: "TEXT",
      isRequired: true,
      options: null,
      displayOrder: 1
    },
    {
      id: "fld-2",
      eventId,
      name: "Contact Phone Number",
      key: "phoneNumber",
      type: "PHONE",
      isRequired: true,
      options: null,
      displayOrder: 2
    },
    {
      id: "fld-3",
      eventId,
      name: "T-Shirt Size",
      key: "tShirtSize",
      type: "SELECT",
      isRequired: false,
      options: ["S", "M", "L", "XL", "XXL"],
      displayOrder: 3
    },
    {
      id: "fld-4",
      eventId,
      name: "Workshops of Interest",
      key: "workshops",
      type: "MULTI_SELECT",
      isRequired: false,
      options: ["AI & ML", "Cloud Architecture", "Cybersecurity", "Web3"],
      displayOrder: 4
    },
    {
      id: "fld-5",
      eventId,
      name: "LinkedIn Profile URL",
      key: "linkedinUrl",
      type: "URL",
      isRequired: false,
      options: null,
      displayOrder: 5
    },
    {
      id: "fld-6",
      eventId,
      name: "Years of Experience",
      key: "experienceYears",
      type: "NUMBER",
      isRequired: false,
      options: null,
      displayOrder: 6
    },
    {
      id: "fld-7",
      eventId,
      name: "Date of Birth",
      key: "dob",
      type: "DATE",
      isRequired: false,
      options: null,
      displayOrder: 7
    },
    {
      id: "fld-8",
      eventId,
      name: "Agree to Code of Conduct",
      key: "agreeTerms",
      type: "BOOLEAN",
      isRequired: true,
      options: null,
      displayOrder: 8
    }
  ];
}

/**
 * =============================================================================
 * SERVICE REQUIREMENT: createRegistration(eventId, data)
 * =============================================================================
 * 
 * REQUIREMENTS FOR SERVICE LAYER IMPLEMENTATION:
 * 1. Transaction Management:
 *    - Must execute within an atomic DB transaction (e.g. `prisma.$transaction`).
 * 2. Registration Creation:
 *    - Insert new record in `Registration` table
 * 3. RegistrationFieldValues Persistence:
 *    - For each item in `data.fieldValues` ({ fieldId, value }):
 *      - Insert into `RegistrationFieldValue` table:
 * 4. Return Object Structure:
 *    - Return the created registration record:
 *      {
 *        id: string,
 *        participantId: string,
 *        eventId: string,
 *        status: 'PENDING' | 'CONFIRMED',
 *        registeredAt: string | Date,
 *        participant: {
 *          id: string,
 *          name: string,
 *          email: string
 *        }
 *      }
 * 5. Rollback & Errors:
 *    - If any step fails, roll back the transaction and throw an error.
 */
async function createRegistration(eventId, data) {
  // TODO: [COLLEAGUE IMPLEMENTATION] Replace placeholder with transactional Prisma implementation

  // Placeholder stub returning created registration details:
  const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  return {
    id: registrationId,
    participantId: `part_${Date.now()}`,
    eventId,
    status: data.initialStatus || RegistrationStatus.CONFIRMED,
    registeredAt: new Date().toISOString(),
    participant: {
      id: `part_${Date.now()}`,
      name: data.participant.name,
      email: data.participant.email
    }
  };
}

/**
 * =============================================================================
 * SERVICE REQUIREMENT: ticketService.generateTicket(registrationId)
 * =============================================================================
 * 
 * REQUIREMENTS FOR SERVICE LAYER IMPLEMENTATION (TO BE IMPLEMENTED BY COLLEAGUE):
 * 1. Verification:
 *    - Query the `Registration` record by `registrationId`.
 *    - Ensure registration exists and status is `CONFIRMED`.
 * 2. Token Generation:
 *    - Generate a secure, unique, and cryptographically random QR token
 *      (e.g., `crypto.randomUUID()` or HMAC-signed payload).
 * 3. Ticket Record Creation:
 *    - Insert into `Ticket` table
 * 4. Return Object Structure:
 *    - Return ticket details:
 *      {
 *        id: string,
 *        registrationId: string,
 *        qrToken: string,
 *        issuedAt: string | Date
 *      }
 * 5. Error Handling:
 *    - Handle unique constraint violations or registration not found errors.
 */
const ticketService = {
  async generateTicket(registrationId) {
    // =========================================================================
    // TODO: [COLLEAGUE IMPLEMENTATION]
    // Implement ticket generation service logic as described in the requirements above.
    // =========================================================================
    const ticketId = `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`; // just a template only
    const qrToken = `QR_${registrationId}_${Date.now()}`; // just a template only
    return {
      id: ticketId,
      registrationId,
      qrToken,
      issuedAt: new Date().toISOString()
    };
  }
};

module.exports = {
  getPublicEvent,
  getRegistrationFields,
  createRegistration,
  ticketService
};
