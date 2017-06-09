import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/message-list.css';

class MessageList extends Component {

  componentDidUpdate() {
    const objDiv = ReactDOM.findDOMNode(this);
    objDiv.scrollTop += 100;
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
