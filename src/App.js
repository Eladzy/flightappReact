import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import signUpCustomer from './Components/signUpCustomer';
import signIn from './Components/signIn';
import About from './Components/About';
import flightIndex from './Components/flightIndex';
import {BrowserRouter,Route,Switch} from 'react-router-dom';



class App extends Component{
  render(){
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/signUpCustomer' component={signUpCustomer}/>
        <Route path='/About' component={About}/>
        <Route path='/signIn' component={signIn}/>
        <Route path='/flightIndex' component={flightIndex}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
  }
}

export default App;
