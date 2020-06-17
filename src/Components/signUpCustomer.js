import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerCustomer, userLoader } from '../Actions/authActions';
import { userNameAvailableCheck } from '../Actions/customerActions';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

class signUpCustomer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formValid: false,
            formErrors: { username: '', password: '', firstName: '', lastName: '', address: '', phone: '', email: '', creditcard: '', cpassword: '' },
            usernameValid: false,
            emailValid: true,//temp
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
        this.userNameAvailableCheck = userNameAvailableCheck.bind(this)

    }
    formValidate = () => {

        let formErrors = this.state.formErrors;
        for (const userInput in formErrors) {
            if (formErrors[userInput] !== '') {
                this.setState({
                    formValid: false
                })
                return;
            }
        }
        this.setState({
            formValid: true
        })

    }
    changeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        let formErrors = this.state.formErrors;
        let pattern;
        switch (e.target.name) {
            case 'username':
                pattern = /^([a-zA-z])([a-zA-z0-9_]){2,9}$/;

                formErrors['username'] = '';
                let isAvailable = new Boolean;
                isAvailable = userNameAvailableCheck(e.target.value);
                //setTimeout(3000)
                console.log(isAvailable);
                if (pattern.test(String(e.target.value))) {
                    if (isAvailable === false) {
                        formErrors['username'] = 'Username already in use';
                        this.setState({ usernameValid: false });
                    }
                    else {
                        formErrors['username'] = '';
                        this.setState({ usernameValid: true });
                    }
                }
                else {
                    formErrors['username'] = 'Username must be at least 4 and up to 10 characters without special characters';
                }
                break;
            case 'firstName':
            case 'lastName':
                pattern = /^([a-zA-Z]){2,10}$/;
                formErrors[e.target.name] = '';
                if (!pattern.test(String(e.target.value).toLowerCase())) {
                    formErrors[e.target.name] = 'Must use at least 2 characters without numbers or special characters';
                }
                break;
            case 'password':
                pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
                formErrors['password'] = ''
                if (!pattern.test(String(e.target.value))) {
                    formErrors[e.target.name] = 'Minimum eight characters combination of characters and digits';
                }
                break;
            case 'cpassword':
                formErrors['cpassword'] = ''
                if (e.target.value !== this.state.password) {
                    formErrors[e.target.name] = 'Value does not match to password';

                }
                break;
            case 'phone':
                pattern = /^[0-9]{10,10}$/;
                formErrors['phone'] = '';
                if (!pattern.test(String(e.target.value))) {
                    formErrors['phone'] = '10 digits are required';
                }
                break;
            case 'creditcard':
                pattern = /^[0-9]{16,16}$/;
                formErrors['creditcard'] = '';
                if (!pattern.test(String(e.target.value))) {
                    formErrors['creditcard'] = '16 digits are required';
                }
                break;

            default:
                break;
        }

        this.setState({
            formErrors: formErrors

        });
        this.formValidate();
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.formValidate();
        if (this.state.formValid) {
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
                //this.props.history.push('/signIn')

                Swal.fire(
                    'Success',
                    'You have been successfully signed up, now sign in with your credentials',
                    'success'
                )
                // this.props.userLoader()

            }
        }


    }
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/signIn"></Redirect>
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

            <div className="container center " >
                <form onSubmit={this.onSubmit} className="white">
                    <row>
                        <h5 style={{ color: '#9e9e9e' }}>Sign Up</h5>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id="fname" name="firstName" onChange={this.changeHandle} value={firstName} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.firstName}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" id="lname" name="lastName" onChange={this.changeHandle} value={lastName} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.lastName}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="uname">User Name</label>
                            <input type="text" id="uname" name="username" onChange={this.changeHandle} value={username} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.username}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="pwd">Password</label>
                            <input type="password" id="pwd" name="password" onChange={this.changeHandle} value={password} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.password}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="cpwd">Confirm Password</label>
                            <input type="password" id="cpwd" name="cpassword" onChange={this.changeHandle} value={cpassword} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.cpassword}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='validate' id="email" name='email' onChange={this.changeHandle} value={email} required />
                            <span className="helper-text" data-error="Wrong email format" ></span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="cemail">Confirm Email</label>
                            <input type="email" className='validate' id="cemail" onChange={this.changeHandle} required />
                            <span className="helper-text" data-error="Wrong email format" ></span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" id="phone" name='phone' onChange={this.changeHandle} value={phone} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.phone}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name='address' value={address} onChange={this.changeHandle} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.address}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="cred">Credit Card</label>
                            <input type="text" id="cred" name='creditcard' value={creditcard} onChange={this.changeHandle} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.creditcard}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <button className="btn blue darken-4 z-depth-2" disabled={!this.state.formValid} >Sign up</button>
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
        //  loginUser: (onsubmit) => dispatch(loginUser(onsubmit))
        userLoader: () => dispatch(userLoader)
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(signUpCustomer);