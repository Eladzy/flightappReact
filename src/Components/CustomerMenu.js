import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyFlights } from '../Actions/flightActions'

class CustomerMenu extends Component {


    render() {
        const { user } = this.props.auth;
        this.props.getMyFlights(user.id);
        const userFlights = this.props.flightR.userFlights;

        const flightList = userFlights.length ? userFlights.map(flight => {
            return (
                <tr>
                    <td>{flight.id}</td>
                    <td>{flight.airlineName}</td>
                    <td>{flight.origin}</td>
                    <td>{flight.departureTime}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.arrivalTime}</td>
                    <td><button className="blue darken-4" waves="light"><i class="material-icons">backspace</i></button></td>
                </tr>
            )
        }) : '';
        return (
            <div className="container">
                <h5 className='center'>Hello {user.username} </h5>

                {/* <div className="left">
                    //edit user form to put inside a collapsable
                    <form className="white">
                    //edit info
                    </form>

                </div> */}
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
            </div>
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
        getMyFlights: (id) => dispatch(getMyFlights(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMenu);