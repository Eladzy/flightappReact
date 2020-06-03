import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser, userLoader } from '../Actions/authActions';
import PropTypes from 'prop-types';
class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: ''
            , password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.changeHandle = this.changeHandle.bind(this)
    }

    // static propTypes = {
    //     loginUser: PropTypes.func.isRequired,
    //     isAuthenticated: PropTypes.bool
    // };
    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.userLoader();
            console.log([this.state.username, this.state.password]);
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let body = []
        body[0] = this.state.username || '';
        body[1] = this.state.password || '';
        this.props.loginUser(body);
        if (this.props.isAuthenticated) {//does not happen
            this.props.userLoader();
            this.props.history.push('/')
            console.log([this.state.username, this.state.password]);
        }
    };

    changeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        if (this.props.isAuthenticated) {

            return <Redirect to="/"></Redirect>
        }
        const { username } = this.state.username;
        const { password } = this.state.password;
        return (
            <div className="container">
                <form className='white' onSubmit={this.onSubmit}>
                    <h5 className="grey-text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" name='username' onChange={this.changeHandle} value={username} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name='password' onChange={this.changeHandle} value={password} />
                    </div>
                    <div className="input-field">
                        <button className='btn blue darken-4 z-depth-2'>Log in</button>
                    </div>
                </form>
            </div >
        );
    }

};
const mapStateToProps = (state) => ({
    isAuthenticated: state.authR.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (onSubmit) => dispatch(loginUser(onSubmit)),
        userLoader: () => dispatch(loginUser)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
