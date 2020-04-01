import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';

class Navbar extends Component {
    componentDidMount() {
        let sidenav = document.querySelectorAll('#mobile-links');
        M.Sidenav.init(sidenav, {});
    }
    render() {
        return (

            <div>
                <nav className='nav-wrapper blue darken-4 '>
                    <div className="container">
                        <a className="brand-logo left">FlightCom</a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to='/Home'>Home</Link></li>
                            <li><Link to='/flightSearch'>Search flight</Link></li>
                            <li><Link to='/flightIndex'>flight index</Link></li>
                            <li><NavLink to='/Departures'>Departures/Arrivals</NavLink></li>
                            <li><NavLink to='/About'>About</NavLink></li>
                            <li><NavLink to='/AccountOptions'>My Account</NavLink></li>
                            <li><NavLink to='/signUpCustomer'>Signup</NavLink></li>
                            <li><NavLink to='/signIn'>Sign in</NavLink></li>
                        </ul>
                        <a className="sidenav-trigger right hide-on-med-and-up" data-target="mobile-links"><i className="material-icons">menu</i></a>
                    </div>
                </nav>
                <ul className="sidenav" id="mobile-links">
                    <li><Link to='/Home'>Home</Link></li>
                    <li><NavLink to='/Departures'>Departures/Arrivals</NavLink></li>
                    <li><NavLink to='/About'>About</NavLink></li>
                    <li><NavLink to='/AccountOptions'>My Account</NavLink></li>
                    <li><NavLink to='/signUpCustomer'>Signup</NavLink></li>
                </ul>
            </div>
        );
    }
}
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.sidenav');
//     var instances = M.Sidenav.init(elems, options);
//   });
export default Navbar;