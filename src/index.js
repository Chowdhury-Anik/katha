import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Components/Authentication/Register/Register.component';
import Login from './Components/Authentication/Login/Login.component';


import 'semantic-ui-css/semantic.min.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={App} />

      </Switch>
    </Router>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
