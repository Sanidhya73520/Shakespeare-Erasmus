const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journeyController');

router.post('/', journeyController.createJourney);
router.get('/:sessionId', journeyController.getJourney);
router.put('/:sessionId', journeyController.updateJourney);
router.post('/:sessionId/complete', journeyController.completeJourney);

module.exports = router;
