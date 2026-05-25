const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const flowerController = require('../controllers/flowerController');

const plantLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // 50 plantings per 5 mins
  message: { error: 'Thy legacy is already blooming. Please wait before planting another flower.' }
});

router.post('/', plantLimiter, flowerController.plantFlower);
router.get('/', flowerController.getAllFlowers);
router.get('/search', flowerController.searchFlowers);
router.get('/stats', flowerController.getStats);
router.get('/:id', flowerController.getFlowerById);
router.put('/:id/like', flowerController.likeFlower);
router.delete('/:id', flowerController.deleteFlower);

module.exports = router;
