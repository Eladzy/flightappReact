import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import flightSearch from './Components/flightSearch';
import signUpCustomer from './Components/signUpCustomer';
import signIn from './Components/signIn';
import About from './Components/About';
import logout from './Components/logout';
import loggedInUserInterface from './Components/loggedInUserInterface';
import flightIndex from './Components/flightIndex';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/privateRoute';
import { userLoader, getUser } from './Actions/authActions';
import { connect, useDispatch } from 'react-redux';




class App extends Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getUser();
    }
  }


  render() {

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signUpCustomer' component={signUpCustomer} />
            <Route path='/About' component={About} />
            <Route path='/signIn' component={signIn} />
            <Route path='/flightIndex' component={flightIndex} />
            <Route path='/flightSearch' component={flightSearch} />
            <PrivateRoute path='/loggedInUserInterface' component={loggedInUserInterface} />
            <PrivateRoute path='/logout' component={logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.authR.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoader: () => dispatch(userLoader),
    getUser: (componentDidMount) => dispatch(getUser(componentDidMount))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
