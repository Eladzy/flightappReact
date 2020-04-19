import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { purchaseTicket } from '../Actions/ticketActions';
import pointerBlue from '../img/pointerBlueT.png';
import airplaneBlueT from '../img/airplaneBlueT.png';
import Swal from 'sweetalert2';


class Flight extends Component {


    handleClick = (id) => {
        console.log("check token and purchase method")
        this.props.isAuthenticated === true ? this.props.purchaseTicket(id) : Swal.fire({
            title: 'Log in needed',
            text: 'You need to sign in order to complete your purchase',
            footer: (<Route to='/signIn'>Sign in</Route>)
        })
    }

    render() {
        const { flightR, targetFlightId, flight } = this.props;
        const { isAuthenticated } = this.props.auth;
        //  this.props.viewFlight(this.props.targetFlightId);
        console.log(flight);
        const Flight = flight ? (
            <div className="container center">
                <div className="card" style={{ overflow: 'hidden', padding: '10px', width: '850px' }} key={flight.id}>
                    <img src={airplaneBlueT} style={{ position: 'absolute', opacity: '0.4', top: '80px', left: '-100px' }} />
                    <div className="card-content center">
                        <div className="row">
                            <div className="col 12s 6m">
                                <h6>{flight.origin}</h6> <br />
                                <span>{flight.departureTime}</span>
                            </div>
                            <div className="col 12s 6m">
                                <h6>{flight.airlineName}</h6><br />
                                <img src={pointerBlue} style={{ height: '100px' }, { width: '200px' }} />
                            </div>
                            <div className="col 12s 6m">
                                <h6>{flight.destination}</h6> <br />
                                <span>{flight.arrivalTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn waves-effect waves-light blue darken-4" onClick={() => { this.handleClick(flight.id) }} disabled={!isAuthenticated}>Purchase <i className="material-icons right">airplanemode_active</i></button>
                </div>
            </div>
        ) : <div className="center">
                Loading Flight...
        </div>
        return (
            <div className="container" onLoad={console.log(flight)}>
                {Flight}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        flightR: state.flightR,
        targetFlightId: state.flightR.targetFlightId,
        flight: state.flightR.flight,
        auth: state.authR,
        isAuthenticated: state.authR.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        purchaseTicket: (id) => dispatch(purchaseTicket(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Flight);

