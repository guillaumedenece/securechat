const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const expressConfig = require('./config/express');
const MysqlService = require('./services/MySQLService');

MysqlService.connect();
app.use(bodyParser.json());
require('./api')(app);

var sever = null;

if (expressConfig.useSSL) {
  var credentials = {
      key: fs.readFileSync(config.ssl.privateKey),
      cert: fs.readFileSync(config.ssl.certificate)
  };
  server = require('https').createServer(credentials, app);
} else {
  server = require('http').createServer(app);
}

server.listen(expressConfig.port, () => {
  console.log('Server listening on port: ' + expressConfig.port);
});

process.on('SIGINT', function() {
  MysqlService.disconnect();
  process.exit();
});
