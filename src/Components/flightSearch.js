import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllFlights, searchFlights } from '../Actions/flightActions';
import { getAirlines } from '../Actions/airlinesActions';
import { bindActionCreators } from 'redux';

class flightSearch extends Component {
    componentDidMount() {

    }
    render() {
        return (
            //add auto complete airlines and flight id's
            <div className="container">
                <form className='blue'>
                    <div className="row">

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
        searchFlights: bindActionCreators(searchFlights, dispatch)
        //getcountries
    }
}