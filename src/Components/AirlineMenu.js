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
            //  userFlights: [],

        }
    }
    componentDidMount() {
        this.props.getAirlineDetails(this.state.user.id);
        this.props.getCompanyFlights();
        this.props.getCountries();
        this.setState({
            user: this.props.user,
            flights: this.props.userFlights,
            countries: this.props.countries
        })

    }
    getCountry(countryCode) {
        let country = this.props.countries.find(country => country.Id == countryCode);
        return country.Country_Name;
    }
    render() {
        const { user } = this.props.auth;
        // const { countries } = this.props.countries;
        const flights = this.props.userFlights;
        const flightList = flights.length ? flights.map(flight => {
            return (

                <tr>
                    <td>{flight.Id}</td>
                    <td>{user.name}</td>
                    <td>{this.getCountry(flight.Destination_Country_Code)}</td>
                    <td>{flight.Departure_Time}</td>
                    <td>{this.getCountry(flight.Origin_Country_Code)}</td>
                    <td>{flight.Landing_Time}</td>
                    <td><button className='white'><i className="material-icons">backspace</i></button></td>
                    <td><button className='white'><i className="material-icons">edit</i></button></td>
                </tr>
            )
        }) : <h5>Nothing to show</h5>;
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
        getCompanyFlights: (id) => dispatch(getCompanyFlights(id)),
        getCountries: () => dispatch(getCountries()),
        getAirlineDetails: (id) => dispatch(getAirlineDetails(id))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(AirlineMenu);
//{() => countries.find(country => country.Id == flight.Destination_Country_Code).Country_Name}