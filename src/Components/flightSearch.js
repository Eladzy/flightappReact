import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllFlights, searchFlights } from '../Actions/flightActions';
import { getAirlines } from '../Actions/airlinesActions';
import { getCountries } from '../Actions/countriesActions';
import { bindActionCreators } from 'redux';

class flightSearch extends Component {
    componentDidMount() {
        this.props.getAllFlights();
        this.props.getAirlines();
        this.props.getCountries();
    }
    render() {
        console.log(this.props);
        const { countries } = this.props.countries;
        console.debug(countries);
        const {airlines}=this.props.airlines;
        console.debug(airlines);

        return (
            //add auto complete  flight id's
            <div className="row">
                <form className='blue col s6'>
                    <div className="row">
                        <div className="input-field">
                            <select key="airlineSelect">
                            {airlines?airlines.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )):<option key='0' value={null}></option>}
                            </select>
                            <label> Airline company</label>
                        </div>
                        <div className="input-field">
                            <select key="originSelect">
                                {countries?countries.map(item => (
                                    <option key={item.Id} value={item.Id}>{item.Country_Name}</option>
                                )):<option key='0' value={null}></option>}
                            </select>
                            <label>From</label>
                        </div>
                        <div className="input-field">
                            <select key="destinationSelect">
                                {countries?countries.map(item => (
                                    <option key={item.Id} value={item.Id}>{item.Country_Name}</option>
                                )):<option key='0' value={null}></option>}
                            </select>
                            <label>To</label>
                        </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(flightSearch)