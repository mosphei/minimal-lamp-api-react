import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
require('minimal-lamp-api');
require('./config.php');

ReactDOM.render(<App />, document.getElementById('root'));