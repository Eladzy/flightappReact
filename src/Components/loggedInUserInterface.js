import React,{Component} from 'react';


class loggedInUserInterface extends Component{
render(){
 const{user}=this.props
 console.log(user);
 return(
    <div className="container">
        <h5 className='center'>Hello {user.Firstname} {user.lastName}</h5>
        <div className="left">
            //edit user form to put inside a collapsable
            <form className="white">
                
            </form>
        </div>
    </div>
 );
}
}
export default loggedInUserInterface;