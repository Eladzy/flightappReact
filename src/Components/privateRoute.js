import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import signIn from './signIn';

const privateRoute = ({ path, component: Component, isLogged, ...rest }) => {
    return (
        <Route path={path}  {...rest} render={props => {
            if (isLogged === true) {
                return <Component {...props} {...rest}></Component>
            }
            return <Redirect to={signIn} />
        }} />
    );
}

mapStateToProps = (state) => {
    return {
        isLogged: state.authR.isLogged
    }
}

const mapDispatchToProps = () => {
    return{
        
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(privateRoute);