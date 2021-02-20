import React from 'react';
import './SideDrawer.css';

const sideDrawer = props => (

    <nav className='sideDrawerContent' >
        <ul>
            <li><a href=''>News Feed</a></li>
            <li><a href=''>Explore</a></li>
            <li><a href=''>Upload</a></li>
            <li><a href=''>My Account</a></li>
            <li><a href=''>Settings</a></li>
            <li><a href=''>Privacy Policy</a></li>
        </ul>
    </nav>
);

export default sideDrawer;