import React, { Component } from 'react';

class Message extends Component {
  render() {
   
    //start of new code
    let incomingData = this.props.message;
    const dataType = incomingData.type;
    const userColor = this.props.message.color;
    const colorStyle = {color: userColor}

    //start of feature-image
    const regex = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/;
    let isImage = incomingData.content
    console.warn(isImage);
    isImage = isImage.search(regex);
    console.warn(`Result of isImage is: ${isImage}`);

    if (isImage != -1){
      console.log('Message is an image, now packing into img container')
      return <div className='image-container'> <img src={incomingData.content} alt="message-image" width="80%"/></div>
    }


    // end of feature-image
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
