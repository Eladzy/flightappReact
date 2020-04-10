import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerCustomer } from '../Actions/authActions';
import { Redirect } from 'react-router-dom';


class signUpCustomer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
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
        // const { name, value } = e.target;
        // switch (name) {
        //     case:

        // }
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

        }
    }
    render() {
        const { username } = this.state.username;
        const { password } = this.state.password;
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
                            <input type="password" id="cpwd" name="checkPwd" onChange={this.changeHandle} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name='email' onChange={this.changeHandle} value={email} />
                        </div>
                        <div className="input-field col 12s 6m">
                            <label htmlFor="cemail">Confirm Email</label>
                            <input type="email" id="cemail" onChange={this.changeHandle} />
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
                            <button className="btn blue darken-4 z-depth-2">Sign up</button>
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
        registerCustomer: (onSubmit) => dispatch(registerCustomer(onSubmit))
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(signUpCustomer);