import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
require('minimal-lamp-api/src/api.php');
require('./config.php');

ReactDOM.render(<App />, document.getElementById('root'));