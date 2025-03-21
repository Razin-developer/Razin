import 'dotenv/config'; // Import environment variables
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import path from 'path';
import MongoStore from 'connect-mongo';

// Importing routes
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.route.js';
import { decodeBody } from './middlewares/bodyDecoding.middleware.js';

// Initializing port
const port = process.env.PORT || 3000;

// Setting up the express app
const app = express();

// Connecting to the database
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/razin";
const __dirname = path.resolve();
const htmlPath = path.join(__dirname, '/frontend/dist/index.html');
const staticPath = path.join(__dirname, '/frontend/dist');

console.log(htmlPath);
console.log(__dirname);
console.log(staticPath);

if (!mongoUri) {
    throw new Error('MongoURI is missing');
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log('Error connecting to the database: ', err);
    process.exit(1);
  });

// Setting up the server with middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Important if using cookies or sessions
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_key", // Use a secure secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoUri, // Store sessions in MongoDB
    ttl: 24 * 60 * 60, // Session TTL (1 day)
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, 
    secure: false, // Secure in production
    httpOnly: true 
  }
}));

app.use(passport.initialize());
app.use(decodeBody);

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientID || !clientSecret) {
  console.error('Google Client ID or Secret is missing');
  process.exit(1);
}

passport.use(new GoogleStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/api/auth/google/callback',
  scope: ['email', 'profile'],
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.serializeUser((users, done) => {
  done(null, users);
});

passport.deserializeUser((users: any, done) => {
  done(null, users);
});

// App routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(staticPath));
  app.get("*", (req, res) => {
    res.sendFile(htmlPath);
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
