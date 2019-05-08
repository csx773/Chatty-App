import React, { Component } from "react";
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    const allMessages = this.props.messages;
    //if map() function is one line, will auto return the <Message> block
    const messageList = allMessages.map((singleMsg) => <Message key={singleMsg.id} message={singleMsg} /> );

    return (
      <div>
        {messageList}
      </div>
    );
  }
}

export default MessageList;
