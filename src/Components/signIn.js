import React from 'react';

const signIn=()=>{
    return(
        <div className="container">
            <form className='white' onSubmit=''>
            <h5 className="grey-text-darken-3">Sign In</h5>
            <div className="input-field">
                    <label htmlFor="uname">User Name</label>
                    <input type="text" id="uname" onChange={this.changeHandle}/>
                </div>
                <div className="input-field">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" id="pwd" onChange={this.changeHandle}/>
                </div>
                <div className="input-field">
                    <button className='btn blue darken-4 z-depth-2'>Log in</button>
                </div>
            </form>
        </div>
    );
}
export default signIn;