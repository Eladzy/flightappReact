import React, { Component } from 'react';
//import * as actionCreator from '../Actions/authActions';
import { logOutUser } from '../Actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import { bindActionCreators } from 'redux';
import { store } from '../index';
class logout extends Component {



    componentWillMount() {
        Swal.fire({
            title: 'Sign Out',
            text: "Are you sure you want to leave?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I am sure'
        }).then((result) => {

            if (result.value) {
                store.dispatch(logOutUser())
                Swal.fire(
                    'Logged out!',
                    'You will be redirected to home page'
                )//.then(res => { this.props.logOutUser(res) });


                // localStorage.removeItem('token')//todo return later
            }
        })
    }
    render() {

        if (!this.props.isAuthenticated) {

            return (<Redirect to='/SignIn'></Redirect>)
        }
        else { return (<Redirect to='/'></Redirect>) }
    }
}
const mapStateToProps = (state) => ({
    authenticated: state.authR.isAuthenticated
});


export default connect(mapStateToProps)(logout);