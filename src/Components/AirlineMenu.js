import React, { Component } from 'react';
import FlightEditModal from './FlightEditModal';
import { connect } from 'react-redux';
import { getCompanyFlights } from '../Actions/flightActions';
import { getAirlineDetails, changeAirlinePassword, createNewFlight } from '../Actions/airlinesActions';
import { getCountries } from '../Actions/countriesActions';
import { Collapsible, CollapsibleItem, Icon, Select, DatePicker, TimePicker, DatePickerOptions, Modal, Button } from 'react-materialize';
import moment from 'moment';

class AirlineMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //user: this.props.auth.user,
            password: '',
            newPwd: '',
            passwordErrorMsg: '',
            newPasswordErrorMsg: '',
            passwordValid: false,
            flightFormErrors: {
                originSelect: '', destinationSelect: '', departureDatePicker: '',
                departureTimePicker: '',
                arrivalDatePicker: '', arrivalTimePicker: '', vacancy: ''
            },
            originSelect: '',
            destinationSelect: '',
            departureDatePicker: '',
            departureTimePicker: '',
            arrivalDatePicker: '',
            arrivalTimePicker: '',
            departureDateTime: '',
            landingDateTime: '',
            vacancy: ''

        }
    }
    componentDidMount() {
        this.props.getAirlineDetails(this.props.auth.user.id);
        this.props.getCountries();
        this.props.getCompanyFlights();
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
    getminimalDate = (date = new Date) => {
        return date.setDate(date.getDate() + 5);
    }

    onFlightSubmitChange = (e) => {
        console.log(e.target.name);
        let target = e.target
        console.log(target);
        this.setState({ [target.name]: target.value })
        let pattern = /d{1,3}/;
        let formErrors = this.state.flightFormErrors;
        switch (target.name) {
            case "originSelect":
            case "destinationSelect":
                pattern = /d{1,3}/;
                if (!pattern.test(String(e.target.value))) {
                    formErrors[target.name] = "Please pick a country from the list";
                }
                else {
                    formErrors[target.name] = '';
                }
                break;
            case "vacancy":
                pattern = /^[0-9]{1,3}$/;
                formErrors[target.name] = '';
                if (!pattern.test(String(e.target.value))) {
                    formErrors[target.name] = "Please pick a number of available tickets";
                }
                else {
                    formErrors[target.name] = '';
                }
                break;

            default:
                break;
        }
        this.setState({ flightFormErrors: formErrors });
    }
    getFlightDate = () => {
        let dateResult = [];
        dateResult[0] = document.getElementById("DatePicker-2").value + ',' + document.getElementById("TimePicker-13").value;
        dateResult[1] = document.getElementById("DatePicker-3").value + ',' + document.getElementById("TimePicker-14").value;
        return dateResult;

    }

    onFlightSubmit = (e) => {
        e.preventDefault();
        let dateResult = this.getFlightDate()
        let flight = {
            AirLine_Id: this.props.auth.user.id,
            Origin_Country_Code: this.state.originSelect,
            Destination_Country_Code: this.state.destinationSelect,
            Departure_Time: dateResult[0],
            Landing_Time: dateResult[1],
            Remaining_Tickets: this.state.vacancy
        }
        //remember to validate
        this.props.createNewFlight(flight);
    }



    render() {
        const minimalDate = this.getminimalDate();
        const { user } = this.props.auth;
        const countries = this.props.countries;
        const { password } = this.state.password;
        const { newPwd } = this.state.newPwd;
        const { arrivalDatePicker } = this.state.arrivalDatePicker;
        const { vacancy } = this.state.vacancy;
        const flights = this.props.userFlights;
        const flightList = flights.length ? flights.map(flight => {
            return (

                <tr key={flight.Id}>
                    <td>{flight.Id}</td>
                    <td>{user.name}</td>
                    <td>{this.getCountry(flight.Destination_Country_Code)}</td>
                    <td>{moment(flight.Departure_Time).format('lll')}</td>
                    <td>{this.getCountry(flight.Origin_Country_Code)}</td>
                    <td>{moment(flight.Landing_Time).format('lll')}</td>
                    <td><Modal
                        header='Modal Header'
                        trigger={<button className='white'><i className="material-icons">edit</i></button>}
                        modalOptions={{ dismissible: true }}  >
                        <FlightEditModal countries={this.props.countries} user={user} flight={flight} />
                    </Modal></td>
                    <td><button className='white'><i className="material-icons">backspace</i></button></td>
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
                            {user.name}
                            <br />
                            <br />
                            {user.countryName}
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
                            <form className='white' onSubmit={this.onFlightSubmit}>


                                <div className="input-field" >
                                    <label htmlFor="originSelect" > Origin</label>
                                    <Select name="originSelect" id="originSelectAl" value={Option.value} onChange={this.onFlightSubmitChange} required>
                                        <option  ></option>
                                        {countries.map(c =>
                                            (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                                        )}
                                    </Select>
                                </div>


                                <div className="input-field " >

                                    <label htmlFor="destinationSelect" >destination</label>
                                    <Select name="destinationSelect" id="destinationSelectAl" value={Option.value} onChange={this.onFlightSubmitChange} required>
                                        <option ></option>
                                        {countries.map(c =>
                                            (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                                        )}
                                    </Select>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="departureDatePicker">Departure Date</label>
                                    <DatePicker name="departureDatePicker"
                                        id="DatePicker-2"
                                        options={{
                                            autoClose: false,
                                            container: null,
                                            defaultDate: null,
                                            disableDayFn: null,
                                            disableWeekends: false,
                                            events: [],
                                            firstDay: 0,
                                            format: 'mmm dd, yyyy',
                                            i18n: {
                                                cancel: 'Cancel',
                                                clear: 'Clear',
                                                done: 'Ok',
                                                months: [
                                                    'January',
                                                    'February',
                                                    'March',
                                                    'April',
                                                    'May',
                                                    'June',
                                                    'July',
                                                    'August',
                                                    'September',
                                                    'October',
                                                    'November',
                                                    'December'
                                                ],
                                                monthsShort: [
                                                    'Jan',
                                                    'Feb',
                                                    'Mar',
                                                    'Apr',
                                                    'May',
                                                    'Jun',
                                                    'Jul',
                                                    'Aug',
                                                    'Sep',
                                                    'Oct',
                                                    'Nov',
                                                    'Dec'
                                                ],
                                                nextMonth: '›',
                                                previousMonth: '‹',
                                                weekdays: [
                                                    'Sunday',
                                                    'Monday',
                                                    'Tuesday',
                                                    'Wednesday',
                                                    'Thursday',
                                                    'Friday',
                                                    'Saturday'
                                                ],
                                                weekdaysAbbrev: [
                                                    'S',
                                                    'M',
                                                    'T',
                                                    'W',
                                                    'T',
                                                    'F',
                                                    'S'
                                                ],
                                                weekdaysShort: [
                                                    'Sun',
                                                    'Mon',
                                                    'Tue',
                                                    'Wed',
                                                    'Thu',
                                                    'Fri',
                                                    'Sat'
                                                ]
                                            },
                                            isRTL: false,
                                            maxDate: null,
                                            minDate: null,
                                            onClose: null,
                                            onDraw: null,
                                            onOpen: null,
                                            onSelect: null,
                                            parse: null,
                                            setDefaultDate: false,
                                            showClearBtn: false,
                                            showDaysInNextAndPreviousMonths: false,
                                            showMonthAfterYear: false,
                                            yearRange: 1
                                        }}
                                        required />
                                </div>

                                <div className="input-field">
                                    <label htmlFor="departureTimePicker">Departure time</label>
                                    <TimePicker name="departureTimePicker"
                                        id="TimePicker-13"
                                        options={{
                                            autoClose: false,
                                            container: null,
                                            defaultTime: 'now',
                                            duration: 350,
                                            fromNow: 0,
                                            i18n: {
                                                cancel: 'Cancel',
                                                clear: 'Clear',
                                                done: 'Ok'
                                            },
                                            onCloseEnd: null,
                                            onCloseStart: null,
                                            onOpenEnd: null,
                                            onOpenStart: null,
                                            onSelect: null,
                                            showClearBtn: false,
                                            twelveHour: true,
                                            vibrate: true
                                        }}

                                        required />

                                </div>
                                <div className="input-field">
                                    <label htmlFor="arrivalDatePicker">Arrival Date</label>
                                    <DatePicker
                                        id="DatePicker-3"
                                        name="arrivalDatePicker"
                                        options={{
                                            autoClose: false,
                                            container: null,
                                            defaultDate: null,
                                            disableDayFn: null,
                                            disableWeekends: false,
                                            events: [],
                                            firstDay: 0,
                                            format: 'mmm dd, yyyy',
                                            i18n: {
                                                cancel: 'Cancel',
                                                clear: 'Clear',
                                                done: 'Ok',
                                                months: [
                                                    'January',
                                                    'February',
                                                    'March',
                                                    'April',
                                                    'May',
                                                    'June',
                                                    'July',
                                                    'August',
                                                    'September',
                                                    'October',
                                                    'November',
                                                    'December'
                                                ],
                                                monthsShort: [
                                                    'Jan',
                                                    'Feb',
                                                    'Mar',
                                                    'Apr',
                                                    'May',
                                                    'Jun',
                                                    'Jul',
                                                    'Aug',
                                                    'Sep',
                                                    'Oct',
                                                    'Nov',
                                                    'Dec'
                                                ],
                                                nextMonth: '›',
                                                previousMonth: '‹',
                                                weekdays: [
                                                    'Sunday',
                                                    'Monday',
                                                    'Tuesday',
                                                    'Wednesday',
                                                    'Thursday',
                                                    'Friday',
                                                    'Saturday'
                                                ],
                                                weekdaysAbbrev: [
                                                    'S',
                                                    'M',
                                                    'T',
                                                    'W',
                                                    'T',
                                                    'F',
                                                    'S'
                                                ],
                                                weekdaysShort: [
                                                    'Sun',
                                                    'Mon',
                                                    'Tue',
                                                    'Wed',
                                                    'Thu',
                                                    'Fri',
                                                    'Sat'
                                                ]
                                            },
                                            isRTL: false,
                                            maxDate: null,
                                            minDate: null,
                                            onClose: null,
                                            onDraw: null,
                                            onOpen: null,
                                            onSelect: null,
                                            parse: null,
                                            setDefaultDate: arrivalDatePicker,
                                            showClearBtn: false,
                                            showDaysInNextAndPreviousMonths: false,
                                            showMonthAfterYear: false,
                                            yearRange: 1
                                        }}
                                        // onChange={this.onFlightSubmitChange}
                                        required />
                                </div>

                                <div className="input-field">
                                    <label htmlFor="arrivalTimePicker">Arrival time</label>
                                    <TimePicker
                                        name="arrivalTimePicker"
                                        id="TimePicker-14"
                                        options={{
                                            autoClose: false,
                                            container: null,
                                            defaultTime: 'now',
                                            duration: 350,
                                            fromNow: 0,
                                            i18n: {
                                                cancel: 'Cancel',
                                                clear: 'Clear',
                                                done: 'Ok'
                                            },
                                            onCloseEnd: null,
                                            onCloseStart: null,
                                            onOpenEnd: null,
                                            onOpenStart: null,
                                            onSelect: null,
                                            showClearBtn: false,
                                            twelveHour: true,
                                            vibrate: true
                                        }}
                                        //  onChange={this.onFlightSubmitChange}
                                        required />
                                </div>
                                <div className="input-field col 12s 6m">

                                    <div className="input-field col 12s 6m">
                                        <label htmlFor="phone">Remaining tickets</label>
                                        <input type="text" id="vacancy" name='vacancy' onChange={this.onFlightSubmitChange} required />
                                        <span className="helper-text" style={{ color: 'red' }}  >{this.state.flightFormErrors.vacancy}</span>
                                    </div>

                                    <button className="btn blue darken-4 z-depth-2"  >Submit</button>
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
        changeAirlinePassword: (passwords) => dispatch(changeAirlinePassword(passwords)),
        createNewFlight: (flight) => dispatch(createNewFlight(flight))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AirlineMenu);