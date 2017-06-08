import React, { Component } from 'react';
import './css/message-form.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};

    this.watchMessage = this.watchMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  watchMessage(event) {
    this.setState({message: event.target.value});
  }

  submitMessage(event) {
    event.preventDefault();
    this.setState({message: ''});
    this.props.callbackFromParent(this.state.message);
  }

  render() {
    return (
      <form className="message-form" onSubmit={this.submitMessage}>
        <input type="text"
          value={this.state.message}
          onChange={this.watchMessage}
        />
        <input className="clickable" type="submit" value="Submit" />
      </form>
    )
  }
}

export default MessageForm;
