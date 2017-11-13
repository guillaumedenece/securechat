const express = require('express');
const app = express();

const expressConfig = require('./config/express');

app.get('/', function(req, res) {
  res.send(JSON.stringify({'test':'etts'}));
});

const server = require('http').createServer(app);

server.listen(expressConfig.port, expressConfig.ip, () => {
  console.log('Server listening at: ' + expressConfig.ip + ':' + expressConfig.port);
});
