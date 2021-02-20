import React from 'react';
import './SideDrawerButton.css';

const drawerButton = props => (

    <button className="buttonToggle" onClick={props.click}>
        <div className="buttonLine"></div>
        <div className="buttonLine"></div>
        <div className="buttonLine"></div>
    </button>

);

export default drawerButton;