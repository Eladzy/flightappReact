import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import flightSearch from './Components/flightSearch';
import signUpCustomer from './Components/signUpCustomer';
import SignUpAirline from './Components/SignUpAirline';
import SignUpMain from './Components/SignUpMain';
import SignIn from './Components/SignIn';
import About from './Components/About';
import logout from './Components/logout';
import CustomerMenu from './Components/CustomerMenu';
import AirlineMenu from './Components/AirlineMenu';
import loggedInUserInterface from './Components/loggedInUserInterface';
import Flight from './Components/Flight';
import flightIndex from './Components/flightIndex';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/privateRoute';
import { userLoader } from './Actions/authActions';
import { store } from './index';

import './App.css';



class App extends Component {

  componentDidMount() {
    store.dispatch(userLoader());
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
            <Route path='/signIn' component={SignIn} />
            <Route path='/flightIndex' component={flightIndex} />
            <Route path='/flightSearch' component={flightSearch} />
            <Route path='/Flight' component={Flight} />
            <Route path='/SignUpMain' component={SignUpMain} />
            <Route path='/SignUpAirline' component={SignUpAirline} />
            <PrivateRoute path='/loggedInUserInterface' component={loggedInUserInterface} />
            <PrivateRoute path='/CustomerMenu' component={CustomerMenu} />
            <PrivateRoute path='/AirlineMenu' component={AirlineMenu} />
            <PrivateRoute path='/logout' component={logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;

