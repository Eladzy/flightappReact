import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignUpAirline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.auth.user,
            formErrors: { username: '', name: '', country: '', password: '', cPassword: '', email: '' },
            usernameValid: false,
            username: '',
            name: '',
            password: '',
            cpassword: '',
            email: '',
            passwordValid: false,
            detailsFormValid: false

        }

    }
    render() {
        return (
            <div></div>
        );
    }
}
export default connect()(SignUpAirline);