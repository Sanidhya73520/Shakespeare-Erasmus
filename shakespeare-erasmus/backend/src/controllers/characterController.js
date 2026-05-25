const mongoose = require('mongoose');
const Character = require('../models/Character');
const charactersFallback = require('../data/charactersData');

function makeLocalBotResponse(message, context) {
  const text = message.toLowerCase();
  const name = context.characterName || 'the guide';
  const country = context.country || 'our homeland';
  const title = context.characterTitle || 'the messenger';
  const costume = context.costume || 'A beautiful traditional costume.';
  const background = context.background || 'I am a cultural guide reborn.';
  const quote = context.quote || 'All the world’s a stage, and every country waits its cue.';
  const role = context.role || 'Guardian';
  const topics = Array.isArray(context.topics) ? context.topics : ['culture', 'stories', 'theatre'];

  const greetings = ["hi", "hello", "hey", "greetings", "howdy", "hola", "bonjour", "heyy"];
  if (greetings.some(g => text === g || text.startsWith(g + " ") || text.endsWith(" " + g))) {
    return `Greetings, traveller! I am ${name}, the ${title} of ${country}. How may I grace thy journey this day?`;
  }

  if (text.includes(country.toLowerCase())) {
    return `Ah, thou askest of my homeland, ${country}! Let it be known: ${background} On this stage, my role is that of a ${role}, and we speak of ${topics.join(" or ")}.`;
  }

  if (text.includes("costume") || text.includes("wear") || text.includes("clothing") || text.includes("dress") || text.includes("garment") || text.includes("clothes")) {
    return `Good eye, noble guest. In ${country}, my raiment speaks before my tongue: ${costume}`;
  }

  if (text.includes("story") || text.includes("background") || text.includes("who are you") || text.includes("identity") || text.includes("history")) {
    return `Hear then my tale: ${background} Thus do I stride as ${name}, known upon this stage as ${title}.`;
  }

  if (text.includes("quote") || text.includes("say") || text.includes("speech") || text.includes("monologue") || text.includes("verse")) {
    return `I would proclaim: “${quote}”`;
  }

  if (text.includes("topic") || text.includes("talk") || text.includes("ask") || text.includes("suggest") || text.includes("subject")) {
    return `Ask me of ${topics.join(", ")}, and I shall dress each answer in velvet words and golden meaning.`;
  }

  if (text.includes("role") || text.includes("job") || text.includes("do you do")) {
    return `On this grand stage, my role is that of a ${role}. I guard the cultural essence of ${country}.`;
  }

  if (text.includes("shakespeare") || text.includes("erasmus") || text.includes("festival") || text.includes("bard")) {
    return `Indeed! ShakespearErasmus bridges the immortal verses of the Bard with the vibrant cultures of Europe and beyond, creating a grand stage of learning and art!`;
  }

  const fallbacks = [
    `By my quill and cloak, thy query of “${message}” stirs the soul. In the spirit of ${country}, let us remember that all the world's a stage, and we are but travellers seeking truth.`,
    `A fascinating question, friend! Speaking from the heart of ${country}, I say: let culture be a living theatre where every story and song takes the stage.`,
    `Thy words, “${message},” echo with curiosity. Here in ${country}, we weave history into art. Shall we talk of ${topics[0]} or perhaps ${topics[1] || 'our heritage'}?`,
    `To speak of “${message}” is to open a new scroll. In my role as ${role}, I bid thee look closer at the beauty of ${country} and its poetic soul.`,
    `As the curtain rises on thy thoughts, I answer: in ${country}, we believe that language and learning are the ultimate bridges between worlds.`
  ];

  const hash = message.length + (country.length || 0);
  return fallbacks[hash % fallbacks.length];
}

exports.getAllCharacters = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const characters = await Character.find();
      res.json({ success: true, data: characters });
    } else {
      console.warn("MongoDB is offline. Returning characters from fallback data.");
      res.json({ success: true, data: charactersFallback });
    }
  } catch (err) {
    next(err);
  }
};

exports.getCharacterById = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const character = await Character.findById(req.params.id);
      if (!character) return res.status(404).json({ error: 'Not found' });
      res.json({ success: true, data: character });
    } else {
      console.warn("MongoDB is offline. Searching character in fallback data.");
      const term = req.params.id.toLowerCase().replace(/[^a-z0-9]/g, '');
      const character = charactersFallback.find(c => 
        c.name.toLowerCase().replace(/[^a-z0-9]/g, '') === term || 
        c.country.toLowerCase().replace(/[^a-z0-9]/g, '') === term
      );
      if (!character) {
        const index = parseInt(req.params.id);
        if (!isNaN(index) && index >= 0 && index < charactersFallback.length) {
          return res.json({ success: true, data: charactersFallback[index] });
        }
        return res.status(404).json({ error: 'Not found' });
      }
      res.json({ success: true, data: character });
    }
  } catch (err) {
    next(err);
  }
};

exports.matchCharacter = async (req, res, next) => {
  try {
    const characters = await Character.find();
    const match = characters.length > 0 ? characters[0] : null;
    res.json({ success: true, data: { character: match } });
  } catch (err) {
    next(err);
  }
};

exports.getCharacterResponse = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        response: `Placeholder response for emotion: ${req.params.emotion}`
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.createCharacter = async (req, res, next) => {
  try {
    const char = new Character(req.body);
    await char.save();
    res.status(201).json({ success: true, data: char });
  } catch (err) {
    next(err);
  }
};

exports.chatWithCharacter = async (req, res, next) => {
  try {
    const {
      message,
      country,
      characterName,
      characterTitle,
      role,
      costume,
      background,
      topics,
      history = []
    } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const ollamaUrl = process.env.OLLAMA_API_URL;
    const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2:3b';
    const ollamaKey = process.env.OLLAMA_API_KEY || '';

    // If Ollama is NOT configured, use the high-performance local responder (fail-safe)
    if (!ollamaUrl) {
      const reply = makeLocalBotResponse(message, {
        country,
        characterName,
        characterTitle,
        role,
        costume,
        background,
        topics,
        quote: req.body.quote
      });
      return res.json({ success: true, reply });
    }

    // Call Hosted Ollama API
    const systemPrompt = `You are the Shakespearasmus Cultural Guide — Shakespeare reborn in ${country}, known as ${characterName}.
IDENTITY: You wear ${costume}. Your background: ${background}. Your role: ${role}. Your title: ${characterTitle}.
PERSONALITY: Poetic, theatrical, and warm, but remaining clear, friendly, and easy to understand. Keep all responses under 80 words.
LANGUAGE: Respond in English by default. If the user writes in another language, reply in that same language.
OFF-TOPIC: If asked anything unrelated to Shakespeare, culture, theatre, or your background, politely redirect back to the stage.`;

    const headers = { 'Content-Type': 'application/json' };
    if (ollamaKey) headers.Authorization = `Bearer ${ollamaKey}`;

    const cleanHistory = (history || [])
      .filter((item) => item && ["user", "assistant"].includes(item.role) && typeof item.content === "string")
      .slice(-10)
      .map((item) => ({ role: item.role, content: item.content.slice(0, 1000) }));

    const messages = [
      { role: 'system', content: systemPrompt },
      ...cleanHistory,
      { role: 'user', content: message.slice(0, 2000) }
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second safety timeout

    try {
      const upstream = await fetch(ollamaUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ model: ollamaModel, messages, stream: false }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await upstream.json().catch(() => ({}));
      if (!upstream.ok) {
        throw new Error(data.error || 'Hosted Ollama request failed');
      }

      const reply = data.message?.content?.trim() || data.response?.trim() || data.reply?.trim() || 'The muse is quiet for this moment.';
      return res.json({ success: true, reply });
    } catch (apiError) {
      console.warn("Hosted Ollama failed; using local fail-safe responder:", apiError.message);
      const reply = makeLocalBotResponse(message, {
        country,
        characterName,
        characterTitle,
        role,
        costume,
        background,
        topics,
        quote: req.body.quote
      });
      return res.json({ success: true, reply });
    }
  } catch (err) {
    next(err);
  }
};
