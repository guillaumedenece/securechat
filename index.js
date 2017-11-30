const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const expressConfig = require('./config/express');
const MysqlService = require('./services/MySQLService');

MysqlService.connect();
app.use(bodyParser.json());
require('./api')(app);

const server = require('http').createServer(app);

server.listen(expressConfig.port, () => {
  console.log('Server listening on port: ' + expressConfig.port);
});

process.on('SIGINT', function() {
  MysqlService.disconnect();
  process.exit();
});
