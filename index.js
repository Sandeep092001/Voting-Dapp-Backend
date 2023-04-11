const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());


  //Mongo Connection

  const {MongoClient} = require("mongodb");
  var url =
    "mongodb+srv://Sandeep4769:sandeep4769@cluster0.o5rf9r0.mongodb.net/foodie";
  
 

 //End

  app.post('/register',(req,res) =>{

    const username = req.body.username;
    const password = req.body.password;

    // MongoClient.connect(url, (err, db) => {
    //     if (err) throw err;
    //     var dbo = db.db("foodie");
    //     var data = {fullname: username, password: password}
    //     dbo.collection("userLoginData").insertOne(data, (err, res) => {
    //     if (err) throw err;
       
    //     console.log("inserted");
    //     res.json({status: "success"});
    //     db.close();
    //     });
    //   });

      MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(async(client)=>{
        console.log("connected");
        var data = {fullname: username, password: password}
        const db=client.db("foodie");
        const collection = db.collection("userLoginData");
        var stat = await collection.insertOne(data);
        if(stat){
            res.json({status: "success"})
        }
        }).catch((err)=>{
            console.log(err);
        })
    
      
    
});

app.post('/login',(req,res) =>{

    const username = req.body.username;
    const password = req.body.password;

    // MongoClient.connect(url, async(err, db)=>{
    //     if(err) throw err;
    //     var dbo = await db.db("foodie");
    //     var user = await dbo.collection("userLoginData").findOne({fullname: username, password: password});
        
        
    // })
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(async(client)=>{
        console.log("connected");
        const db = client.db("foodie");
        const collection = db.collection('userLoginData');
        const user = await collection.findOne({fullname: username, password: password});
        if(user){
            res.json({username: user.fullname});
        }else{
            res.json({status: 'not found'});
        }
    }).catch((err)=>{
        console.log(err);
    })

})

app.listen(port, function(){
    console.log("server is running http://localhost:"+port);
})
