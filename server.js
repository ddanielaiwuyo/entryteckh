require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 6989;

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('[db] Connected to MongoDB — daniel_michael'))
  .catch((err) => console.error('[db] Connection error:', err));

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await Contact.create({ name, email, message });
    console.log(`[contact] Saved — ${name} <${email}>`);

    await transporter.sendMail({
      from: `"EntryTech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thanks for reaching out!',
      text: `Hey ${name},\n\nThanks for reaching out — shortly we'll reach out to you to choose a time you'd want to discuss.\n\nSpeak soon,\nEntryTech`,
      html: `
        <p>Hey ${name},</p>
        <p>Thanks for reaching out — shortly we'll reach out to you to choose a time you'd want to discuss.</p>
        <p>Speak soon,<br/><strong>EntryTech</strong></p>
      `,
    });
    console.log(`[email] Confirmation sent to ${email}`);

    res.json({ success: true, message: "Thanks! I'll get back to you soon." });
  } catch (err) {
    console.error('[contact] Error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
