import React, { Component } from 'react';
import CustomerMenu from './CustomerMenu';
import { connect } from 'react-redux';
import { getMyFlights } from '../Actions/flightActions';
import { Redirect } from 'react-router-dom';
class loggedInUserInterface extends Component {

   render() {
      const { user, isAuthenticated } = this.props.auth;
      //  const { getMyFlights } = this.props
      console.log(user);
      if (isAuthenticated) {
         switch (user.roles) {
            case 'Customer':
               console.log('custmer');
               // self.props.getMyFlights(user.id);
               return (<Redirect to='/CustomerMenu'></Redirect>);
            case 'AirLine':
            case 'Administrator':
            default:
               return (<h2>Forbidden</h2>)
         }
      }

   }
}
const mapStateToProps = (state) => {
   return {
      auth: state.authR,
      flight: state.flightR
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      getMyFlights: (id) => dispatch(getMyFlights(id))
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(loggedInUserInterface)