import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyFlights } from '../Actions/flightActions';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize';
import { getCustomerDetails, updateMyDetails, changeCustomerPassword, cancelTicket } from '../Actions/customerActions';
import moment from 'moment';

export class CustomerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.auth.user,
            formErrors: { username: '', firstName: '', lastName: '', address: '', phone: '' },
            password: '',
            passwordErrorMsg: '',
            newPasswordErrorMsg: '',
            newPwd: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            passwordValid: false,
            detailsFormValid: false

        }

    }
    componentDidMount() {

        this.props.getMyFlights(this.state.user.id);
        this.props.getCustomerDetails(this.state.user.id);
    }
    pwdChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        let errorMsg = this.state.passwordErrorMsg;
        let newPwdErrorMsg = this.state.newPasswordErrorMsg
        let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
        switch (e.target.name) {
            case 'password':
                errorMsg = '';
                if (!pattern.test(String(e.target.value))) {
                    errorMsg = 'Minimum eight characters combination of characters and digits';
                }
                break;
            case 'newPwd':
                newPwdErrorMsg = '';
                if (!pattern.test(String(e.target.value))) {
                    newPwdErrorMsg = 'Minimum eight characters combination of characters and digits';
                }
                break;
            default:
                break;
        }
        this.setState({ passwordErrorMsg: errorMsg, newPasswordErrorMsg: newPwdErrorMsg });
        this.isPwdFormValid();
    }
    changeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        let formErrors = this.state.formErrors;
        let pattern;
        switch (e.target.name) {
            case 'firstName':
            case 'lastName':
                pattern = /^([a-zA-Z ]){2,10}$/;
                formErrors[e.target.name] = '';
                if (!pattern.test(String(e.target.value).toLowerCase()) && e.target.value !== '') {
                    formErrors[e.target.name] = 'Must use at least 2 characters';
                }
                break;

            case 'phone':
                pattern = /^[0-9]{10,10}$/;
                formErrors['phone'] = '';
                if (!pattern.test(String(e.target.value)) && e.target.value !== '') {
                    formErrors['phone'] = '10 digits are required';
                }
                break;
            default:
                break;
        }

        this.setState({
            formErrors: formErrors
        });
        this.isFormValid();
    }
    isFormValid = () => {
        let formErrors = this.state.formErrors;
        for (const error in formErrors) {
            if (formErrors[error] !== '') {
                this.setState({
                    detailsFormValid: false
                })
                return;
            }
        }
        this.setState({
            detailsFormValid: true
        })
    }
    isPwdFormValid = () => {
        if (this.state.passwordErrorMsg === '' && this.state.newPasswordErrorMsg === '') {
            this.setState({
                passwordValid: true
            });
            return;
        }
        this.setState({
            passwordValid: false
        });
    }
    onSubmit = (e) => {

        e.preventDefault();
        let body = []
        body[0] = this.state.user.id;
        body[1] = this.state.firstName || '';
        body[2] = this.state.lastName || '';
        body[3] = this.state.phone || '';
        body[4] = this.state.address || '';
        this.props.updateMyDetails(body);

        this.props.getCustomerDetails(this.state.user.id);
        this.setState({ state: this.state });//fixx


    }
    onPwdSubmit = (e) => {
        e.preventDefault();
        let passwords = []
        passwords[0] = this.state.password;
        passwords[1] = this.state.newPwd;
        this.props.changeCustomerPassword(passwords);
    }
    cancelTicketHandle = (flightId) => {
        //popup are you sure
        this.props.cancelTicket(flightId);
    }

    render() {
        const { user } = this.props.auth;
        const { password } = this.state.password;
        const { newPwd } = this.state.newPwd;
        const { firstName } = this.state.firstName;
        const { lastName } = this.state.lastName;
        const { address } = this.state.address;
        const { phone } = this.state.phone;
        const userFlights = this.props.flightR.userFlights;
        console.log(user)
        const flightList = userFlights.length ? userFlights.map(flight => {
            return (
                <tr>
                    <td>{flight.id}</td>
                    <td>{flight.airlineName}</td>
                    <td>{flight.origin}</td>
                    <td>{moment(flight.departureTime).format('lll')}</td>
                    <td>{flight.destination}</td>
                    <td>{moment(flight.arrivalTime).format('lll')}</td>
                    <td><button className='white' onClick={() => this.cancelTicketHandle(flight.id)}><i className="material-icons">backspace</i></button></td>
                </tr>
            )
        }) : '';
        return (
            <div className="container">
                <h5 className='center'>Hello {user.firstName} {user.lastName}</h5>

                <div className="left">
                    <Collapsible accordion>
                        <CollapsibleItem expanded={false}
                            header="My Details"
                            icon={<Icon>add_box</Icon>}
                            node="div">
                            <row>
                                {user.firstName} {user.lastName}
                            </row>
                            <br />
                            <row>
                                {user.phone}
                            </row>
                            <br />
                            <row>
                                {user.address}
                            </row>
                        </CollapsibleItem>
                        <CollapsibleItem expanded={false}
                            header="Edit My Details"
                            icon={<Icon>add_box</Icon>}
                            node="div">
                            <form onSubmit={this.onSubmit} className="white">
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="fname">First Name</label>
                                    <input type="text" id="fname" name="firstName" value={firstName} onChange={this.changeHandle} />
                                    <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.firstName}</span>
                                </div>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="lname">Last Name</label>
                                    <input type="text" id="lname" name="lastName" value={lastName} onChange={this.changeHandle} />
                                    <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.lastName}</span>
                                </div>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="text" id="phone" name='phone' value={phone} onChange={this.changeHandle} />
                                    <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.phone}</span>
                                </div>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" name='address' value={address} onChange={this.changeHandle} />
                                    <span className="helper-text" style={{ color: 'red' }}  >{this.state.formErrors.address}</span>
                                </div>
                                <div className="input-field col 12s 6m">
                                    <button className="btn blue darken-4 z-depth-2" disabled={!this.state.detailsFormValid} >Submit</button>
                                </div>
                            </form>
                        </CollapsibleItem>
                        <CollapsibleItem expanded={false}
                            header="Change My Password"
                            icon={<Icon>add_box</Icon>}
                            node="div">
                            <form className="white" onSubmit={this.onPwdSubmit}>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="password">Current password</label>
                                    <input type="password" id="password" name="password" value={password} onChange={this.pwdChangeHandle} required />

                                </div>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="fname">New password</label>
                                    <input type="password" id="pwdcheck" name="newPwd" value={newPwd} onChange={this.pwdChangeHandle} required />
                                    <span className="helper-text" style={{ color: 'red' }}  >{this.state.passwordErrorMsg}</span>
                                </div>
                                <div className="input-field col 12s 6m">
                                    <button className="btn blue darken-4 z-depth-2" disabled={!this.state.passwordValid} >Submit</button>
                                </div>
                            </form>
                        </CollapsibleItem>
                    </Collapsible>
                </div>
                <div className="center">
                    <table className="centered responsive higlighted">
                        <thead>
                            <tr>
                                <td><strong>ID</strong></td>
                                <td><strong>Airline</strong></td>
                                <td><strong>From</strong></td>
                                <td><strong>Departs</strong></td>
                                <td><strong>To</strong></td>
                                <td><strong>Arrival</strong></td>
                                <td><strong>Cancel</strong></td>
                            </tr>
                            {flightList}
                        </thead>
                    </table>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        flightR: state.flightR,
        userFlights: state.flightR.userFlights,
        auth: state.authR,
        tickets: state.ticketsR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyFlights: (id) => dispatch(getMyFlights(id)),
        getCustomerDetails: (id) => dispatch(getCustomerDetails(id)),
        updateMyDetails: (userData) => dispatch(updateMyDetails(userData)),
        changeCustomerPassword: (passwords) => dispatch(changeCustomerPassword(passwords)),
        cancelTicket: (flightId) => dispatch(cancelTicket(flightId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMenu);