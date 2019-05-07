import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Message />
        <ChatBar />
      </div>
    );
  }
}
export default App;
