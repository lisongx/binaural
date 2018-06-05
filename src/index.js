import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App, { Article }from './App';
import registerServiceWorker from './registerServiceWorker';

import "./polyfills"

const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/article" component={Article} />
    </div>
  </Router>
);


ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
