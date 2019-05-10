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
  
  //find number of connected client
  let numClients = wss.clients.size
  console.log(`Number of connected clients are ${numClients}`)

  let currentClients = {
    id: uuidv4(),
    type: 'counter',
    connectedClients: numClients
  }
  console.log(currentClients)
  wss.broadcast(JSON.stringify(currentClients));

  //for assigning random color string to user name
  const colors = ["#C7E62E", "#397ABB", "#51547C", "#802505", "#2EE6BA", "#FE2018", "#FE18D0", "#1827FE"];
  var userColor = colors[Math.floor(Math.random()*colors.length)];
  const colorObj = {
    type: 'color',
    color: userColor
  }
  wss.broadcast(JSON.stringify(colorObj))
  


  //handling incoming messages
  ws.on('message', function incoming(message) {
    console.log('WS Got new message!')
    let UID = uuidv4();
    const parsedMessage = JSON.parse(message)
    //new filter for POST message and notification
    if (parsedMessage.type === 'postMessage'){
      var newType = 'incomingMessage'
    }
    else if (parsedMessage.type === 'postNotification' ){
      var newType = 'incomingNotification'
    } else {
      console.warn('ERROR on data type:',parsedMessage.type )
    }

    let sendData = {
      id: UID, 
      content: parsedMessage.content,
      username: parsedMessage.username,
      previousName: parsedMessage.previousName,
      type: newType, 
      color: parsedMessage.color
    }
    console.log(sendData)
    wss.broadcast(JSON.stringify(sendData));

    /// end of new code
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    
    let currentClients = {
      id: uuidv4(),
      type: 'counter',
      connectedClients: wss.clients.size
    }
    console.log(currentClients)
    wss.broadcast(JSON.stringify(currentClients));
  });
});