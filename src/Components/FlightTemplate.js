import React, { Component } from 'react';
import pointerBlue from '../img/pointerBlueT.png';
import airplaneBlueT from '../img/airplaneBlueT.png';
import moment from 'moment';

class FlightTemplate extends Component {
    render() {
        let flight = this.props.flight;
        let clickFunction = this.props.onClick;
        return (<div className="card flightCard" onClick={() => clickFunction(flight.id)} key={flight.id}>
            <img src={airplaneBlueT} className='apBlue ' />
            <div className="card-content center">
                <table className="ticket-table">
                    <tbody>
                        <tr>
                            <td>
                                <h6>{flight.origin}</h6> <br />
                            </td>
                            <td >
                                <h6>{flight.airlineName}</h6><br />
                            </td>
                            <td>
                                <h6>{flight.destination}</h6> <br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>{moment(flight.departureTime).format('lll')}</span>
                            </td>
                            <td >
                                <img src={pointerBlue} className='pointerBlue' />
                            </td>
                            <td>
                                <span>{moment(flight.arrivalTime).format('lll')}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>)
    }
}
export default FlightTemplate;