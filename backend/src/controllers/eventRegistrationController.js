/**
 * Event Registration Controller
 * 
 * Handles public event registration fields retrieval, participant submission,
 * strict controller-level validations, and ticket-generation helper orchestration.
 */

const { EventStatus, RegistrationStatus, RegistrationFieldType } = require('../constants/enums');
const {
  getPublicEvent,
  getRegistrationFields: fetchRegistrationFieldsFromService,
  createRegistration,
  ticketService
} = require('../services/eventRegistrationService');

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{7,25}$/;

/**
 * Checks if a value is a valid URL
 */
function isValidUrl(val) {
  if (typeof val !== 'string') return false;
  try {
    const parsed = new URL(val);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Checks if a value is a valid ISO/calendar Date
 */
function isValidDate(val) {
  if (typeof val !== 'string' && !(val instanceof Date)) return false;
  const time = Date.parse(val);
  return !isNaN(time);
}

/**
 * Extracts allowed values list from field options definition
 * Supports both string arrays and [{ label, value }] object arrays
 */
function extractAllowedOptionValues(options) {
  if (!options) return [];
  if (Array.isArray(options)) {
    return options.map(opt => {
      if (typeof opt === 'object' && opt !== null && opt.value !== undefined) {
        return String(opt.value);
      }
      return String(opt);
    });
  }
  return [];
}

// =============================================================================
// TICKET GENERATION HELPER
// =============================================================================

/**
 * Helper function to trigger ticket generation for confirmed free registrations.
 * Call this function only for confirmed free registrations.
 * 
 * @param {string} registrationId
 * @returns {Promise<{ ticketGenerated: boolean, ticket: object }>}
 */
async function generateTicketForRegistration(registrationId) {
  if (!registrationId) {
    throw new Error('registrationId is required for ticket generation');
  }

  // ===========================================================================
  // TODO: [COLLEAGUE IMPLEMENTATION]
  // 1. Invoke your service-layer ticket generation function:
  // 2. Add any platform-specific notification triggers (e.g., send confirmation email).
  // 3. Return the generated ticket object to be included in the response.
  // ===========================================================================
  const ticket = await ticketService.generateTicket(registrationId);

  return {
    ticketGenerated: true,
    ticket
  };
}

// =============================================================================
// CONTROLLER: Fetch Registration Fields
// =============================================================================

/**
 * GET /api/public/events/:eventId/fields
 * 
 * Fetches event-specific registration fields, ordered by displayOrder,
 * omitting internal database fields.
 */
async function getRegistrationFields(req, res) {
  try {
    const { eventId } = req.params;

    // 1. Validate event ID
    if (!eventId || typeof eventId !== 'string' || eventId.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing event ID.'
      });
    }

    // 2. Fetch event fields via service placeholder
    const fields = await fetchRegistrationFieldsFromService(eventId.trim());

    if (!fields || !Array.isArray(fields)) {
      return res.status(404).json({
        success: false,
        message: 'No registration fields found for the specified event.'
      });
    }

    // 3. Sort fields by displayOrder ascending
    const sortedFields = [...fields].sort((a, b) => {
      const orderA = typeof a.displayOrder === 'number' ? a.displayOrder : 0;
      const orderB = typeof b.displayOrder === 'number' ? b.displayOrder : 0;
      return orderA - orderB;
    });

    // 4. Sanitize to return only public/required properties:
    //    Include id, name, key, type, isRequired, options, and displayOrder.
    //    Do not expose internal DB info (e.g. eventId, createdAt, updatedAt).
    const publicFields = sortedFields.map(field => ({
      id: field.id,
      name: field.name,
      key: field.key,
      type: field.type,
      isRequired: Boolean(field.isRequired),
      options: field.options || null,
      displayOrder: field.displayOrder
    }));

    return res.status(200).json({
      success: true,
      data: publicFields
    });
  } catch (error) {
    console.error('Error fetching registration fields:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve event registration fields.',
      error: error.message
    });
  }
}

// =============================================================================
// CONTROLLER: Submit Registration
// =============================================================================

/**
 * POST /api/public/events/:eventId/register
 * 
 * Validates participant info and dynamic fields server-side, verifies event state,
 * creates registration via service layer, and triggers ticket generation if free.
 */
async function registerParticipant(req, res) {
  try {
    const { eventId } = req.params;

    // 1. Validate Event ID
    if (!eventId || typeof eventId !== 'string' || eventId.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'A valid event ID is required.'
      });
    }

    // 2. Fetch Event details & validate event state before calling service
    const event = await getPublicEvent(eventId.trim());
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.'
      });
    }

    // Ensure event is OPEN
    if (event.status !== EventStatus.OPEN) {
      return res.status(422).json({
        success: false,
        message: `Registration is not available. Event status is ${event.status}.`
      });
    }

    // Check registration time window
    const now = new Date();
    if (event.registrationStartAt && now < new Date(event.registrationStartAt)) {
      return res.status(400).json({
        success: false,
        message: `Registration has not opened yet. It will open at ${new Date(event.registrationStartAt).toISOString()}.`
      });
    }

    if (event.registrationEndAt && now > new Date(event.registrationEndAt)) {
      return res.status(400).json({
        success: false,
        message: `Registration closed on ${new Date(event.registrationEndAt).toISOString()}.`
      });
    }

    // Check capacity
    if (
      event.capacity !== null &&
      event.capacity !== undefined &&
      typeof event.currentRegistrationsCount === 'number' &&
      event.currentRegistrationsCount >= event.capacity
    ) {
      return res.status(400).json({
        success: false,
        message: 'Event registration is closed because capacity has been reached.'
      });
    }

    // 3. Extract and validate Participant Name & Email
    const body = req.body || {};
    const participantName = body.name || (body.participant && body.participant.name);
    const participantEmail = body.email || (body.participant && body.participant.email);
    const submittedFields = body.fields || {};

    const validationErrors = [];

    if (!participantName || typeof participantName !== 'string' || participantName.trim() === '') {
      validationErrors.push({
        field: 'name',
        message: 'Participant full name is required.'
      });
    } else if (participantName.trim().length > 100) {
      validationErrors.push({
        field: 'name',
        message: 'Participant full name must not exceed 100 characters.'
      });
    }

    if (!participantEmail || typeof participantEmail !== 'string' || !EMAIL_REGEX.test(participantEmail.trim())) {
      validationErrors.push({
        field: 'email',
        message: 'A valid email address is required.'
      });
    }

    // 4. Fetch dynamic RegistrationField definitions to validate custom fields
    const configuredFields = await fetchRegistrationFieldsFromService(eventId.trim());
    const fieldMapByKey = new Map();
    configuredFields.forEach(field => {
      fieldMapByKey.set(field.key, field);
    });

    // Check for unknown field keys
    const submittedKeys = Object.keys(submittedFields);
    for (const key of submittedKeys) {
      if (!fieldMapByKey.has(key)) {
        validationErrors.push({
          field: key,
          message: `Unknown registration field: '${key}'. This field is not configured for this event.`
        });
      }
    }

    // Enforce required fields & type validations for each configured field
    const validatedFieldValues = [];

    for (const [key, field] of fieldMapByKey.entries()) {
      const rawValue = submittedFields[key];
      const isProvided = rawValue !== undefined && rawValue !== null && rawValue !== '';

      // A. Enforce isRequired
      if (field.isRequired) {
        if (!isProvided) {
          validationErrors.push({
            field: key,
            message: `${field.name} is required.`
          });
          continue;
        }

        // For MULTI_SELECT, empty array also counts as missing
        if (field.type === RegistrationFieldType.MULTI_SELECT && Array.isArray(rawValue) && rawValue.length === 0) {
          validationErrors.push({
            field: key,
            message: `${field.name} is required. Please select at least one option.`
          });
          continue;
        }
      }

      // If not required and not provided, skip type validation
      if (!isProvided) {
        continue;
      }

      // B. Validate value according to RegistrationFieldType
      let parsedValue = rawValue;

      switch (field.type) {
        case RegistrationFieldType.TEXT: {
          if (typeof rawValue !== 'string') {
            validationErrors.push({
              field: key,
              message: `${field.name} must be a text string.`
            });
          } else {
            parsedValue = rawValue.trim();
          }
          break;
        }

        case RegistrationFieldType.NUMBER: {
          const num = Number(rawValue);
          if (isNaN(num) || !isFinite(num) || typeof rawValue === 'boolean') {
            validationErrors.push({
              field: key,
              message: `${field.name} must be a valid number.`
            });
          } else {
            parsedValue = num;
          }
          break;
        }

        case RegistrationFieldType.EMAIL: {
          if (typeof rawValue !== 'string' || !EMAIL_REGEX.test(rawValue.trim())) {
            validationErrors.push({
              field: key,
              message: `${field.name} must be a valid email address.`
            });
          } else {
            parsedValue = rawValue.trim().toLowerCase();
          }
          break;
        }

        case RegistrationFieldType.PHONE: {
          if (typeof rawValue !== 'string' || !PHONE_REGEX.test(rawValue.trim())) {
            validationErrors.push({
              field: key,
              message: `${field.name} must be a valid phone number (e.g., +1234567890).`
            });
          } else {
            parsedValue = rawValue.trim();
          }
          break;
        }

        case RegistrationFieldType.URL: {
          if (!isValidUrl(rawValue)) {
            validationErrors.push({
              field: key,
              message: `${field.name} must be a valid URL starting with http:// or https://.`
            });
          } else {
            parsedValue = String(rawValue).trim();
          }
          break;
        }

        case RegistrationFieldType.DATE: {
          if (!isValidDate(rawValue)) {
            validationErrors.push({
              field: key,
              message: `${field.name} must be a valid date.`
            });
          } else {
            parsedValue = new Date(rawValue).toISOString();
          }
          break;
        }

        case RegistrationFieldType.BOOLEAN: {
          if (typeof rawValue !== 'boolean') {
            if (rawValue === 'true' || rawValue === 1 || rawValue === '1') {
              parsedValue = true;
            } else if (rawValue === 'false' || rawValue === 0 || rawValue === '0') {
              parsedValue = false;
            } else {
              validationErrors.push({
                field: key,
                message: `${field.name} must be a boolean (true/false).`
              });
            }
          }
          break;
        }

        case RegistrationFieldType.SELECT: {
          const allowedValues = extractAllowedOptionValues(field.options);
          const submittedStr = String(rawValue);
          if (allowedValues.length > 0 && !allowedValues.includes(submittedStr)) {
            validationErrors.push({
              field: key,
              message: `${field.name} contains invalid option '${submittedStr}'. Allowed options: [${allowedValues.join(', ')}].`
            });
          } else {
            parsedValue = submittedStr;
          }
          break;
        }

        case RegistrationFieldType.MULTI_SELECT: {
          if (!Array.isArray(rawValue)) {
            validationErrors.push({
              field: key,
              message: `${field.name} must be an array of selected options.`
            });
          } else {
            const allowedValues = extractAllowedOptionValues(field.options);
            const invalidSelections = [];

            for (const item of rawValue) {
              const itemStr = String(item);
              if (allowedValues.length > 0 && !allowedValues.includes(itemStr)) {
                invalidSelections.push(itemStr);
              }
            }

            if (invalidSelections.length > 0) {
              validationErrors.push({
                field: key,
                message: `${field.name} contains invalid option(s): [${invalidSelections.join(', ')}]. Allowed options: [${allowedValues.join(', ')}].`
              });
            } else {
              parsedValue = rawValue;
            }
          }
          break;
        }

        default:
          parsedValue = rawValue;
          break;
      }

      // Collect validated field value mapped to field.id
      validatedFieldValues.push({
        fieldId: field.id,
        key: field.key,
        value: parsedValue // Prisma schema defines RegistrationFieldValue.value as Json
      });
    }

    // 5. If any validation errors exist, reject immediately with 400 Bad Request
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for registration submission.',
        errors: validationErrors
      });
    }

    // 6. Registration workflow:
    // Determine initial status based on registrationFee
    const isFree = Number(event.registrationFee) === 0;
    const initialStatus = isFree ? RegistrationStatus.CONFIRMED : RegistrationStatus.PENDING;

    // Call service layer to create Participant, Registration, and save RegistrationFieldValues
    const registration = await createRegistration(eventId.trim(), {
      participant: {
        name: participantName.trim(),
        email: participantEmail.trim().toLowerCase()
      },
      fieldValues: validatedFieldValues,
      initialStatus
    });

    // 7. Check registrationFee
    // If registrationFee > 0, return paymentRequired: true and pending registration details. Do not generate ticket.
    if (!isFree) {
      return res.status(201).json({
        success: true,
        paymentRequired: true,
        message: 'Registration submitted successfully. Payment is required to confirm your registration and issue a ticket.',
        data: {
          registrationId: registration.id,
          status: registration.status,
          fee: event.registrationFee,
          participant: {
            name: participantName.trim(),
            email: participantEmail.trim().toLowerCase()
          }
        }
      });
    }

    // If registrationFee === 0, proceed with ticket generation
    const ticketResult = await generateTicketForRegistration(registration.id);

    return res.status(201).json({
      success: true,
      paymentRequired: false,
      message: 'Registration confirmed and ticket generated successfully.',
      data: {
        registrationId: registration.id,
        status: registration.status,
        ticket: ticketResult.ticket
      }
    });

  } catch (error) {
    console.error('Error during participant registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing registration.',
      error: error.message
    });
  }
}

module.exports = {
  getRegistrationFields,
  registerParticipant,
  generateTicketForRegistration
};
