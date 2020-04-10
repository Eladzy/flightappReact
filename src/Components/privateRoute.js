import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest}
        render={
            function (props) {
                if (auth.isLoading) {
                    return (<h2>Loading...</h2>)
                } else if (!auth.isAuthenticated) {
                    return <Redirect to="/login" />;
                } else {
                    return <Component {...props} />;
                }
            }
        } />
)

const mapStateToProps = (state) => ({

    auth: state.authR,

});

export default connect(mapStateToProps)(PrivateRoute);





// return (
            //     <Route path={path}  {...rest} render={props => {
            //         if (isLogged === true) {
            //             return <Component {...props} {...rest}></Component>
            //         }
            //         return <Redirect to={signIn} />
            //     }} />
            // );