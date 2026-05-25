const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const seedCharacters = require('./seedCharacters');

dotenv.config();

const app = express();

// KIOSK-FRIENDLY RATE LIMITING
// Because the 3 physical kiosks will share the same public Wi-Fi IP,
// we drastically increase the limits to prevent the kiosks from being blocked
// while still providing a baseline protection against massive botnets.

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // Very high limit for the shared kiosk IP
  message: { error: 'Too many requests from this IP, please try again later.' }
});

const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500, // 500 messages per minute across all 3 kiosks is safe
  message: { error: 'Too many messages from this stage, traveller. Please wait a minute.' }
});


// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:3000',
  // Add your production domain here when deployed, e.g.:
  // 'https://shakespeare-erasmus.netlify.app',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, same-origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow any Netlify / Render / Vercel preview URL
    if (/\.netlify\.app$/.test(origin) || /\.vercel\.app$/.test(origin) || /\.onrender\.com$/.test(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // permissive during development
  },
  credentials: true
}));

// Security HTTP headers
app.use(helmet());

// Body parser
app.use(express.json({ limit: '1mb' })); // Limit body size to prevent payload crashing
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Apply global rate limiting
app.use('/api', globalLimiter);

app.use(logger);

// Database Connection — MongoDB Atlas cloud
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 50,
  serverSelectionTimeoutMS: 10000, // fail fast if Atlas unreachable
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ MongoDB Atlas connected — flowers will be saved permanently!');
    seedCharacters(); // Seed characters on connection
  })
  .catch(err => console.error('❌ MongoDB Atlas connection error:', err));

// Apply rate limiting middleware
app.use('/api/characters/chat', chatLimiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flowers', require('./routes/flowers'));
app.use('/api/events', require('./routes/events'));
app.use('/api/characters', require('./routes/characters'));
app.use('/api/globe', require('./routes/globe'));
app.use('/api/journey', require('./routes/journey'));
app.use('/api/chatbot', require('./routes/chatbot')); // AI team integration point

// Error Handling
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // In a production serverless environment like Vercel, the process exits automatically after the request.
  // For long-running servers, close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = app;
