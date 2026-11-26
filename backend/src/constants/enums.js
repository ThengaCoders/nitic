/**
 * Database schema enums matching prisma/schema.prisma
 */

const EventStatus = Object.freeze({
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
});

const RegistrationStatus = Object.freeze({
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED'
});

const RegistrationFieldType = Object.freeze({
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
  URL: 'URL',
  DATE: 'DATE',
  BOOLEAN: 'BOOLEAN',
  SELECT: 'SELECT',
  MULTI_SELECT: 'MULTI_SELECT'
});

module.exports = {
  EventStatus,
  RegistrationStatus,
  RegistrationFieldType
};
