import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyFlights } from '../Actions/flightActions';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize';
import { getCustomerDetails } from '../Actions/customerActions';
class CustomerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.auth.user
        }
        onsubmit = (e) => {
            e.preventDefault();
        }
    }
    componentDidMount() {

        this.props.getMyFlights(this.state.user.id);
        this.props.getCustomerDetails(this.state.user.id);
    }

    render() {
        const { user } = this.props.auth;
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
                    <td><button className='white'><i className="material-icons">backspace</i></button></td>
                </tr>
            )
        }) : '';
        return (
            <div className="container">
                <h5 className='center'>Hello {user.firstName} {user.lastName}</h5>

                <div className="left">
                    <Collapsible accordion>
                        <CollapsibleItem expanded={false}
                            header="My Details"
                            icon={<Icon>add_box</Icon>}
                            node="div">
                            <row>
                                {user.firstName} {user.lastName}
                            </row>
                            <br />
                            <row>
                                {user.phone}
                            </row>
                            <br />
                            <row>
                                {user.address}
                            </row>
                        </CollapsibleItem>
                        <CollapsibleItem expanded={false}
                            header="Edit My Details"
                            icon={<Icon>add_box</Icon>}
                            node="div">
                            <form action="" className="white">
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="fname">First Name</label>
                                    <input type="text" id="fname" name="firstName" onChange={this.changeHandle} />
                                </div>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="lname">Last Name</label>
                                    <input type="text" id="lname" name="lastName" onChange={this.changeHandle} />
                                </div>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="uname">User Name</label>
                                    <input type="text" id="uname" name="username" onChange={this.changeHandle} />
                                </div>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="text" id="phone" name='phone' onChange={this.changeHandle} />
                                </div>
                                <div className="input-field col 12s 6m">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" id="address" name='address' onChange={this.changeHandle} />
                                </div>
                                <div className="input-field col 12s 6m">
                                    <button className="btn blue darken-4 z-depth-2">Submit</button>
                                </div>
                            </form>
                        </CollapsibleItem>
                        <CollapsibleItem expanded={false}
                            header="Change My Password"
                            icon={<Icon>add_box</Icon>}
                            node="div">
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
                                <td><strong>Cancel</strong></td>
                            </tr>
                            {flightList}
                        </thead>
                    </table>
                </div>
            </div >
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
        getMyFlights: (id) => dispatch(getMyFlights(id)),
        getCustomerDetails: (id) => dispatch(getCustomerDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMenu);