import React, { Component } from 'react';
import * as io from 'socket.io-client';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import ChatroomList from '../components/ChatroomList';
import ChatMemberList from '../components/ChatMemberList';
import './css/chat.css';

const socket = io('127.0.0.1:4000');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInChat: true,
      invalidName: false,
      hasJoined: false,
      active_chat: null,
      message_list: [],
      member_list: [],
      chatroom_list: []
    };

    socket.on('chat update', (data) => this.updateChatroom(data));

    socket.on('join_room', (data) => {
      this.retrieveUserList(data.guests)
      this.retrieveMessageList(data.messages)
    });

    socket.on('client_join', (data) => {
      this.updateUsername(data)
      this.retrieveChatrooms(data);
    });
  }

  updateChatroom = (data) => {
    if(data.room === this.state.active_chat) {
      (data.update === 'members') ?
      this.retrieveUserList(data.guests) : this.addMessage(data.message);
    }
  }

  retrieveChatrooms = (data) => {
    if(data.isValid) {
      this.setState({chatroom_list: data.chatrooms});
    }
  }

  retrieveUserList = (data) => {
    this.setState({member_list: data});
  }

  retrieveMessageList = (data) => {
    this.setState({message_list: data});
  }

  addMessage = (data) => {
    let new_message_list = this.state.message_list.concat(data);
    this.setState({message_list: new_message_list});
  }

  updateUsername = (data) => {
    (data.isValid) ?
      this.setState({hasJoined: true}) : this.setState({invalidName: true});
  }

  receiveMessage = (data) => {
    socket.emit('client_message', data);
  }

  receiveUsername = (data) => {
    socket.emit('join', data);
  }

  selectChat = (data) => {
    if (data !== this.state.active_chat) {
      this.setState({active_chat: data});
      socket.emit('join_chatroom', data);
    }
  }

  renderError() {
    if(this.state.invalidName) {
      return (
        <p className="error">That username is already taken. Please choose another username</p>
      )
    }
  }

  renderMemberList() {
    if(this.state.member_list.length > 0 ) {
      return (
        <ChatMemberList member_list={this.state.member_list} />
      )
    }
  }

  renderChat() {
    return (
      <div className="chat-container">
        <div className="chatroom-panel">
          <ChatroomList
            callbackFromParent={this.selectChat} chatroom_list={this.state.chatroom_list} active_chat={this.state.active_chat}
          />
        </div>
        <div className="chat-message-view">
          {this.renderMemberList()}
          { (this.state.isInChat) ?
          <MessageList message_list={this.state.message_list} /> : <h1>Please join a chat</h1>
          }
          <MessageForm callbackFromParent={this.receiveMessage} />
        </div>
      </div>
    )
  }

  renderLogin() {
    return (
      <div className="chat-container">
        <div className="login-splash">
          <h2 className="disable-select">Please choose a username</h2>
          {this.renderError()}
          <MessageForm callbackFromParent={this.receiveUsername} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="chat-window">
        <h1>Chat Window</h1>
        {(this.state.hasJoined) ? this.renderChat() : this.renderLogin()}
      </div>
    );
  }
}

export default Chat;
