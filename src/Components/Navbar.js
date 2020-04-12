import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';

class Navbar extends Component {
    componentDidMount() {
        let sidenav = document.querySelectorAll('#mobile-links');
        M.Sidenav.init(sidenav, {});
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (<ul className="right hide-on-med-and-down">
            <li><NavLink to='/loggedInUserInterface'>My Account {user}</NavLink></li>
            <li><NavLink to='/logout' >Sign out</NavLink></li>
        </ul>)
        const authLinksM = (<ul className="sidenav">
            <li><NavLink to='/loggedInUserInterface'>My Account {user}</NavLink></li>
            <li><NavLink to='/logout' >Sign out</NavLink></li>
        </ul>)
        const guestLinks = (<ul className="right hide-on-med-and-down">
            <li><NavLink to='/signUpCustomer'>Signup</NavLink></li>
            <li><NavLink to='/signIn'>Sign in</NavLink></li>
        </ul>)
        const guestLinksM = (<ul className="sidenav">
            <li><NavLink to='/signUpCustomer'>Signup</NavLink></li>
            <li><NavLink to='/signIn'>Sign in</NavLink></li>
        </ul>)
        return (
            <div>
                <nav className='nav-wrapper blue darken-4 '>
                    <div className="container">
                        <a className="brand-logo left">FlightCom</a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to='/Home'>Home</Link></li>
                            <li><Link to='/flightSearch'>Search flight</Link></li>
                            <li><Link to='/flightIndex'>Deals</Link></li>
                            <li><NavLink to='/Departures'>Departures/Arrivals</NavLink></li>
                            <li><NavLink to='/About'>About</NavLink></li>
                        </ul>
                        <div>{isAuthenticated ? authLinks : guestLinks}</div>

                        <a className="sidenav-trigger right hide-on-med-and-up" data-target="mobile-links"><i className="material-icons">menu</i></a>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-links">
                    <li><NavLink to='/Home'>Home</NavLink></li>
                    <li><NavLink to='/flightIndex'>Deals</NavLink></li>
                    <li><NavLink to='/flightSearch'>Search flight</NavLink></li>
                    <li><NavLink to='/Departures'>Departures/Arrivals</NavLink></li>
                    <li><NavLink to='/About'>About</NavLink></li>
                </ul>
                <div>{isAuthenticated ? authLinksM : guestLinksM}</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.authR
});

export default connect(mapStateToProps)(Navbar);