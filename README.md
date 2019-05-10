# Chatty App
=====================

Chatty App allows multiple user to connect to a chat room and talk to everyone in the room. New messages are pushed to all connected clients. Users are able to send text messages and variety of image URL links (supports .jpg, .jpeg, .png, .gif)

Chatty App was built using React, WS, and Webpack and HTML/SCSS

## Getting Started

1. Fork this repository, then clone to your own local machine.
2. Install dependencies using the `npm install` command.
3. Change to `chatty_server` folder within in the main directory
4. Install dependencies in `chatty_server` folder using `npm install` command.
5. Start server from  `chatty_server` folder using `npm start` command.
6. Change back to root directory folder and start client side code using `npm start` command.   
7. The app will be running in browser at <http://localhost:3000/>

## Features
1. Each new user can choose to be an anonymous name or use own name
2. Random colors will be assigned to each new user in the chatroom
3. Header shows current number of users in chatroom
4. Can share images (supports .jpg, .jpeg, .png, .gif) using URL links 

## Screenshots

!["Chat with pictures"](https://github.com/csx773/react-simple-boilerplate/blob/master/build/screenshots/screenshot-movie.png)
!["Home page"](https://github.com/csx773/react-simple-boilerplate/blob/master/build/screenshots/screenshot-chat.png)
!["New user"](https://github.com/csx773/react-simple-boilerplate/blob/master/build/screenshots/screenshot-1.png)



### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
