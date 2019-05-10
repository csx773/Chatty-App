/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class Message extends Component {
  render() {
   
    // Setting variable to use 
    let incomingData = this.props.message;
    const dataType = incomingData.type;
    const userColor = this.props.message.color;
    const colorStyle = {color: userColor}

    // Testing if incomingData contains an image URL
    const regex = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/;
    let isImage = incomingData.content
    // Error checking to filter out incomingNotification
    if(isImage != undefined){
      isImage = isImage.search(regex);  
      if (isImage != -1){
        // IncomingData contains image URL, now packing into container and render to page
        return (
          <div className="message">
            <span className="message-username" style={colorStyle}> {incomingData.username} </span>
            <span className="message-content">
              <div className='image-container'> 
                <img src={incomingData.content} alt="message-image" width="60%"/>
              </div>
            </span>
          </div>
        )
      }
    }

    // Filter incomingData by type and render to page
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

    return (
      <main className="messages">
        {displayContent}
      </main>
    );
  }
}
export default Message;
