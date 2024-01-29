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
const cors = require('cors');
const dotenv = require('dotenv'); // Add this line

const cheerio = require('cheerio');


dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Route to handle incoming messages and interact with GPT-3.5-turbo
app.post('/chat', async (req, res) => {
  try {
    const systemMessage = fs.readFileSync('./content.txt', 'utf8').trim();

    const params = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: req.body.message },
      ],
      temperature: req.body.temperature || 0.7,
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', params, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable
      },
    });

    res.json({ response: response.data.choices[0].message, "status": "success" });
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ "status": "timeout", "message": "Internal server error. Please try again later." });
  }
});

// Route for the root path
app.get('/', (req, res) => {
  res.send('Hi, I am live.');

});


app.post('/michael-the-home-buyer/mhb-advisor/instruction', async function (req, res) {

  try {
    // Assuming JSON data is expected in the request body
    // const caughtResponse = req.body.data;

    // Log the caught response (customize this part based on your needs)
    // console.log('Caught Response:', caughtResponse);

    const apiUrl = 'https://api.michaelthehomebuyer.ca/michael-the-home-buyer/faqs/2698621122';
    const response = await axios.get(apiUrl);

    const apiResponse = response.data[0].values[0].value;

    console.log('API Response:', apiResponse);

    const $ = cheerio.load(apiResponse);
    const plainText = $.text();

    // Update the text in the file
    const filePath = "./content.txt"; // Replace with the actual file path
    fs.writeFileSync(filePath, plainText, 'utf8');

    console.log('File updated with plain text:', plainText);

    const apiUrl2 = 'https://api.michaelthehomebuyer.ca/michael-the-home-buyer/faqs/2693909249';
    const response2 = await axios.get(apiUrl2);
    console.log(response2.data.length);
    newData = "";

    newData += "\n\n\nBelow are the FAQs.\n\n\n" 

    for (var i = 0; i < response2.data.length; i += 2) {
      var tempQuestion = cheerio.load(response2.data[i].values[0].value).text();
      var tempAnswers = cheerio.load(response2.data[i + 1].values[0].value).text();
      newData += tempQuestion + "\n" + tempAnswers + "\n\n";
    
    }
    // fs.appendFile(filePath, newData, 'utf8');
    fs.appendFile(filePath, newData, function (err) {
      if (err) throw err;
      console.log('Data appended to file!');
    });

    console.log("New Data " + newData);



    res.status(200).json({ message: 'File updated with plain text' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
