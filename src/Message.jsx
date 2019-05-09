import React, { Component } from 'react';

class Message extends Component {
  render() {
   
    //start of new code
    const incomingData = this.props.message;
    const dataType = incomingData.type;
    const userColor = this.props.message.color;
    const colorStyle = {color: userColor}

    console.log(`<Message> Incoming data type is: ${dataType}`)

    let displayContent = (dataType === 'incomingMessage') ?
      <div className="message">
        <span className="message-username" style={colorStyle}> {incomingData.username} </span>
        <span className="message-content">
          {incomingData.content}
        </span>
      </div>
    :
      <div className="message system"> 
        {<div className="message system"> 
          {incomingData.previousName} changed name to {incomingData.username}
        </div>}
      </div>
    ;

    //end of new code
    return (
      <main className="messages">
        {displayContent}
      </main>
    );
  }
}
export default Message;
