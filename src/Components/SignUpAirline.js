import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerAirline } from '../Actions/authActions';
import { isUsernameAvailable } from '../Actions/functions';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import { getCountries } from '../Actions/countriesActions';
import { Select } from 'react-materialize';
class SignUpAirline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formErrors: { username: '', name: '', country: '', password: '', cPassword: '', email: '' },
            usernameValid: false,
            username: '',
            name: '',
            password: '',
            cpassword: '',
            email: '',
            country: '',
            passwordValid: false,
            detailsFormValid: false

        }
        this.changeHandle = this.changeHandle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.props.getCountries();
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

    changeHandle = async (e) => {
        e.persist();
        this.setState({ [e.target.name]: e.target.value })
        let formErrors = this.state.formErrors;
        let pattern;
        switch (e.target.name) {
            case 'username':
                pattern = /^([a-zA-z])([a-zA-z0-9_]){2,12}$/;
                let isAvailable = new Boolean;
                isAvailable = await isUsernameAvailable(e.target.value);
                formErrors['username'] = '';
                if (!isAvailable) {
                    formErrors['username'] = 'Username already in use';
                }
                if (!pattern.test(String(e.target.value))) {
                    formErrors['username'] = 'Username must be at least 4 and up to 10 characters without special characters';
                }
                break;
            case 'name':
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
            case 'country':
                pattern = /^[0-9]{1,3}$/;
                formErrors['country'] = '';
                if (!pattern.test(String(e.target.value))) {
                    formErrors['country'] = 'Must choose country';
                }
            case 'email':
                pattern = /\S+@\S+\.\S+/;
                formErrors['email'] = '';
                if (!pattern.test(String(e.target.value))) {
                    formErrors['email'] = 'Bad email format';
                }
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
            body[2] = this.state.name || '';
            body[3] = this.state.email || '';
            body[4] = this.state.country || '';

            if (this.props.registerAirline(body)) {
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
        const { name } = this.state.name;
        const { password } = this.state.password;
        const { cpassword } = this.state.cpassword;
        const { email } = this.state.email;
        const { country } = this.state.country;
        const countries = this.props.countries;
        return (
            <div className="container center " >
                <form onSubmit={this.onSubmit} className="white">
                    <row>
                        <h5 style={{ color: '#9e9e9e' }}>Sign Up</h5>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="name">Company name</label>
                            <input type="text" id="cname" name="name" onChange={this.changeHandle} value={name} required />
                            <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.name}</span>
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
                            <input type="email" className='validate inputForm' id="email" name='email' onChange={this.changeHandle} value={email} required />
                            <span className="helper-text" style={{ color: 'red' }} >{this.state.formErrors.email}</span>
                        </div>
                        <div className="input-field col 12s 6m inputForm">
                            <label htmlFor="country">Country</label>
                            <Select id="country" name="country" value={Option.value} onChange={this.changeHandle}>
                                <option  ></option>
                                {countries.map(c =>
                                    (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                                )}
                            </Select>
                            <div className="container">
                            </div>
                        </div>
                        <div className="input-field col 12s 6m">
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
    countries: state.generalDataR.countries
});

const mapDispatchToProps = (dispatch) => {
    return {

        registerAirline: (onSubmit) => dispatch(registerAirline(onSubmit)),
        // getCountries: bindActionCreators(getCountries, dispatch),
        getCountries: () => dispatch(getCountries()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpAirline);