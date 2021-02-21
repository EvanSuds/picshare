import Newsfeed from './Newsfeed';
import "./sndnewsfeed.css"
import React, { Component } from 'react';
import './newsfeed.css';
import Navbar from './components/Navbar/NavBar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Card from './groupcard';
import Card1 from './friendcard';

class allNewsFeed extends Component {

  state = {
      sideDrawerOpen: false
  };

  drawerToggleClick = () => {
      this.setState((prevState) => {
          return { sideDrawerOpen: !prevState.sideDrawerOpen };
      });
  };

  backdropClick = () => {
      this.setState({ sideDrawerOpen: false });
  };

  render() {
   
      let backdrop;
      let sideDrawer;

      if (this.state.sideDrawerOpen) {
          sideDrawer = <SideDrawer />;
          backdrop = <Backdrop click={this.backdropClick} />
      }
      return (
        
          <div className="App">
              <Navbar drawerClickedHandler={this.drawerToggleClick} />
              {sideDrawer}
              {backdrop}
    <div class="container"id="testid">
      <div class="row">
      <div class="col">
          <Card/>
        </div>
        <div class="col" id="newsfeedid">
          <Newsfeed/>
        </div>
        <div class="col">
          <Card1/>
        </div>
        
      </div>
    </div>
  </div>
     
      
      
      );
  }
}


export default allNewsFeed;