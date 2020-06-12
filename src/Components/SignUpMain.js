import React, { Component } from 'react';
import { Tab, Tabs } from 'react-materialize';
import SignUpCustomer from './signUpCustomer';
import SignUpAirline from './SignUpAirline';

class SignUpMain extends Component {
    render() {
        return (
            <div>
                <Tabs>
                    <Tab options={{
                        duration: 300,
                        onShow: null,
                        responsiveThreshold: Infinity,
                        swipeable: false
                    }} title="New Customer">
                        <React.Fragment>
                            <SignUpCustomer />
                        </React.Fragment>

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
            </div>
        )
    }
}


export default SignUpMain