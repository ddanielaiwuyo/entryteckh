const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 6989;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const submission = { name, email, message, timestamp: new Date().toISOString() };

  const filePath = path.join(__dirname, 'submissions.json');
  let submissions = [];
  if (fs.existsSync(filePath)) {
    try {
      submissions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      submissions = [];
    }
  }
  submissions.push(submission);
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

  console.log(`[contact] New message from ${name} <${email}>`);
  res.json({ success: true, message: "Thanks! I'll get back to you soon." });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
