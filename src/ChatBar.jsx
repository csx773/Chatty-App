import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    //let currentName= this.props.currentUser;
    
    //when user enter new message and press enter
    const onPressEnter = (event) => {
      if (event.key == 'Enter'){
        console.log('Pressed enter key!!!')
        const messageInputElm = event.target;
        const messageInput = event.target.value
        console.log(messageInputElm);
        let newMessageObj = {
          content: messageInput, 
          username: this.props.currentUser
        }
        this.props.addNewMessage(newMessageObj)
        //clear the input field
        messageInputElm.value = ''
      }      
    };

    const onNameKeyPress = (event) => {
      //should call parent function updateName() to pass in change
      let newName = event.target.value;
      console.log(newName);
      this.props.updateName(newName);
    }
    
    return (
      <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder={this.props.currentUser}
            name="userName"
            onChange = {onNameKeyPress}
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
