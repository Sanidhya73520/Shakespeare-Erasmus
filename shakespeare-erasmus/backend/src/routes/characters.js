const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/', characterController.getAllCharacters);
router.get('/:id', characterController.getCharacterById);
router.post('/match', characterController.matchCharacter);
router.get('/:id/emotion/:emotion', characterController.getCharacterResponse);
router.post('/', characterController.createCharacter);
router.post('/chat', characterController.chatWithCharacter);

module.exports = router;
