import React, { Component } from 'react';
import { logOutUser } from '../Actions/authActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
class logout extends Component {
    componentDidMount() {
        Swal.fire({
            title: 'Sign Out',
            text: "Are you sure you want to leave?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I am sure'
        }).then((result) => {
            logOutUser();
            if (result.value) {
                Swal.fire(
                    'Logged out!',
                    'You will be redirected to home page'
                );
                localStorage.removeItem('token')//todo return later
            }
        })
    }
    render() {
        return (<Redirect to="/signIn"></Redirect>)
    }
}
const mapStateToProps = (state) => ({
    auth: state.authR
});

export default connect(mapStateToProps)(logout);