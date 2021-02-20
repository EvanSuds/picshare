import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { green, red } from '@material-ui/core/colors';
import img1 from './image1.jpg';
import foodimg from './images/food.jpg'
import travelimg from './images/travel.jpg'
import sportimg from './images/sport.jpg'


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const useStyles1 = makeStyles({
  root: {
    width: "100%",
    maxWidth: "36ch",
    
   
    
  },
  inline: {
    display: "inline"
  },
  Listy:{
    padding: 55,
    textAlign: 'center',
    
    display: 'block',
  },
  imgc:{
    
    maxWidth: '70%',
   borderRadius: '20%',
   
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>â€¢</span>;
  const classes1 = useStyles1();
  return (
    <Card className={classes.root}>
      <CardContent>
     

        <Typography variant="h5" component="h2">
          Your Groups
        </Typography>
        <List className={classes1.root}>
        <Divider variant="inset" component="li" />
      <ListItem className={classes1.Listy} alignItems="flex-start">
      
      <img className={classes1.imgc} src={img1} />
        <ListItemText  primary="Landscapes" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem className={classes1.Listy} alignItems="flex-start">
      <img className={classes1.imgc} src={foodimg} />
        <ListItemText primary="Food" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem className={classes1.Listy} alignItems="flex-start">
      <img className={classes1.imgc} src={travelimg} />
        <ListItemText primary="Travel" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem className={classes1.Listy} alignItems="flex-start">
      <img className={classes1.imgc} src={sportimg} />
        <ListItemText primary="Sport" />
      </ListItem>
    </List>
      </CardContent>
    </Card>
  );
}