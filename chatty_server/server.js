"use strict";
// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const broadcast = function (data) {
    wss.clients.forEach(client => {
      client.send(JSON.stringify(data))
  });
};



// Create the WebSockets server
const wss = new SocketServer({ server });



wss.on('connection', (ws) => {
  console.log('Client connected');
  // ws.send("Connected to server");
    ws.on('message', (message) => {
      let objmessage = JSON.parse(message);
      let id = uuid.v4();
      objmessage.id = id ;
      console.log(objmessage)

    broadcast(objmessage);

    })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

