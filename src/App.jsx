import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [], // messages coming from the server will be stored here as they arrive
      socket: {},
      clientCounter: 0,
      color: ''
    };
    this.updateMessageList = this.updateMessageList.bind(this);
    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  componentDidMount() {

    //conenct to the Websocket server at port 3001
    const socket = new WebSocket('ws://localhost:3001/');

    socket.onopen = function() {
    };

    //when recieving new message from WS server
    socket.onmessage = incomingData => {

      // The socket data is encoded as a JSON string, parse back into JSON object
      const parsedMsg = JSON.parse(incomingData.data);

      switch (parsedMsg.type) {
        case 'incomingMessage':
          // handle incoming message
          this.updateMessageList(parsedMsg);
          break;

        case 'incomingNotification':
          // handle incoming notification
          this.updateMessageList(parsedMsg);
          break;

        case 'counter':
          // handle live connected clients
          let currentClients = parsedMsg.connectedClients;
          this.setState({ clientCounter: currentClients });
          break;

        case 'color':
          // handle WS server assigned color for current user
          if (this.state.color === '' && parsedMsg.color)
            this.setState({ color: parsedMsg.color });
          break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    };

    this.setState({ socket: socket });
  }

  // Method to update message list with incoming WS message
  updateMessageList(message) {
    const oldMessage = this.state.messages;
    const newMessage = [...oldMessage, message];
    this.setState({ messages: newMessage });
  }

  // Method to add new message
  addNewMessage(newMsg) {
    //add color style to the msg for every msg
    newMsg.color = this.state.color;
    //send to WS server for postMessage
    this.state.socket.send(JSON.stringify(newMsg));
  }

  // Method to update current user name
  updateName(newName) {
    const Name = { currentUser: { name: newName.username } };
    this.setState(Name);
    //send to WS server for postNotification
    this.state.socket.send(JSON.stringify(newName));
  }

  render() {
    return (
      <div>
        <Navbar clientCounter={this.state.clientCounter} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          addNewMessage={this.addNewMessage}
          updateName={this.updateName}
        />
      </div>
    );
  }
}

export default App;
