import React, { Component } from "react";

class Navbar extends Component {
  render() {
    const numUsers = this.props.clientCounter;
    let userText= 'users'
    if (numUsers === 1){
      userText = 'user'
    }
    
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <div className='navcounter' >
        {numUsers} {userText} online 
        </div>
      </nav>
    );
  }
}
export default Navbar;
