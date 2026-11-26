# Public Event Registration Module

This module implements public event field retrieval, participant registration with strict server-side validation, ticket generation placeholders, and an embeddable JavaScript widget.

---

## 1. File Structure in `backend/`

```text
backend/
├── src/
│   ├── constants/
│   │   └── enums.js                         # EventStatus, RegistrationStatus, RegistrationFieldType
│   ├── services/
│   │   └── eventRegistrationService.js      # Service placeholders with detailed Prisma specs for colleagues
│   ├── controllers/
│   │   └── eventRegistrationController.js   # Controllers, validation logic, & ticket helper
│   ├── routes/
│   │   └── publicEventRoutes.js             # Thin Express routes
│   ├── widget/
│   │   ├── widget.js                        # Self-contained, responsive, Shadow-DOM isolated widget
│   │   └── demo.html                        # Demo host website page
│   └── server.js                            # Express application setup
├── tests/
│   └── test-registration.js                 # Unit tests (100% pass)
└── package.json
```

---

## 2. API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/public/events/:eventId/fields` | Fetch dynamic fields ordered by `displayOrder` |
| `POST` | `/api/public/events/:eventId/register` | Validate and submit participant registration |

---

## 3. Service Layer Implementation Guide (For Colleagues)

The service stubs are located in [eventRegistrationService.js](file:///home/jefincodes/projects/nitic/backend/src/services/eventRegistrationService.js). Each function has detailed instructions and sample Prisma code:

1. **`getPublicEvent(eventId)`**:
   - Query Prisma `Event` table by `id`.
   - Include count of active registrations (`currentRegistrationsCount`) to enforce `capacity`.
   - Return `null` if event is not found.
2. **`getRegistrationFields(eventId)`**:
   - Query Prisma `RegistrationField` where `eventId = eventId`.
   - Order by `displayOrder ASC`.
   - Return: `id`, `name`, `key`, `type`, `isRequired`, `options`, `displayOrder`.
3. **`createRegistration(eventId, data)`**:
   - Execute in a `prisma.$transaction`.
   - Find or create `Participant` by `email`.
   - Create `Registration` record (`status: data.initialStatus`).
   - Create `RegistrationFieldValue` records for each `{ fieldId, value }`.
4. **`ticketService.generateTicket(registrationId)`**:
   - Verify registration is `CONFIRMED`.
   - Generate unique `qrToken`.
   - Insert `Ticket` record into DB.

---

## 4. Embeddable JavaScript Widget

- Static script served from: `http://localhost:5000/widget/widget.js` (and `http://localhost:5173/widget.js` via Vite public).
- Demo page: Open [demo.html](file:///home/jefincodes/projects/nitic/backend/src/widget/demo.html) in your browser.

### How Organizers Embed the Widget:

```html
<!-- 1. Mount point -->
<div id="event-registration"></div>

<!-- 2. Embed script -->
<script
  src="http://localhost:5000/widget/widget.js"
  data-event-id="YOUR_EVENT_ID"
  data-target="event-registration"
  data-api-base="http://localhost:5000/api/public">
</script>
```
