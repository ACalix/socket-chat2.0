import React, { Component } from 'react';
import Scroll from 'react-scroll';
import './css/message-list.css';

const scroll = Scroll.animateScroll;

class MessageList extends Component {

  componentDidUpdate() {
    scroll.scrollToBottom;
  }

  render() {
    return (
      <ul className="message-list">
        {this.props.message_list.map((message_entry, index) =>
          <li key={index}><strong>{message_entry.user}: </strong>{message_entry.message}</li>)}
      </ul>
    );
  }
}

export default MessageList;
