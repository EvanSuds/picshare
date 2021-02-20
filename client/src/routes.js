var express = require('express');
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-Parser');
app.use(cors());
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "f29so",
  database: "profile"
});

connection.connect((err) => {
  if(err){
    console.log(err);
  }
  console.log('MySQL Connected');
});


app.get('/users', (req, res) => {
  connection.query("SELECT * FROM users;", (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
});

app.post('/update',(req,res) => {
  const username = req.body.username
  const fname = req.body.fname
  const lname = req.body.lname
  const comm_email = req.body.commEmail
  connection.query("UPDATE users SET fname = ?, lname = ?, comm_email = ? WHERE username = ?", [fname,lname,comm_email,username], (err, result) =>{
    if (err) throw err;
    res.send(results);
    });
});


app.listen(3001, (error) => {
  if (error) throw err;
  console.log(`App listening on port 3001`)
});