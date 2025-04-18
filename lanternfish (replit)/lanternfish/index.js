
require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const path = require('path');

const app = express();
app.use(express.json());

const { decrypt } = require('./utils/cipher');
const openai = new OpenAI({ apiKey: decrypt(process.env.OPENAI_KEY) });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const conversations = new Map();

app.post('/chat', async (req, res) => {
  try {
    const sessionId = req.body.sessionId || 'default';
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, []);
    }
    
    const history = conversations.get(sessionId);
    history.push({ role: 'user', content: req.body.prompt });
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: history
    });
    
    const assistantMessage = response.choices[0].message;
    history.push(assistantMessage);
    
    res.json({ message: assistantMessage.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});
