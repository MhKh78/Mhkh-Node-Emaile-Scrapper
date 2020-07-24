const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const testDate = require('./testData');

app.use(bodyParser.json());

app.get('/json', (req, res, next) => {
  res.json({
    lol: true,
    email: 'test@loli.io',
  });
});
app.get('/mock_json', (req, res, next) => {
  res.json(testDate);
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(8000);

server.on('listening', () => {
  console.log('Connected');
});

server.on('close', () => {
  console.log('Server Closing');
});

process.on('SIGINT', () => {
  server.close();
  process.exit(1);
});

process.on('unhandledRejection', () => {
  console.log('unhandledRejection');
  process.emit('SIGINT');
});
