const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Route to handle incoming messages and interact with GPT-3.5-turbo
app.post('/chat', async (req, res) => {
  try {
    const systemMessage = fs.readFileSync('./content.txt', 'utf8').trim();

    const params = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: req.body.message},
      ],
      temperature: req.body.temperature || 0.7,
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', params, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
    });

    // res.json(response.data.choices[0].message);
    
    res.json({ response: response.data.choices[0].message, "status": "success" });
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ "status": "timeout" , "message": "Internal server error. Please try again later."});
    
  }
});

// Route for root path
app.get('/', (req, res) => {
  res.send('Hi, I am live.');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
