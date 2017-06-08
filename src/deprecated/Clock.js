import React, { Component } from 'react';
// function Clock(props) {
//   return (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date(), status: 'Running'};
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.setState({ status: 'TERMINATED'});
  }

  render() {
    return (
      <div>
        <h1>{this.state.status}</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.stopTimer.bind(this)}>Stop</button>
      </div>
    );
  }
}
// function tick() {
//   ReactDOM.render(
//     <Clock date={new Date()} />,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

export default Clock;
