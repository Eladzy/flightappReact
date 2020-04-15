import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllFlights, searchFlights } from '../Actions/flightActions';
import { getAirlines } from '../Actions/airlinesActions';
import { getCountries } from '../Actions/countriesActions';
import { bindActionCreators } from 'redux';
import { Select, DatePicker, Button } from 'react-materialize';
import pointerBlue from '../img/pointerBlueT.png'
import airplaneBlueT from '../img/airplaneBlueT.png'
import Moment from 'react-moment';


class flightSearch extends Component {


    componentDidMount() {
        this.props.getAllFlights();
        this.props.getAirlines();
        this.props.getCountries();
    }

    onSubmitHandle = (e) => {
        e.preventDefault();
        let moment = require('moment');
        console.log(document.getElementById("departureTimePicker").value);
        let departureString = document.getElementById("departureTimePicker").value
        //  let departureDate = moment(departureString).format("YYYY,MMM,DD");
        let params = ['', document.getElementById("airlineSelect").value,
            document.getElementById("originSelect").value, document.getElementById("destinationSelect").value,
            document.getElementById("departureTimePicker").value, ''];
        console.log("handle submit");
        console.log(document.getElementById("airlineSelect").value);
        console.log(params);
        this.props.searchedFlights(params)
    }


    render() {
        const countries = this.props.countries;
        const airlines = this.props.airlines;
        const flights = this.props.flights;
        const flightList = flights ? flights.map(f => {
            return (
                <div className="card" style={{ overflow: 'hidden', padding: '10px', width: '850px' }} key={f.id}>
                    <img src={airplaneBlueT} style={{ position: 'absolute', opacity: '0.4', top: '80px', left: '-100px' }} />
                    <div className="card-content center">
                        <div className="row">
                            <div className="col 12s 6m">
                                <h6>{f.origin}</h6> <br />
                                <span>{f.departureTime}</span>
                            </div>
                            <div className="col 12s 6m">
                                <h6>{f.airlineName}</h6><br />
                                <img src={pointerBlue} style={{ height: '100px' }, { width: '200px' }} />
                            </div>
                            <div className="col 12s 6m">
                                <h6>{f.destination}</h6> <br />
                                <span>{f.arrivalTime}</span>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }) : (<p>None Found</p>)

        return (
            //add auto complete  flight id's
            <div className="container" >
                <div className="row"  >
                    <form className='white col' onSubmit={this.onSubmitHandle}>
                        <div className="input-field col 12s 6m">
                            <Select id="airlineSelect" value={Option.value} >
                                <option  ></option>
                                {airlines.map(a =>

                                    (<option value={a.id} key={a.id}>{a.name}</option>)
                                )}
                            </Select>
                            <label > Airline company</label>
                        </div>
                        <div className="input-field col 12s 6m">
                            <Select id="originSelect" value={Option.value} >
                                <option  ></option>
                                {countries.map(c =>
                                    (<option value={c.Id} key={c.Id}>{c.Country_Name}</option>)
                                )}
                            </Select>
                            <div className="container">

                            </div>
                            <label > From</label>
                        </div>
                        <div className="input-field col 12s 6m">
                            <Select id="destinationSelect" value={Option.value} >
                                <option ></option>
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
                                    yearRange: 2
                                }}
                            />
                            <label htmlFor="departureTimePicker">Departs on</label>
                        </div>
                        <div className="input-field col 12s 6m">
                            <Button className="blue darken-4" waves="light" style={{ marginTop: "20px" }} >Go</Button>
                        </div>
                    </form>
                </div>
                <div className="row"> {flightList}</div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        flights: state.flightR.flights,
        airlines: state.generalDataR.airlines,
        countries: state.generalDataR.countries,

    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAllFlights: bindActionCreators(getAllFlights, dispatch),
        getAirlines: bindActionCreators(getAirlines, dispatch),
        getCountries: bindActionCreators(getCountries, dispatch),
        // searchedFlights: (onSubmitHandle) => dispatch(searchFlights(onSubmitHandle))
        searchedFlights: () => dispatch(searchFlights)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(flightSearch);
