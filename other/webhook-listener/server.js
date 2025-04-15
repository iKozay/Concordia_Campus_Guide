require('dotenv').config();

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = 3000;
const SECRET_TOKEN = process.env.GITHUB_WEBHOOK_SECRET;
console.log(SECRET_TOKEN);
if (!SECRET_TOKEN) {
  console.error('Error: GITHUB_WEBHOOK_SECRET is not set in .env file.');
}

// Apply body-parser normally, but with verification only on /webhook
app.use('/webhook', bodyParser.json({ verify: verifySignature }));
app.use(bodyParser.json()); // Normal body parsing for other routes

let currentProcess = null; // Track the currently running deployment

app.post('/webhook', (req, res) => {
  const payload = req.body;

  // Check if the push event is to the main branch
  if (payload.ref === 'refs/heads/main') {
    console.log('Push to main branch detected. Pulling changes...');

    // If a deployment is already running, kill it and start fresh
    if (currentProcess) {
      console.log('Aborting current deployment...');
      currentProcess.kill('SIGTERM'); // Gracefully terminate the process
    }

    const logFilePath = './logfile.log';
    // Pull the latest changes and deploy your app (or do other actions)
    currentProcess = exec('cd ~ && ./deploy.sh', (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        fs.appendFileSync(logFilePath, err);
        return res.status(500).send('Error pulling code');
      }
      console.log(stdout);
      fs.appendFileSync(logFilePath, stdout);
      currentProcess = null; // Reset process tracker
      res.status(200).send('Deployed successfully');
    });
  } else {
    res.status(200).send('Not a push to main branch');
  }
});

app.get('/release/ConcordiaCampusGuide.apk', (req, res) => {
  const filePath = path.join(__dirname, 'release', 'ConcordiaCampusGuide.apk');

  // Send the file for download
  res.download(filePath, 'ConcordiaCampusGuide.apk', (err) => {
    if (err) {
      console.error(`File download error: ${err}`);
      res.status(500).send('Error downloading the file');
    }
  });
});

app.get('/release/ccg_android.png', (req, res) => {
  const imagePath = path.join(__dirname, 'release', 'ccg_android.png');

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(`Error serving image: ${err}`);
      res.status(500).send('Error rendering the image');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


/////////////////////////////////////////////////////
// Util functions

function verifySignature(req, res, buf, encoding) {
  const signature = req.headers['x-hub-signature-256']; // Get signature from GitHub request

  if (!signature) {
    console.error('No signature found.');
    return res.status(400).send('Missing signature');
  }

  // Compute expected signature
  const expectedSignature =
    'sha256=' +
    crypto.createHmac('sha256', SECRET_TOKEN).update(buf).digest('hex');

  // Securely compare the received and expected signatures
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    console.error('Invalid signature. Possible tampering detected.');
    return res.status(403).send('Invalid signature');
  }
}
