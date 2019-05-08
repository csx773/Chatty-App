import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    const currentUser= this.props.currentUser;
    
    //when user enter new message and press enter
    const onPressEnter = (event) => {
      if (event.key == 'Enter'){
        console.log('Pressed enter key!!!')
        const messageInputElm = event.target;
        const messageInput = event.target.value
        console.log(messageInputElm);
        let newMessageObj = {
          content: messageInput, 
          username: currentUser
        }
        this.props.addNewMessage(newMessageObj)
        //clear the input field
        messageInputElm.value = ''
      }      
    };
    
    return (
      <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            defaultValue= {currentUser}
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
