import React from 'react';
import Backdrop from './Backdrop';



const ModalShow = props => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} />
            <div className="customModal" style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', opacity: props.show ? 1 : 0 }}>
                {props.children}
            </div>
        </React.Fragment>
    );
};
export default ModalShow;