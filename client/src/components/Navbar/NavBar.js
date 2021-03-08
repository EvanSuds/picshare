import React from 'react';
import {BrowserRouter , Switch, Route, Link, Redirect, withRouter, useHistory }from "react-router-dom";
import './NavBar.css';
import SideDrawerButton from '../SideDrawer/SideDrawerButton';
import Axios from 'axios';

const navbar = props => (
    <header className="navbar">
        <nav className="navbarContent">
            <div>
                <SideDrawerButton click={props.drawerClickedHandler}/>
            </div>
            <div className="navbarLogo"><a href=''>PicShare</a></div>
            <div className="spacer"></div>
            <div className="navbarItems">
                <ul>
                    <li><Link to="/allNewsFeed">News Feed</Link></li>
                    <li><Link to="/Explore">Explore</Link></li>
                    <li><Link to="/allNewsFeed">Upload</Link></li>
                    <div class="dropdown">
                        <button class="dropbtn"></button>
                        <div class="dropdown-content">
                            <a href="/profile">My Account</a>
                            <a href="/">Logout</a>
                            <a href="#">Privacy Policy</a>
                        </div>
                    </div>
                </ul>
            </div>
        </nav>

    </header>
);



export default navbar;
