/**
 * Public Event & Registration Routes
 */

const express = require('express');
const {
  getRegistrationFields,
  registerParticipant
} = require('../controllers/eventRegistrationController');

const router = express.Router();

/**
 * @route   GET /api/public/events/:eventId/fields
 * @desc    Fetch event-specific registration fields ordered by displayOrder
 * @access  Public
 */
router.get('/events/:eventId/fields', getRegistrationFields);

/**
 * @route   POST /api/public/events/:eventId/register
 * @desc    Submit participant registration for an event
 * @access  Public
 */
router.post('/events/:eventId/register', registerParticipant);

module.exports = router;
