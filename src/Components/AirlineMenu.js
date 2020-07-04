import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCompanyFlights } from '../Actions/flightActions';
import { getAirlineDetails } from '../Actions/airlinesActions';
import { getCountries } from '../Actions/countriesActions';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize';

class AirlineMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.auth.user,
            //flights: this.props.flights,
            countries: this.props.countries

        }
    }
    componentDidMount() {
        this.props.getCountries()
        this.props.getAirlineDetails(this.state.user.id);
        this.props.getCompanyFlights();
    }
    render() {
        const { user } = this.props.auth;
        const { countries } = this.state.countries
        const flightList = this.props.userFlights.length ? this.flights.map(flight => {
            return (
                <tr>
                    <td>{flight.id}</td>
                    <td>{flight.airlineName}</td>
                    <td>{countries.Id[flight.origin].Country_Name}</td>
                    <td>{flight.departureTime}</td>
                    <td>{countries.Id[flight.destination].Country_Name}</td>
                    <td>{flight.arrivalTime}</td>
                    <td><button className='white'><i className="material-icons">backspace</i></button></td>
                    <td><button className='white'><i className="material-icons">edit</i></button></td>
                </tr>
            )
        }) : '';
        return (
            <div className='container'>
                <h5 className='center'>Hello {user.name}</h5>
                <div className="left">
                    <Collapsible accordion>
                        <CollapsibleItem expanded={false}
                            header="My Details"
                            icon={<Icon>add_box</Icon>}
                            node="div">
                            <row>
                                {user.username} {user.name}
                            </row>
                            <br />

                            <row>
                                {user.country}
                            </row>
                        </CollapsibleItem>
                    </Collapsible>
                </div>

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
                                <td><strong>Edit</strong></td>
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
const mapStateToProps = (state) => ({

    userFlights: state.flightR.userFlights,
    countries: state.generalDataR.countries,
    auth: state.authR

});
const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyFlights: () => dispatch(getCompanyFlights()),
        getCountries: () => dispatch(getCountries()),
        getAirlineDetails: (id) => dispatch(getAirlineDetails(id))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AirlineMenu);