import React, { Component } from 'react';

class Message extends Component {
  render() {
    const singleMsg = this.props.message;
    const {content, username, type} = singleMsg;
    console.log(`Incoming message type is: ${type}`)
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">
            {content}
          </span>
        </div>
        <div className="message system"> 
          System message here
        </div>
      </main>
    );
  }
}
export default Message;
