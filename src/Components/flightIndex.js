import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllFlights, viewFlight } from '../Actions/flightActions';
import moment from 'moment';
import { bindActionCreators } from 'redux';

import countryCodes from '../data.json'

class flightIndex extends Component {

    onClickHandle = (id) => {

        this.props.viewFlight(id);
        console.log(id + " event");
        this.props.history.push('/Flight');
    }
    componentDidMount() {
        this.props.getAllFlights();
    }
    render() {



        const { flights } = this.props.flight;
        const flightList = flights.length ? (flights.map(flight => {
            const countryCode = countryCodes[flight.destination]
            return (
                <div className="col s12 m4" >
                    <div className="card medium  z-depth-4" key={flight.id}>
                        <div className="card-image hoverable activator sticky-action">
                            <img className="activator" src={`https://www.countryflags.io/${countryCode}/flat/64.png`} />
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{flight.destination}</span>
                            <span className="activator"><a className="activator" >Click for details</a></span>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{flight.destination}<i className="material-icons right">X</i></span>
                            <p  >Takes off at {moment(flight.departureTime).format('lll')} from {flight.origin} and arrives at {moment(flight.arrivalTime).format('lll')}</p>
                        </div>
                    </div>
                    <div className="card-action" style={{ marginBottom: "50px" }}>
                        <a className="waves-effect waves-light btn-small blue darken-4 z-depth-2" onClick={() => this.onClickHandle(flight.id)}  >Purchase</a>
                    </div>
                </div>

            )
        })) : (<div className="center"><h1 className="center flow-text">Nothing to show</h1></div>)


        return (
            <div>
                <div className="container">
                    <div className="row" >{flightList}</div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        flights: state.flightR.flights,
        flight: state.flightR
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllFlights: bindActionCreators(getAllFlights, dispatch),
        viewFlight: (id) => dispatch(viewFlight(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(flightIndex);