import React, { Component } from 'react';

class signUpCustomer extends Component{
    state={

    }
    render(){
    return(
        <div className="container">
            <form onSubmit=''  className="white">
                <h5 className="grey-text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" onChange={this.changeHandle}/>
                </div>
                <div className="input-field">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" onChange={this.changeHandle}/>
                </div>
                <div className="input-field">
                    <label htmlFor="uname">User Name</label>
                    <input type="text" id="uname" onChange={this.changeHandle}/>
                </div>
                <div className="input-field">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" id="pwd" onChange={this.changeHandle}/>
                </div>
                <div className="input-field">
                    <label htmlFor="cpwd">Confirm Password</label>
                    <input type="password" id="cpwd" onChange={this.changeHandle} onFocus={this.onFocusLbl}/>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.changeHandle} onFocus={this.onFocusLbl}/>
                </div>
                <div className="input-field">
                    <label htmlFor="cemail">Confirm Email</label>
                    <input type="email" id="cemail" onChange={this.changeHandle} onFocus={this.onFocusLbl}/>
                </div>
                <div className="input-field">
                    <button className="btn blue darken-4 z-depth-2">Sign up</button>
                </div>
            </form>
        </div>
    );
}
    onFocusLbl=(e)=>{
        let labels=document.getElementsByName("label");
        for (let index = 0; index < labels.length; index++) {
            if(labels[index]["htmlfor"]===e.target.id){
                labels[index].style.position="absolut";
                labels[index].style.transform="translateY(20px)";
            }
        }

    }
    changeHandle=(e)=>{
        console.log(this);
    }
}
export default signUpCustomer;