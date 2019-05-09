import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    
    //when user enter new message and press enter
    const onPressEnter = (event) => {
      if (event.key == 'Enter'){
        console.log('Pressed enter key!!!')
        const messageInputElm = event.target;
        const messageInput = event.target.value
        console.log(messageInputElm);
        let newMessageObj = {
          content: messageInput, 
          username: this.props.currentUser, 
          type: 'postMessage'
        }
        this.props.addNewMessage(newMessageObj)
        //clear the input field
        messageInputElm.value = ''
      }      
    };

    const onNameKeyPress = (event) => {
      //console.log('INSIDE onNameKeyPress')
      //should call parent function updateName() to pass in change
      if (event.key == 'Enter'){
        console.log('Name: pressed enter key!!')
        let newName = event.target.value;
        
        const newNameObj = {
          username: newName, 
          type: 'postNotification',
          previousName: this.props.currentUser
        }

        console.log(newNameObj);
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
