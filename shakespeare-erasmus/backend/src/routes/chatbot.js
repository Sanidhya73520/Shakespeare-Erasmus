const express = require('express');
const router = express.Router();

router.post('/answer', async (req, res) => {
  try {
    const { sessionId, questionNumber, selectedAnswer, allAnswers } = req.body;
    
    res.json({
      success: true,
      message: 'Answer processed - AI integration pending'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error processing answer' });
  }
});

router.post('/match', async (req, res) => {
  try {
    const { answers } = req.body;
    
    res.json({
      success: true,
      message: 'Character matching - AI integration pending'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error matching character' });
  }
});

module.exports = router;
