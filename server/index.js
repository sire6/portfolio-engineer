require('dotenv').config();
const express = require('express');
const { execFile } = require('child_process');
const cors = require('cors');
const app = express();

// Enable CORS for all origins (for Docker Compose frontend-backend communication)
app.use(cors());
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/send-telegram', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const data = JSON.stringify({
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  });

  execFile(
    'curl',
    [
      '-X', 'POST',
      url,
      '-H', 'Content-Type: application/json',
      '-d', data,
      '--max-time', '10'
    ],
    (error, stdout, stderr) => {
      if (error) {
        console.error('Telegram curl error:', error, stderr);
        return res.status(500).json({ ok: false, error: error.message });
      }
      try {
        const result = JSON.parse(stdout);
        if (result.ok) {
          res.json({ ok: true, result });
        } else {
          res.status(500).json({ ok: false, error: result.description });
        }
      } catch (parseErr) {
        res.status(500).json({ ok: false, error: 'Invalid response from Telegram' });
      }
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
