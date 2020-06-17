import React, { Component } from 'react';
import { Tab, Tabs } from 'react-materialize';
import SignUpCustomer from './signUpCustomer';
import SignUpAirline from './SignUpAirline';

export default class SignUpMain extends Component {
    render() {
        return (

            <Tabs className='tab  blue darken-3 ' >
                <Tab options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                }} title="New Customer" active>

                    <SignUpCustomer />


                </Tab>
                <Tab options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                }} title="New Airline">
                    <React.Fragment>
                        <SignUpAirline />
                    </React.Fragment>
                </Tab>
            </Tabs>


        )
    }
}


