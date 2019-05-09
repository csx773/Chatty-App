import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [], // messages coming from the server will be stored here as they arrive
      socket: {}
    };
    this.updateMessageList = this.updateMessageList.bind(this);
    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateName = this.updateName.bind(this);

  }

  
  componentDidMount() {
    console.log("componentDidMount <App />");

    //conenct to the Websocket server at port 3001
    const socket = new WebSocket('ws://localhost:3001/');
    
    socket.onopen = function() {
      console.log('<App> Opened new connnection to WS server')
    }
    
    //when recieving new message from WS server
    socket.onmessage = (incomingData) => {
      console.log('<App> recieved new incomingData from WS server')
      console.log( JSON.parse(incomingData.data))
      
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const parsedMsg = JSON.parse(incomingData.data)
      
      switch(parsedMsg.type) {
        case "incomingMessage":
        // handle incoming incomingData
          console.log('SWITCH case type: incomingMessage')
          this.updateMessageList(parsedMsg);        
          break;

        case "incomingNotification":
          // handle incoming notification
          console.log('SWITCH case type: incomingNotification')
          this.updateMessageList(parsedMsg);
          break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    }
  
    this.setState({socket: socket})
  }
  
  //update message list with incoming WS message
  updateMessageList(message) {
    console.log('<APP> updateMessageList ')
    // console.log(message)
    const oldMessage = this.state.messages;
    const newMessage = [...oldMessage, message];
    this.setState({ messages: newMessage });
  
  }

  //method to add new message
  addNewMessage(newMsg) {
    console.log("INSIDE addNewMessage() <App />");
    console.warn(newMsg);

    //NOTE: all data send to WS server must be in string/JSON string 
    this.state.socket.send(JSON.stringify(newMsg));
  }

  updateName(newName){
    console.log('INSIDE APP updateName()')
    console.log(newName);
    const tempName = {currentUser: { name: newName.username }}
    this.setState(tempName);
    //send to WS server for postNotification
    this.state.socket.send(JSON.stringify(newName));
  }

  
  render() {
    return (
      <div>
        <Navbar />
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
