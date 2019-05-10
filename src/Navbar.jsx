/* eslint-disable react/prop-types */
import React, { Component } from 'react';

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
          <img src='http://localhost:3000/build/logo.png' alt="Chatty Logo" width="45px" height="45px" />
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
