import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ModifyFlight } from '../Actions/airlinesActions';
import { Select, DatePicker, TimePicker, DatePickerOptions, Modal } from 'react-materialize';
class FlightEditModal extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = props;
        this.bindActionCreators = bindActionCreators(ModifyFlight, dispatch);
    }

    getFlightDate = () => {
        let arrivalTime = document.getElementById("TimePicker-16").value.toString();
        let arrivalDate = document.getElementById("DatePicker-6").value;
        let departureTime = document.getElementById("TimePicker-15").value;
        let departureDate = document.getElementById("DatePicker-5").value;
        let dateResult = [];
        dateResult[0] = (departureDate !== '' && departureTime !== '') ? departureDate + ',' + departureTime : '';
        dateResult[1] = (arrivalDate !== '' && arrivalTime !== '') ? arrivalDate + ',' + arrivalTime : '';
        return dateResult;

    }

    onSubmitHandle = (e) => {
        e.preventDefault();
        let dateResult = this.getFlightDate();
        let formResults = {}
        formResults["Origin_Country_Code"] = document.getElementById("originSelectAlE").value || '';
        formResults["Destination_Country_Code"] = document.getElementById("destinationSelectAlE").value || '';
        formResults["Departure_Time"] = dateResult[0] || '';
        formResults["Landing_Time"] = dateResult[1] || '';
        formResults["Remaining_Tickets"] = document.getElementById("vacancyE").value || '';
        let updatedFlight = this.props.flight;
        console.log(formResults);
        console.log(updatedFlight);
        for (let property in formResults) {
            if (formResults[property] !== '') {
                updatedFlight[property] = formResults[property];
            }
        }
        console.log(updatedFlight);
        let { dispatch } = this.props;
        let action = ModifyFlight(updatedFlight);
        console.log(action);
        dispatch(action)
    }

    render() {
        const countries = this.props.countries;

        return (
            <div>
                <form onSubmit={this.onSubmitHandle} className="white">
                    <div className="input-field" >
                        <label htmlFor="originSelect" > Origin</label>
                        <Select name="originSelect" id="originSelectAlE" value={Option.value} onChange={this.onFlightSubmitChange}>
                            <option  ></option>
                            {countries.map(c =>
                                (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                            )}
                        </Select>
                    </div>
                    <div className="input-field " >

                        <label htmlFor="destinationSelect" >destination</label>
                        <Select name="destinationSelect" id="destinationSelectAlE" value={Option.value} onChange={this.onFlightSubmitChange} >
                            <option ></option>
                            {countries.map(c =>
                                (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                            )}
                        </Select>
                    </div>
                    <div className="input-field">
                        <label htmlFor="departureDatePicker">Departure Date</label>
                        <DatePicker name="departureDatePicker"
                            id="DatePicker-5"
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
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="departureTimePicker">Departure time</label>
                        <TimePicker name="departureTimePicker"
                            id="TimePicker-15"
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

                        />

                    </div>
                    <div className="input-field">
                        <label htmlFor="arrivalDatePicker">Arrival Date</label>
                        <DatePicker
                            id="DatePicker-6"
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
                                setDefaultDate: null,
                                showClearBtn: false,
                                showDaysInNextAndPreviousMonths: false,
                                showMonthAfterYear: false,
                                yearRange: 1
                            }}

                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="arrivalTimePicker">Arrival time</label>
                        <TimePicker name="arrivalTimePicker"
                            id="TimePicker-16"
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

                        />

                    </div>
                    <div className="input-field col 12s 6m">
                        <label htmlFor="phone">Remaining tickets</label>
                        <input type="text" id="vacancyE" name='vacancy' pattern="\d{1,3}" />
                        <span className="helper-text" data-error="please select a number between 0-999" ></span>
                    </div>
                    <div className="input-field col 12s 6m">
                        <button className="btn blue darken-4 z-depth-2"  >Submit</button>
                    </div>

                </form>
            </div>
        )
    }

}

export default connect()(FlightEditModal);