import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCompanyFlights } from '../Actions/flightActions';
import { getAirlineDetails, changeAirlinePassword } from '../Actions/airlinesActions';
import { getCountries } from '../Actions/countriesActions';
import { Collapsible, CollapsibleItem, Icon, Select } from 'react-materialize';
import Moment from 'react-moment';

class AirlineMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.auth.user,
            password: '',
            newPwd: '',
            passwordErrorMsg: '',
            newPasswordErrorMsg: '',
            passwordValid: false,
            flightFormErrors: { origin: '', destination: '', departure: '', arrival: '' },
            origin: '',
            destination: '',
            departure: '',
            arrival: ''
        }
    }
    componentDidMount() {
        this.props.getAirlineDetails(this.state.user.id);
        this.props.getCompanyFlights();
        this.props.getCountries();
        this.setState({
            user: this.props.user,
            flights: this.props.userFlights,
            countries: this.props.countries
        })

    }


    getCountry(countryCode) {
        let country = this.props.countries.find(country => country.Id == countryCode);
        return country.Country_Name;
    }

    pwdChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        let errorMsg = this.state.passwordErrorMsg;
        let newPwdErrorMsg = this.state.newPasswordErrorMsg
        let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;;
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

    onPwdSubmit = (e) => {
        e.preventDefault();
        let passwords = []
        passwords[0] = this.state.password;
        passwords[1] = this.state.newPwd;
        this.props.changeAirlinePassword(passwords);
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

    render() {
        const { user } = this.props.auth;
        const countries = this.props.countries;
        const { password } = this.state.password;
        const { newPwd } = this.state.newPwd;
        const flights = this.props.userFlights;
        const flightList = flights.length ? flights.map(flight => {
            return (

                <tr>
                    <td>{flight.Id}</td>
                    <td>{user.name}</td>
                    <td>{this.getCountry(flight.Destination_Country_Code)}</td>
                    <td>{flight.Departure_Time}</td>
                    <td>{this.getCountry(flight.Origin_Country_Code)}</td>
                    <td>{flight.Landing_Time}</td>
                    <td><button className='white'><i className="material-icons">backspace</i></button></td>
                    <td><button className='white'><i className="material-icons">edit</i></button></td>
                </tr>
            )
        }) : <h5>Nothing to show</h5>;
        return (
            <div className='container'>
                <h5 className='center'>Hello {user.name}</h5>
                <div className="left">
                    <Collapsible accordion>
                        <CollapsibleItem expanded={false}
                            header="My Details"
                            icon={<Icon>add_box</Icon>}
                            node="div">
                            <row>
                                {user.username} {user.name}
                            </row>
                            <br />

                            <row>
                                {user.country}
                            </row>
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
                        <CollapsibleItem expanded={false}
                            header="Submit flight"
                            icon={<Icon>add_box</Icon>}
                            node="div">
                            <form className='white'>


                                <div className="input-field col 12s 6m">
                                    <Select id="originSelect" value={Option.value} >
                                        <option  ></option>
                                        {countries.map(c =>
                                            (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                                        )}
                                    </Select>
                                    <div className="container">

                                    </div>
                                    <label > Origin</label>
                                </div>


                                <div className="input-field ">

                                    <Select id="destinationSelect" value={Option.value} >
                                        <option ></option>
                                        {countries.map(c =>
                                            (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                                        )}
                                    </Select>
                                    <label >destination</label>
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
                                <td><strong>Edit</strong></td>
                                <td><strong>Cancel</strong></td>
                            </tr>
                            {flightList}
                        </thead>
                    </table>
                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({

    userFlights: state.flightR.userFlights,
    countries: state.generalDataR.countries,
    auth: state.authR

});
const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyFlights: (id) => dispatch(getCompanyFlights(id)),
        getCountries: () => dispatch(getCountries()),
        getAirlineDetails: (id) => dispatch(getAirlineDetails(id)),
        changeAirlinePassword: (passwords) => dispatch(changeAirlinePassword(passwords))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AirlineMenu);
