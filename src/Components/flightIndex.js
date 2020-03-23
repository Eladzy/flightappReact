import React, { Component } from 'react';
import {connect} from 'react-redux';

class flightIndex extends Component{ 

    render(){
        
        consolelog(props);
        console.log(this.state);
        const {flights}=this.props;
        const flightList=flights.length?(flights.map(flight=>{
            return(
                <div className="card medium z-depth-2">
                    <div className="card-image" id={flight.id}>
                        <img class="responsive-img" src="../public/imgis.png"/>
                        <span className="card-title">{flight.destination}</span>
                    </div>
                    <div className="card-content">
                        <p className="flow-text">Takes off at {flight.departureTime} from {flight.origin} and arrivase at {flight.landingTime}</p>                        
                    </div>
                    <div className="card-action">
                    <a class="waves-effect waves-light btn-small blue darken-4 z-depth-2">Purchase</a>
                    </div>
                </div>
            )
        })): (<div className="center"><h1 className="center flow-text">Nothing to show</h1></div>)
        
        
        return(
            <div>
             <div className="container">
                 {flightList}
                 </div>   
            </div>
        );
    }     
}


const mapStateToProps=(state)=>{
    return{
        flights:state.flightR.flights
    }
}


export default connect(mapStateToProps)(flightIndex);