import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllFlights } from '../Actions/flightActions';
import is from '../img/is.png'
import { bindActionCreators } from 'redux';

class flightIndex extends Component {

    componentDidMount() {
        this.props.getAllFlights();
    }
    render() {

        const { flights } = this.props;
        console.log(flights);
        const flightList = flights.length ? (flights.map(flight => {
            return (
                <div className="col s12 m4" >
                    <div className="card medium  waves-effect waves-block waves-light z-depth-2" key={flight.id}>
                        <div className="card-image hoverable activator sticky-action">
                            <img className="activator" src={is} />
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{flight.destination}</span>
                            <span className="activator"><a className="activator" >Click for details</a></span>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{flight.destination}<i className="material-icons right">X</i></span>
                            <p  >Takes off at {flight.departureTime} from {flight.origin} and arrives at {flight.arrivalTime}</p>
                        </div>
                    </div>
                    <div className="card-action" style={{ marginBottom: "50px" }}>
                        <a className="waves-effect waves-light btn-small blue darken-4 z-depth-2">Purchase</a>
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
    console.log("from map")
    return {
        flights: state.flightR.flights
    }
}

const mapDispatchToProps = (dispatch) => {return { getAllFlights: bindActionCreators(getAllFlights, dispatch)}}

export default connect(mapStateToProps, mapDispatchToProps)(flightIndex);