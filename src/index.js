import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './containers/Chat';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Chat />, document.getElementById('root'));
registerServiceWorker();
