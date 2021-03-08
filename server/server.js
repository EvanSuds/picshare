const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser =  require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express()


app.use(express.json());

{/*connection to front end*/}
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true

}));
{/*use cookie parser*/}
app.use(cookieParser());
{/*use body parser*/}
app.use(bodyParser.urlencoded({extended: true}));

{/*create session*/}
app.use(session({
    key: "userId",
    secret: "g1616g",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }

}));
{/*establish connection to database*/}
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "f29so",
    database: "profile"

});

db.connect((err) => {
  if(err){
    console.log(err);
  }
  console.log('MySQL Connected');
});

{/*register method*/}
app.post('/register', (req, res)=>{

    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err !== null){
            console.log(err);

        }
        if(email === ""){
            db.query("INSERT INTO profile.userDetails (username, password) VALUES (?,?)",
            [username, hash],
            (err, result)=>{
                if(err !== null){
                    if(err.errno === 1062){
                        res.send({message: "Duplicate user"});
                    }
                }
                else{
                    req.session.user = result;
                }
            });
        } else {
            db.query("INSERT INTO profile.userDetails (username, password, email) VALUES (?,?,?)",
            [username, hash, email],
            (err, result)=>{
                if(err !== null){
                    if(err.errno === 1062){
                        res.send({message: "Duplicate user"});
                    }
                }
                else{
                    req.session.user = result;
                }



        });
        }



    })

});

{/*checked if logged in method*/}
app.get('/checklogin', (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }
    else {
        res.send({loggedIn: false})
    }
})

app.post('/updateTable', (req, res) =>{
    db.query("SELECT * FROM profile.userDetails", (err, result) => {
        //console.log(result)
        console.log("update err" + err)
        res.send(result);

    })
})


app.post('/refresh', (req, res) =>{
    db.query("SELECT * FROM profile.userdetails ORDER BY userID DESC LIMIT 1", (err, result) => {
        console.log(result)
        console.log("refresh err" + err)
        res.send(result);

    })
})

{/*login method*/}
app.post('/login', (req, res) => {
    const usernameEmail = req.body.usernameEmail
    const password = req.body.password

    db.query("SELECT * FROM profile.userdetails WHERE username =? OR email =?", [usernameEmail, usernameEmail],
    (err, result)=>{
        if(err) {
            console.log(err);
        }
        else if(result.length >0) {

            bcrypt.compare(password, result[0].password, (err, response)=>{
                if(response){
                    req.session.user = result;
                    res.send(result);
                }
                else {
                    res.send({message: "The password is incorrect"})
                    console.log(err);
                }
            });
        }
        else{
            console.log("login error " + err)
            console.log("login result " + result)
            res.send({message: "This user doesnt exist"})
        }


    });
});


app.post('/setDetails', (req, res) => {
    const firstName = req.body.firstName
    const secondName = req.body.secondName
    const description = req.body.description
    const username = req.body.username


    db.query("INSERT INTO profile.profileinfo (username, fname, lname, description) VALUES (?,?,?,?)", [username, firstName, secondName, description],
    (err, result)=>{
        if(err) {
            console.log("setdetails error " +err);
        }
        //res.send(result);


        res.send({message: "changed details"})



        console.log("details error " + err)
        console.log("details result " + result)
        //res.send({message: "This user doesnt exist"})



    });
});

app.post('/posts', (req, res) => {
    const username = req.body.username
    const description = req.body.description
    const img = req.body.img


    db.query("INSERT INTO profile.Posts (Username, Image, PostDes) VALUES (?,?,?)", [username, img, description],
    (err, result)=>{
        if(err) {
            console.log("setdetails error " +err);
        }
        //res.send(result);


        res.send(result)



        console.log("posts error " + err)
        console.log(result)
        //res.send({message: "This user doesnt exist"})



    });
});


app.post('/tags', (req, res) => {
    const tags = req.body.tags
    const id = req.body.id

    tags.forEach(element =>
        db.query("INSERT INTO profile.interests (interestName) VALUES (?)", [element],
        (err, result)=>{
            if(err) {
                console.log(id);
                console.log("tags error " +err);
            }

            db.query("INSERT INTO profile.posttags (InterestID, PostID) VALUES ((SELECT InterestID FROM profile.interests WHERE interestName=?), (SELECT PostID FROM profile.posts WHERE PostID=?))", [element, id],
            (err, result)=>{
                if(err) {
                    console.log("tags1 error " +err);
                }
                console.log(result)
                })



            console.log(result)
        })
    )
});

app.post('/setInterest', (req, res) => {
    const interests = req.body.interests
    const username = req.body.username

    for(i = 0; i < interests.length; i++){
      console.log(interests[i]);
      console.log(username);
        db.query("INSERT INTO profile.userinterests (InterestID, UserID) VALUES ((SELECT InterestID FROM profile.Interests WHERE interestName=?),(SELECT userID FROM profile.userdetails WHERE username=?));", [interests[i], username],
        (err, result)=>{
            if(err) {
                console.log("setinterest error " +err);
            }
            //res.send(result);


            //res.send({message: "changed interest"})



            console.log("interest error " + err)
            console.log("interest result " + result)
            //res.send({message: "This user doesnt exist"})



        });
    }
});


app.post('/users', (req, res) => {
    const username = req.body.username
    db.query("SELECT * FROM profile.profileinfo WHERE username =?;", [username], (err, results) => {
      if(err){
          console.log("profile err " + err)
      }
      res.send(results);
    });
  });

  app.post('/update',(req,res) => {
    const username = req.body.username
    const fname = req.body.fname
    const lname = req.body.lname
    const comm_email = req.body.commEmail
    const image = req.body.image
    
      db.query("UPDATE profile.profileinfo SET fname = ?, lname = ?, comm_email = ? WHERE username = ?", [fname,lname,comm_email,username], (err, result) =>{
        if (err) throw err;
        res.send(result);
        });
  });

  app.post('/myposts',(req,res) => {
    const username = req.body.username
    db.query("SELECT * FROM profile.posts WHERE Username=? ORDER BY PostID DESC", [username], (err, result) =>{
      if (err) throw err;
      res.send(result);
      });
  });

  app.post('/deletepost',(req,res) => {
    const postID = req.body.postid
    db.query("DELETE FROM profile.posts WHERE PostID=?",[postID],(err,result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });

{/*log server is running*/}
app.listen(3001, () =>{
    console.log("Running server")
})
