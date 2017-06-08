import React, { Component } from 'react';
import './css/chatroom-list.css';

class ChatroomList extends Component {
  chatroomOption = (chatroom) =>
    <li key={chatroom} className={"clickable disable-select "+ this.isActive(chatroom)} onClick={() => {this.selectChatroom(chatroom)}}><h3>{chatroom}</h3></li>;

  selectChatroom = (chatroom) => {
    this.props.callbackFromParent(chatroom);
  }

  isActive = (chatroom) =>
    (chatroom === this.props.active_chat) ?
      'active' : 'inactive';

  render() {
    return (
      <ul className="chatroom-view">
        {this.props.chatroom_list.map((chatroom) =>
          this.chatroomOption(chatroom)
        )}
      </ul>
    );
  }
}

export default ChatroomList;
