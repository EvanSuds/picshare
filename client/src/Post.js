import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import Axios from 'axios';







var split = [];
var add = true;
var id = "";

class Post extends Component {
    constructor(props) {
      super(props);
      this.state = { description: props.description, key: props.key, file: props.file, tags : props.tags, user: props.user};
      console.log("Props file: " + props.file);
    }



    postPostInfo() {

      Axios.post('http://localhost:3001/posts', {
                username: this.state.user,
                description: this.state.description,
                img: this.state.file

            }).then((response) => {
              if(response){
                id = response.data.insertId
              }else {
                console.log("no response")
              }
              
    
            })
          add = false;
      
    }

    postPostTags() {
      console.log("intags")
      Axios.post('http://localhost:3001/tags', {
                tags: split,
                id: id
               

            }).then((response) => {
              if(response){
                
              }else {
                console.log("no response")
              }
              
    
            })
      
    }

    parseTags(){
      split = this.state.tags.split(" ")
     
      console.log(split)
        
      this.postPostTags();
    }

    componentDidMount() { // Runs after the first render
      console.log("in component")
      //if(add){
        this.postPostInfo();
        this.parseTags();
      //}
          
          
          
          
        

      
    }







    
    render() {
      return (
      
        <ListItem key={this.state.key}>
            <Card>
                <CardContent>
                <img src={this.state.file} />
                <Typography>
                    User
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {this.state.description}
                </Typography>
                <br></br>
                <Typography color="textSecondary" gutterBottom>
                    {this.state.tags}
                </Typography>
                </CardContent>
            </Card>
                    
        </ListItem>
      );
    }
}

export default Post;