import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllFlights, searchFlights } from '../Actions/flightActions';
import { getAirlines } from '../Actions/airlinesActions';
import { getCountries } from '../Actions/countriesActions';
import { bindActionCreators } from 'redux';
import { Select, DatePicker } from 'react-materialize'


class flightSearch extends Component {
    componentDidMount() {
        this.props.getAllFlights();
        this.props.getAirlines();
        this.props.getCountries();
    }
    render() {
        const countries = this.props.countries;
        const airlines = this.props.airlines;
        return (
            //add auto complete  flight id's
            <div className="row" >
                <form className='white col' action="">
                    <div className="input-field col 12s 6m">
                        <Select id="airlineSelect" value={Option.value} onChange={this.value = Option.value}>
                            <option value={null}></option>
                            {airlines.map(a =>

                                (<option value={a.id} key={a.id}>{a.name}</option>)
                            )}
                        </Select>
                        <label > Airline company</label>
                    </div>
                    <div className="input-field col 12s 6m">
                        <Select id="originSelect" value={Option.value} onChange={this.value = Option.value}>
                            <option value={null}></option>
                            {countries.map(c =>

                                (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                            )}
                        </Select>
                        <div className="container">

                        </div>
                        <label > From</label>
                    </div>
                    <div className="input-field col 12s 6m">
                        <Select id="destinationSelect" value={Option.value} onChange={this.value = Option.value}>
                            <option value={null}></option>
                            {countries.map(c =>

                                (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                            )}
                        </Select>
                        <label > To</label>
                    </div>
                    <div className="input-field col 12s 6m">
                        <DatePicker
                            id="departureTimePicker"
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
                                yearRange: 10
                            }}
                        />
                        <label htmlFor="departureTimePicker">Departs on</label>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        flights: state.flightR.flights,
        airlines: state.generalDataR.airlines,
        countries: state.generalDataR.countries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllFlights: bindActionCreators(getAllFlights, dispatch),
        getAirlines: bindActionCreators(getAirlines, dispatch),
        getCountries: bindActionCreators(getCountries, dispatch),
        searchFlights: bindActionCreators(searchFlights, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(flightSearch);

// function populateSelectAirline(id, list = []) {
//     let element = document.getElementById(id);
//     list.map(item => element.options.add(new Option(item.name, item.id)));
// }
// function populateSelectCountry(id,list=[]){
//     let element = document.getElementById(id);
//     list.map(item=>element.Options.add(new Option(item.Id,item.Country_Name)));
// }