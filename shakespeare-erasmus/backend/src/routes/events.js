const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/search', eventController.searchEvents);
router.get('/by-category/:category', eventController.getEventsByCategory);
router.post('/:id/register', eventController.registerEvent);
router.post('/', eventController.createEvent);

module.exports = router;
