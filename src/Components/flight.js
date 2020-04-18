import React, { Component } from 'react';
import { connect } from 'react-redux';
import { purchaseTicket, viewFlight } from '../Actions/flightActions';
import pointerBlue from '../img/pointerBlueT.png';
import airplaneBlueT from '../img/airplaneBlueT.png';


class Flight extends Component {
    componentDidMount() {

    }
    handleClick = (e) => {
        console.log("check token and purchase method")
        // this.props.handlePurchase(this.props.flight.id)
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
                    <button className="btn waves-effect waves-light blue darken-4" onClick={() => { this.handleClick() }} disabled={!isAuthenticated}>Purchase <i className="material-icons right">airplanemode_active</i></button>
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        //targetFlight: bindActionCreators(viewFlight, dispatch)
        // viewFlight: () => dispatch(viewFlight)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Flight);

{/* <div className="flight">
    <h4 className='center'>
        {flight.id}
    </h4>
    <p className="flow-text">
        Takes off at {flight.departureTime}
                     from {flight.origin}
                     and arrives to {flight.destination}
                     at {flight.landingTime}</p>
    <div className="center">
        <button className="btn blue darken-4 z-depth-2" disabled={!isAuthenticated} onClick={() => { this.handleClick() }} >Purchase </button>
    </div>
</div> */}