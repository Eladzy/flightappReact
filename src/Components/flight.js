import React,{ Component } from 'react';
import { connect } from 'react-redux';

class flight extends Component{
    handleClick=()=>{
        console.log("check token and purchase method")
        this.props.handlePurchase(this.props.flight.id)
    }
    render(){  
        console.log("flight "+this.props)
        const flight=this.props.flight?(
            <div className="flight">
                <h4 className='center'>
                    {this.props.flight.id}
                </h4>
                <p className="flow-text">
                    Takes off at {this.props.flight.departureTime}
                     from {this.props.flight.origin} 
                     and arrivase to {this.props.flight.destination} 
                     at {this.props.flight.landingTime}</p>
                     <div className="center">
                         <button className="btn blue darken-4 z-depth-2" onClick={handleClick} >Purchase</button>
                     </div>
            </div>
        ): <div className="center">
            Loading Flight...
        </div>
        return(
            <div className="container">
                {flight}
            </div>
        );
    }
}
const mapStateToProps = (state,ownProps) => {
    let id=ownProps.match.params
    return{
        flight:state.flights.find(flight=>flight.id===id)
    } 
}
        const mapDispatchToProps=(dispatch)=>{
            return{
                handlePurchase:(id)=>{dispatch({type:'PURCHASE_FLIGHT',id:id})}
            }
        }
export default connect(mapStateToProps,mapDispatchToProps)(flight)