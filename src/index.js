import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Register from './Components/Authentication/Register/Register.component';
import Login from './Components/Authentication/Login/Login.component';
import firebase from "./Server/Firebase";
import 'semantic-ui-css/semantic.min.css';
import { Provider, connect } from "react-redux";
import { createStore } from "redux";
import { comboReducers } from './Store/reducer';
import { setUser } from "./Store/actioncreator";





const store = createStore(comboReducers)

const Index = (props) => {

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        props.history.push('/');

      } else {
        props.setUser(null);
        props.history.push('/login');
      }
    })
  }, []);

  console.log(props.currentUser);

  return (<Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/" component={App} />

  </Switch>)
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch((setUser(user)))
  }
}

const IndexWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <IndexWithRouter />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
