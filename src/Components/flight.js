import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { purchaseTicket } from '../Actions/ticketActions';
import FlightTemplate from './FlightTemplate';
import Swal from 'sweetalert2';


class Flight extends Component {

    handleClick = (id) => {
        console.log("check token and purchase method")
        this.props.isAuthenticated === true && this.props.auth.user.roles == 'Customer' ? this.props.purchaseTicket(id) : Swal.fire({
            title: 'Log in needed',
            text: 'You need to sign in order to complete your purchase',

        })
    }


    render() {
        const { flight } = this.props;
        const { isAuthenticated } = this.props.auth;
        console.log(flight);
        const Flight = flight ? (
            <div className='container'>
                <FlightTemplate flight={flight} />
                <div className="card-action">
                    <button className="btn waves-effect waves-light blue darken-4 center" onClick={() => { this.handleClick(flight.id) }}>Purchase <i className="material-icons right">airplanemode_active</i></button>
                </div>
            </div >
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

