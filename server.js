const http = require('http');
const app = require('./app');     //import application
const port = 3000;

// Create server
const server = http.createServer(app);

// Start listening on port
server.listen(port);