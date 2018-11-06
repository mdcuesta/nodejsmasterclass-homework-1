/*
 * Homework Assignment #1
 *
 */

// Dependencies
const http = require('http');
const httpHandler = require('./http-handler');

// Instantiate HTTP server
const httpServer = http.createServer(httpHandler);

// Start HTTP server on port 3000
httpServer.listen(3000, function(){
  console.log('HTTP server listening is on port 3000.');
});
