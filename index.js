/*
 * Homework Assignment #1
 *
 */

const http = require('http');
const httpHandler = require('./http-handler');

const httpServer = http.createServer(httpHandler);

httpServer.listen(3000, function(){
  console.log('HTTP server listening is on port 3000.');
});
