const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const QRCode = require('qrcode'); // Import QR code library

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve the main HTML file
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// Handle POST request for QR code generation
app.post('/i', async function (req, res) {
  const { userInput } = req.body;

  try {
    // Generate QR Code as a base64 string
    const qrCodeData = await QRCode.toDataURL(userInput);
    res.json({ qrCodeData }); // Send QR code data as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate QR code');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});