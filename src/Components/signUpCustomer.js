import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerCustomer, loginUser } from '../Actions/authActions';
import { userNameAvailableCheck } from '../Actions/customerActions';
import { Redirect } from 'react-router-dom';


class signUpCustomer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formValid: false,
            formErrors: { username: '', password: '', firstName: '', lastName: '', address: '', phone: '', email: '' },
            emailValid: false,
            passwordValid: false,
            username: '',
            password: '',
            cpassword: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            email: '',
            creditcard: ''
        }
        this.changeHandle = this.changeHandle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    changeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        let formErrors = this.state.formErrors
        switch (e.target.name) {
            case 'username':

                let pattern = /^\S+\w{ 4, 10 } \S{ 1,}/;
                if (pattern.test(String(e.target.value).toLowerCase())) {
                    formErrors['username'] = '';
                    if (!userNameAvailableCheck(e.target.value)) {
                        formErrors['username'] = 'Username already in use';
                    }
                }
                else {
                    formErrors['username'] = 'Username must be atleast 4 characters without special characters';
                }
                break;
            case 'firstName':
            case 'lastName':
                let pattern = /^\S+\D{ 2, 10 }/;
                formErrors[e.target.name] = '';
                if (!pattern.test(String(e.target.value).toLowerCase())) {
                    formErrors[e.target.name] = 'Must use atleast 2 characters';
                }
                break;
            case 'password':
                let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                formErrors['password'] = ''
                if (pattern.test(String(e.target.value))) {
                    formErrors[e.target.name] = 'Minimum eight characters, at least one letter and one number';
                }
                break;
            case 'phone':
                let pattern = /^[0-9]{10,}*$/;
                formErrors['phone'] = '';
                if (!pattern.test(String(e.target.value))) {
                    formErrors['phone'] = '10 digits are required';
                }
                break;
            case 'creditcard':
                let pattern = /^[0-9]{16,}*$/;
                formErrors['creditcard'] = '';
                if (!pattern.test(String(e.target.value))) {
                    formErrors['creditcard'] = '16 digits are required';
                }
                break;
            default:
                break;
        }
        //validate()
    }
    onSubmit = (e) => {
        e.preventDefault();
        let body = []
        body[0] = this.state.username || '';
        body[1] = this.state.password || '';
        body[2] = this.state.firstName || '';
        body[3] = this.state.lastName || '';
        body[4] = this.state.address || '';
        body[5] = this.state.phone || '';
        body[6] = this.state.creditcard || '';
        body[7] = this.state.email || '';
        if (this.props.registerCustomer(body)) {
            this.props.history.push('/signIn')
        }
        // let creds = [];
        // creds[0] = body[0];
        // creds[1] = body[1];
        // this.props.loginUser(creds);


    }
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"></Redirect>
        }
        const { username } = this.state.username;
        const { password } = this.state.password;
        const { cpassword } = this.state.cpassword;
        const { firstName } = this.state.firstName;
        const { lastName } = this.state.lastName;
        const { address } = this.state.address;
        const { phone } = this.state.phone;
        const { creditcard } = this.state.creditcard;
        const { email } = this.state.email;
        return (

            <div className="container center" style={{ height: "400px" }, { width: "400px" }}>
                <form onSubmit={this.onSubmit} className="white">
                    <row>
                        <h5 style={{ color: '#9e9e9e' }}>Sign Up</h5>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id="fname" name="firstName" onChange={this.changeHandle} value={firstName} />
                            <span className="helper-text" data-error="Username unavailable" ></span>
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" id="lname" name="lastName" onChange={this.changeHandle} value={lastName} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="uname">User Name</label>
                            <input type="text" id="uname" name="username" onChange={this.changeHandle} value={username} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="pwd">Password</label>
                            <input type="password" id="pwd" name="password" onChange={this.changeHandle} value={password} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="cpwd">Confirm Password</label>
                            <input type="password" id="cpwd" name="checkPwd" onChange={this.changeHandle} value={cpassword} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='validate' id="email" name='email' onChange={this.changeHandle} value={email} />
                            <span className="helper-text" data-error="Wrong email format" ></span>
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="cemail">Confirm Email</label>
                            <input type="email" className='validate' id="cemail" onChange={this.changeHandle} />
                            <span className="helper-text" data-error="Wrong email format" ></span>
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" id="phone" name='phone' onChange={this.changeHandle} value={phone} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name='address' value={address} onChange={this.changeHandle} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="cred">Credit Card</label>
                            <input type="text" id="cred" name='creditcard' value={creditcard} onChange={this.changeHandle} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <button className="btn blue darken-4 z-depth-2" >Sign up</button>
                        </div>
                    </row>
                </form>
            </div>

        );
    }

}


const mapStateToProps = (state) => ({
    isAuthenticated: state.authR.isAuthenticated,
});

const mapDistpatchToProps = (dispatch) => {
    return {
        registerCustomer: (onSubmit) => dispatch(registerCustomer(onSubmit)),
        loginUser: (onsubmit) => dispatch(loginUser(onsubmit))
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(signUpCustomer);