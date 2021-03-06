import React, {useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar/NavBar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop'
import './profile.css';
import {BrowserRouter , Switch, Route, Link, Redirect, withRouter, useHistory }from "react-router-dom";
import Axios from 'axios';
import { userInfo } from 'os';



const specialCharacterRegx = /[ !@#$%^&*()_+\-=[\]{}'"\\|,./]/;
const illegalCharacterRegx = /[<>;:?]/;
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var Username, Fname, Lname, CommEmail, user, PostID,image = ""; // Variables which can be used to update users details

 //credintials for get, using axios
 Axios.defaults.withCredentials = true;
class Profile extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    usersPostArray: [], // An array to store the users post information
    usersInfoArray: [], // An array to store the users information when fetched from the db
  };
  this.handleChange = this.handleChange.bind(this);
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


getUserInfo() {

  Axios.post('http://localhost:3001/users', {
            username: user
        }).then((response) => {
          if(response){
            this.setState({
              usersInfoArray: response.data, // Store the information in the users info array
            });
          }else {
            console.log("no response")
          }
        });
        Axios.post('http://localhost:3001/myposts', {
                  username: user
              }).then((response) => {
                console.log(response.data);
                if(response){
                  this.setState({
                    usersPostArray: response.data,
                  });
                }else {
                  console.log("no response")
                }
              });
}

componentDidMount() { // Runs after the first render
    Axios.get('http://localhost:3001/checklogin').then((response)=> {
    if(response.data.loggedIn === true){
      user = response.data.user[0].username
      this.getUserInfo(); // Fetch the users info and posts by calling function
    }
    });
}

checkValidity(e) { // Method to check if user first name and surname are valid
    var count = 0;
    specialCharacterRegx.test(e) ? count-- : count++;
    illegalCharacterRegx.test(e) ? count-- : count++;
    return count === 2;
}

checkEmailValidity(e) { // check if email is valid
  var count = 0;
  emailRegex.test(e) ? count-- : count++;
  return count === 1;
}

handleSubmit(event) { // Handle POST
    event.preventDefault();

    Axios.post('/update', { //Send to backend express nodejs server
      username : Username,
      fname : Fname,
      lname : Lname,
      commEmail : CommEmail
    });
      this.getUserInfo();
      window.location.reload();
}

handleChange(event){
    const file = URL.createObjectURL(event.target.files[0]);
    image = file;
    console.log(file);
}

deleteImage(event) { // Handle POST
    event.preventDefault();
    var r = window.confirm("Are you sure you want to delete, this cannot be undone");
    if(r == true) {
    console.log(PostID);
    Axios.post('/deletepost', { //Send to backend express nodejs server
      postid : PostID
    });
      this.getUserInfo();
      window.location.reload();
    }

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

    <div class ="blackBar">
         <div className="App">
                <Navbar drawerClickedHandler={this.drawerToggleClick} />
                {sideDrawer}
                {backdrop}
        </div>
    <br/>
      <div class = "userInfo">
        <div class = "square">
          <span>
            <p>
              <label htmlFor = "fileUpload">
              <img class = "userImage" id="userImage" src = {info.image} alt = "Loading..." width = "100" height = "100"/>
              </label>
              <input hidden id="fileUpload" type="file" accept="image/*" onChange={ (e) => {
                  this.handleChange(e);
              }}/>
              {info.fname} {info.lname}
            </p>
          </span>
        </div>
      <h3>My Account</h3>
      <p>View and edit your personal info below</p>
      <hr class="solid2"/>
      <p>Login Email: {info.login_Email}</p>
      <div class = "form">
      <form>
          <div class = "form-entry">
            <label htmlFor="fname">First name:</label>
            <br/>
            <input type="text" id="fname" name="fname" autoComplete="new-password" defaultValue = {info.fname} size = "40" onChange={ (e) => {
              Fname = e.target.value;
            }}/>
          </div>
          <div class = "form-entry">
            <label htmlFor="lname" id="fname">Last name:</label>
            <br/>
            <input type="text" id="lname" name="lname" autoComplete="new-password" defaultValue = {info.lname} size = "40" onChange={ (e) => {
              Lname = e.target.value;
            }}/>
          </div>
          <br/>
          <div class = "form-entry">
            <label htmlFor="email">Contact Email: </label>
            <br/>
            <input type = "text" id="email" name="email" autoComplete="new-password" defaultValue = {info.comm_email} size = "100" onChange={ (e) => {
              CommEmail = e.target.value;
            }}/>
          </div>
            <br/>
            <input type="submit" value="Update Info" class = "button" onClick={(e) => {
              if(!(this.checkValidity(Fname) && this.checkValidity(Lname) && this.checkEmailValidity(CommEmail.toLowerCase)) || (!(Fname.length > 0) || !(Lname.length > 0) || !(CommEmail.length > 0))) {
                alert("The fields must not be empty or contain illegal characters");
              }
              else {
                alert("Successfully Updated");
                this.handleSubmit(e);
              }
            }}/>
      </form>
      </div>
      </div>
    </div>
    )
  })}
  <div class = "userInfo">
  <hr class="solid2"/>
  <h3> My Posts (Most recent first)</h3>

  {this.state.usersPostArray.map(post => <div key = {post}>   <hr class="solid2"/> <img src = {post.Image} width = "200" height = "200" px></img> <h3>{post.PostDes}</h3>
<input type="submit" value="Delete Image" class = "deletebutton" onClick={(e) => {
    PostID = post.PostID;
    this.deleteImage(e);
  }}/>
</div>)}
<hr class="solid2"/>
  <footer>
    © 2021 by Picshare
  </footer>
  </div>

  </>
   );
  }
}
ReactDOM.render(
    <Profile/>,
    document.getElementById('root')
  );

export default withRouter(Profile);
