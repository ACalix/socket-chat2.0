import React, { Component } from 'react';
import * as io from 'socket.io-client';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';
import ChatroomList from './components/ChatroomList';
import ChatMemberList from './components/ChatMemberList';
import './App.css';

const socket = io('127.0.0.1:4000');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInChat: true,
      active_chat: null,
      message_list: [],
      member_list: [],
      chatroom_list: []
    };

    socket.emit('join', 'somename');

    socket.on('guest_join', (data) => {
      this.retrieveUserList(data);
      this.retrieveChatrooms(data);
    });

    socket.on('messages', (data) => this.retrieveMessageList(data));
  }

  retrieveChatrooms = (data) => {
    this.setState({chatroom_list: data.chatrooms});
  }

  retrieveUserList = (data) => {
    let update_member_list = this.state.member_list.concat(data.allGuests);
    this.setState({member_list: update_member_list});
  }

  retrieveMessageList = (data) => {
    console.log(data);
    this.setState({message_list: data});
  }

  receiveMessage = (data) => {
    // let update_message_list = this.state.message_list.concat(data);
    // this.setState({message_list: update_message_list});
    socket.emit('client_message', data);
  }

  selectChat = (data) => {
    this.setState({active_chat: data});
    socket.emit('join_chatroom', data);
  }

  render() {
    return (
      <div className="chat-window">
        <h1>Chat Window</h1>
        <div className="chat-container">
          <div className="chatroom-panel">
            <ChatroomList
              callbackFromParent={this.selectChat} chatroom_list={this.state.chatroom_list} active_chat={this.state.active_chat}
            />
          </div>
          <div className="chat-message-view">
            <ChatMemberList member_list={this.state.member_list} />
            { (this.state.isInChat) ?
            <MessageList message_list={this.state.message_list} /> : <h1>Please join a chat</h1>
            }
            <MessageForm callbackFromParent={this.receiveMessage} />
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
