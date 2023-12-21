// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { SessionsClient } = require('dialogflow').v2beta1;

// const app = express();
// const port = 3000;

// // Middleware to parse JSON requests
// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes

// // Replace 'YOUR_PROJECT_ID' and 'YOUR_CREDENTIALS_JSON_FILE' with your Dialogflow project ID and credentials file
// const projectId = 'neuzmail';
// const credentials = require('./cred.json');
// const knowledgeConnectorName = 'projects/neuzmail/knowledgeBases/MTE1NDQxMDYyODE3OTkyNTQwMTY';

// // Function to generate a random session ID
// function generateSessionId() {
//   return Math.random().toString(36).substring(7);
// }

// // Route for handling text queries
// app.post('/text-query', async (req, res) => {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ error: 'Text is required in the request body.' });
//   }

//   try {
//     const sessionClient = new SessionsClient({ credentials });
//     const sessionId = generateSessionId();
//     const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//     const request = {
//       session: sessionPath,
//       queryInput: {
//         text: {
//           text,
//           languageCode: 'en-US',
//         },
//       },
//       queryParams: {
//         knowledgeBaseNames: [knowledgeConnectorName],
//       },
//     };

//     const responses = await sessionClient.detectIntent(request);

//     const result = responses[0].queryResult;
//     res.json({ response: result.fulfillmentText, "status": "success" });
//   } catch (error) {
//     console.error('Error processing the request:', error);
//     res.status(500).json({ "status": "timeout" , "message": "Internal server error. Please try again later."});
    
//   }
// });

// // Route for root path
// app.get('/', (req, res) => {
//   res.send('Hi, I am live.');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

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
