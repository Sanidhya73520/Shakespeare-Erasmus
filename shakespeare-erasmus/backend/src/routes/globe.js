const express = require('express');
const router = express.Router();
const globeController = require('../controllers/globeController');

router.get('/countries', globeController.getAllCountries);
router.get('/countries/:id', globeController.getCountryById);
router.get('/participants/:countryId', globeController.getParticipants);

module.exports = router;
