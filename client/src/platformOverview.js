import React, {useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar/NavBar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'
import './profile.css';
import {BrowserRouter , Switch, Route, Link, Redirect, withRouter, useHistory }from "react-router-dom";
import Axios from 'axios';
import { userInfo } from 'os';



 //credintials for get, using axios
 Axios.defaults.withCredentials = true;
class Profile extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    usersPostArray: [], // An array to store the users post information
    usersInfoArray: [] // An array to store the users information when fetched from the db
  };
}

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


getUsageStats() {
  Axios.post('http://localhost:3001/users', {
            username: user
        }).then((response) => {
          if(response){
            this.setState({
              usersInfoArray: response.data, // Store the information in the users info array
            });
          } else {
            console.log("no response")
          }
        });
}

componentDidMount() { // Runs after the first render
    Axios.get('http://localhost:3001/checklogin').then((response)=> {
    if(response.data.loggedIn === true){
      user = response.data.user[0].username
      userId = response.data.user[0].userID
      this.getUsageStats();
    }
    });
}


render() {

    let backdrop;
        let sideDrawer;

        if (this.state.sideDrawerOpen) {
            sideDrawer = <SideDrawer />;
            backdrop = <Backdrop click={this.backdropClick} />
        }

return (
  <>{this.state.usersInfoArray.map((info, i)=> {
    Username = info.username
    return(
<div class = "profilePage" key = {i}>
         <div className="App">
                <Navbar drawerClickedHandler={this.drawerToggleClick} />
                {sideDrawer}
                {backdrop}
        </div>
        <br/>
        <div className = "square"
        title = "click to upload background image"
        style={{
          cursor: 'pointer',
          height: '300px',
          backgroundSize: '100% 100%',
          backgroundImage: info.backgroundImage ? `url(${info.backgroundImage})` : 'url("https://tomaszjanickiphoto.co.uk/wp-content/gallery/scotland/DSC_8286.jpg")'
          }}
          onClick={(e) => {
              this.handleUploadImage(e, info, i, false);
          }}
        >
          <span>
            <p>
              <img
                src = {info.image}
                alt = 'No Image set'
                style={{ width: '80px', height: '80px', display: 'inline-block', margin: '10px', fontSize: '14px', lineHeight: '80px', textAlign: 'center', cursor: 'pointer' }}
                onClick={e => {
                  e.stopPropagation();
                  this.handleUploadImage(e, info, i, true);
                }}
                />
              {info.fname} {info.lname}
                <span>
                <br/>
                    I have
                    <span style={{ color: 'red', fontWeight: 600, margin: '0 10px' }}>{this.state.fans.length}</span>
                    followers and
                    <span style={{ color: 'red', fontWeight: 600, margin: '0 10px' }}>{info.points}</span>
                    points
                </span>

            </p>
          </span>
        </div>
      <h3>My Account</h3>
      <p>View and edit your personal info below</p>
        <div className="searcher">
          <input defaultValue={this.state.keywords} placeholder="search other users" onChange={(e) => {
            this.setState({
              keywords: e.target.value
            });
          }}/>
          <button onClick={(e) => {
            if (this.state.keywords.trim()) {
              this.searchUsers(this.state.keywords.trim());
            }
            }}>search users</button>
          </div>
          <div className="user-list">
          {
            this.state.users.map((user) => {
            return (
            <div className="user">
            <span>{user.username}   </span>
            {
              this.state.followedUserIds.includes(user.userID)
              ?
              <button className="disabled">Followed</button>
              :
              <button onClick={(e) => {
                this.follow(user.userID);
              }}>Follow</button>
              }
              </div>
            );
          })
        }
      </div>
      <p>Login Email: {info.login_Email}</p>
      <div class = "form">
      <form>

          <div class = "form-entry">
            <div class = "row-label">
              <label htmlFor="fname">First name:</label>
            </div>
            <div class = "row-field">
              <input type="text" id="fname" name="fname" autoComplete="new-password" defaultValue = {info.fname} onChange={ (e) => {
                  Fname = e.target.value;
                }}/>
            </div>
          </div>

          <div class = "form-entry">
            <div class = "row-label">
              <label htmlFor="lname">Last name:</label>
            </div>
            <div class = "row-field">
              <input type="text" id="lname" name="lname" autoComplete="new-password" defaultValue = {info.lname} onChange={ (e) => {
                  Lname = e.target.value;
                }}/>
              </div>
            </div>

          <div class = "form-entry">
            <div class = "row-label">
              <label htmlFor="email">Contact Email: </label>
            </div>
            <div class = "row-field">
              <input type = "text" id="email" name="email" autoComplete="new-password" defaultValue = {info.comm_email}  onChange={ (e) => {
                  CommEmail = e.target.value;
                }}/>
              </div>
            </div>
          <br/>
            <div class = "form-entry">
              <input type="submit" value="Update Info" class = "submitbutton" onClick={(e) => {
                if(!(this.checkValidity(Fname) && this.checkValidity(Lname) && this.checkEmailValidity(CommEmail.toLowerCase)) || (!(Fname.length > 0) || !(Lname.length > 0) || !(CommEmail.length > 0))) {
                  alert("The fields must not be empty or contain illegal characters");
                }
                else {
                  alert("Successfully Updated");
                  this.handleSubmit(e);
                }
              }}/>
            </div>
      </form>
      </div>
      <div>
      <br/>
        <h3> My Posts (Most recent first)</h3>

        {this.state.usersPostArray.map(post => <div key = {post}> <img src = {post.Image} width = "200" height = "200" px></img> <h3>{post.PostDes}</h3> <br/>
      <input type="submit" value="Delete Image" class = "deletebutton" onClick={(e) => {
          PostID = post.PostID;
          this.deleteImage(e);
        }}/>
      <br/>
      <hr class="solid2"/>
      </div>)}
        <footer>
          © 2021 by Picshare
        </footer>
        </div>
</div>
    )
  })}
  </>
   );
  }
}
ReactDOM.render(
    <Profile/>,
    document.getElementById('root')
  );

export default withRouter(Profile);
