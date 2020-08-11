import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, DatePicker, TimePicker, DatePickerOptions, Modal } from 'react-materialize';
class FlightEditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formErrors: {},
            originSelect: '',
            destinationSelect: '',
            departureDatePicker: '',
            departureTimePicker: '',
            arrivalDatePicker: '',
            arrivalTimePicker: '',
            departureDateTime: '',
            landingDateTime: '',
        }
    }
    render() {
        const countries = this.props.countries;
        const { flight } = this.props.flight;
        return (
            <div>
                <form action="" className="white">
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
                        // onChange={this.onFlightSubmitChange}
                        />
                    </div>

                    <div className="input-field col 12s 6m">
                        <label htmlFor="phone">Remaining tickets</label>
                        <input type="text" id="vacancyE" name='vacancy' />
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