import React, { Component } from 'react';
import './css/chat-member-list.css';
import dot from '../assets/200px-Green-dot.svg.png';

class ChatMemberList extends Component {

  render() {
    return (
      <div className="chat-members-container">
        <div className="float-container"></div>
        <div className="float-container"></div>
        <div className="float-container"></div>
        <div className="float-container">
          <ul className="chat-members-view">
            <li><h4>Connected Users</h4></li>
            {this.props.member_list.map((member) =>
              <li key={member}><div className="dot-container">
                <img src={dot} alt="Green Dot" /></div>{member}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default ChatMemberList;
