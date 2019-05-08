// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
//UUID generator
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`WS Server Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//function to for .on("message") to send to all clients
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('New client connected');

  //handling incoming messages
  ws.on('message', function incoming(message) {
    console.log('WS Got new message!')
    let UID = uuidv4();
    const parsedMessage = JSON.parse(message)

    let sendMessageData = {
        id: UID, 
        content: parsedMessage.content,
        username: parsedMessage.username
    }
    console.log(sendMessageData)
    wss.broadcast(JSON.stringify(sendMessageData));

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});