require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const winston = require('winston');
const morgan = require('morgan');

// ─── Logger ──────────────────────────────────────────────────────────────────

const logger = winston.createLogger({
  levels: { ...winston.config.npm.levels, http: 4 },
  level: process.env.LOG_LEVEL || 'http',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, stack }) =>
      stack
        ? `${timestamp} [${level}]: ${message}\n${stack}`
        : `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

// ─── HTTP request logging ─────────────────────────────────────────────────────

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    const { name, email } = req.body || {};
    return name ? `(${name} / ${email})` : '';
  }
  return '';
});

const httpLogger = morgan(
  ':method :url :status :res[content-length]b — :response-time ms :body',
  { stream: { write: (msg) => logger.http(msg.trim()) } }
);

// ─── App setup ────────────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 6989;

app.use(express.json());
app.use(httpLogger);
app.use(express.static(path.join(__dirname, 'dist')));

// ─── MongoDB ──────────────────────────────────────────────────────────────────

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info('MongoDB connected — daniel_michael'))
  .catch((err) => logger.error('MongoDB connection failed', err));

mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'));
mongoose.connection.on('reconnected', () => logger.info('MongoDB reconnected'));

const contactSchema = new mongoose.Schema(
  { name: { type: String, required: true }, email: { type: String, required: true }, message: { type: String, required: true } },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

// ─── Nodemailer ───────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

transporter.verify((err) => {
  if (err) logger.warn(`Email transporter not ready: ${err.message}`);
  else logger.info(`Email ready — sending from ${process.env.EMAIL_USER}`);
});

// ─── Routes ───────────────────────────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  logger.info(`Contact form received from ${name} <${email}>`);

  if (!name || !email || !message) {
    logger.warn('Contact form rejected — missing fields');
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await Contact.create({ name, email, message });
    logger.info(`Contact saved to DB — ${email}`);

    await transporter.sendMail({
      from: `"EntryTech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for reaching out!',
      text: `Hey ${name},\n\nThanks for reaching out — shortly we'll reach out to you to choose a time you'd want to discuss.\n\nSpeak soon,\nEntryTech`,
      html: `<p>Hey ${name},</p><p>Thanks for reaching out — shortly we'll reach out to you to choose a time you'd want to discuss.</p><p>Speak soon,<br/><strong>EntryTech</strong></p>`,
    });
    logger.info(`Confirmation email sent to ${email}`);

    res.json({ success: true, message: "Thanks! I'll get back to you soon." });
  } catch (err) {
    logger.error(`Contact form error for ${email}: ${err.message}`, err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ─── Unhandled errors ─────────────────────────────────────────────────────────

process.on('unhandledRejection', (err) => logger.error('Unhandled rejection', err));
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err);
  process.exit(1);
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => logger.info(`EntryTech running at http://localhost:${PORT}`));
