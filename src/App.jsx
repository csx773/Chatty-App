import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';


const tempData = {
  currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: Math.random().toString().substr(2, 7),
      username: 'Bob',
      content: 'Has anyone seen my marbles?'
    },
    {
      id: Math.random().toString().substr(2, 7),
      username: 'Anonymous',
      content:
        'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    }
  ]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Chris"},
      messages: [], // messages coming from the server will be stored here as they arrive
      socket: {}
    };
    this.updateMessageList = this.updateMessageList.bind(this);
    this.addNewMessage = this.addNewMessage.bind(this);

  }

  
  componentDidMount() {
    console.log("componentDidMount <App />");

    //conenct to the Websocket server at port 3001
    const socket = new WebSocket('ws://localhost:3001/');
    
    socket.onopen = function() {
      console.log('<App> Opened new connnection to WS server')
    }
    
    //when recieving new message from WS server
    socket.onmessage = (message) => {
      console.log('<App> recieved new message from WS server')
      console.log( JSON.parse(message.data))
      const parsedMsg = JSON.parse(message.data)
      console.log(this.updateMessageList)
      this.updateMessageList(parsedMsg);
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
    //console.log(this.state);
    this.state.socket.send(JSON.stringify(newMsg));
  }

  

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser.name}
          addNewMessage={this.addNewMessage}
        />
      </div>
    );
  }
}

export default App;
