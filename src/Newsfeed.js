import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import {withRouter, useHistory, BrowserRouter , Switch, Route, Link, Redirect} from "react-router-dom";
import PostDialog from './PostDialog';
import Post from './Post';
import Axios from 'axios';


class Newsfeed extends Component {

    constructor(props){
        super(props);
        this.addPost = this.addPost.bind(this);
        this.createPost = this.createPost.bind(this);
        
        this.state = {
            feedItems : [],
            currentText : "",
            user : ""
            
        }
    }

    createPost(description, tags, file) {
        return <Post key={this.state.feedItems.length} description={description} tags={tags} file={file} user={this.state.user}/>;
    }

    addPost(description, tags, image) {
        const newPost = this.createPost(description, tags, image);
        this.setState({
            feedItems : this.state.feedItems.concat([newPost])
        });
    }

    componentDidMount() { // Runs after the first render
        Axios.get('http://localhost:3001/checklogin').then((response)=> {
        if(response.data.loggedIn === true){
          this.setState({
              user : response.data.user[0].Username
          });
          console.log(response.data.user[0].Username)
          
        }
        
        });
        
    }

    


    render(){
        return (
            <Container>
            <PostDialog onPostSubmit={this.addPost}></PostDialog>
            <List ref="feed">
                {console.log("number of elements: " + this.state.feedItems.length)}
                {this.state.feedItems.reverse().map((item) => 
                {
                return item
                })
                }
            </List>
            </Container>
        );
    }
}

export default withRouter(Newsfeed);