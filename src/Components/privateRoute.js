import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({ path, component: Component, isLogged, ...rest }) => {
    return (
        <Route path={path}  {...rest} render={props => {
            if (isLogged === true) {
                return <Component {...props} {...rest}></Component>
            }
        }} />
    );
}
export default connect()(privateRoute);