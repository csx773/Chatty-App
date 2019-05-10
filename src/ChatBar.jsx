/* eslint-disable react/prop-types */
import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    
    // Handler for when user enter new message and press enter
    const onPressEnter = (event) => {
      if (event.key == 'Enter'){
        const messageInputElm = event.target;
        let newMessageObj = {
          content: messageInputElm.value, 
          username: this.props.currentUser, 
          type: 'postMessage'
        }
        this.props.addNewMessage(newMessageObj)
        // Clear the input field
        messageInputElm.value = ''
      }      
    };

    // Handler for when user changes name and press enter
    const onNameKeyPress = (event) => {
      if (event.key == 'Enter'){
        let newName = event.target.value;
        const newNameObj = {
          username: newName, 
          type: 'postNotification',
          previousName: this.props.currentUser
        }
        this.props.updateName(newNameObj);
      }
    }
    
    return (
      <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder={this.props.currentUser}
            name="userName"
            onKeyPress = {onNameKeyPress}
          />
          <input
            className="chatbar-message"
            placeholder="Type a message and hit ENTER"
            name="newMessage"
            onKeyPress={onPressEnter}
          />
      </footer>
    );
  }
}
export default ChatBar;
