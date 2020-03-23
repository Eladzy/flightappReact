import React from 'react';
import {Link,NavLink} from 'react-router-dom';

const Navbar=()=>{
    return(
       
        <div className="constainer">
          <nav className='nav-wrapper blue darken-4 '>
						<div className="container">
                         <a  className="brand-logo" >FlightCom</a>
                         <a  className="sidebar-trigger" data-target="mobile-links"></a>
                        {/* <i className="material-icons">menu</i>*/}
                        <ul className="right hide-on-med-and-down">
                            <li><Link to='/Home'>Home</Link></li>
                            <li><Link to='/flightIndex'>flight index</Link></li>
                            <li><NavLink to='/Departures'>Departures/Arrivals</NavLink></li>
                            <li><NavLink to='/About'>About</NavLink></li>
                            <li><NavLink to='/AccountOptions'>My Account</NavLink></li>
                            <li><NavLink to='/signUpCustomer'>Signup</NavLink></li>
                            <li><NavLink to='/signIn'>Sign in</NavLink></li>   
                        </ul>
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

export default Navbar;