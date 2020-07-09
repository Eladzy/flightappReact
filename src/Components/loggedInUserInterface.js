import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLoader } from '../Actions/authActions'
import CustomerMenu from './CustomerMenu';
import AirlineMenu from './AirlineMenu';
class loggedInUserInterface extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: this.props.auth.user,
         isAuthenticated: this.props.auth.isAuthenticated
      }
   }
   componentWillMount() {
      this.props.userLoader();
   }
   render() {

      console.log(this.state.user);
      if (this.state.isAuthenticated) {
         switch (this.state.user.roles) {
            case 'Customer':
               console.log('custmer');
               return (<Redirect to='/CustomerMenu'></Redirect>);
            case 'AirLine':
               console.log('airline');
               return (<Redirect to='/AirlineMenu'></Redirect>);
            case 'Administrator':
            default:
               return (<Redirect to='/home'></Redirect>);
         }
      }

   }
}
const mapStateToProps = (state) => {
   return {
      auth: state.authR
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      userLoader: () => dispatch(userLoader())
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(loggedInUserInterface)