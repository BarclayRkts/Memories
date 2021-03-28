const mongoose = require("mongoose");
const express = require("express");
const app = express();
let cors = require("cors");
const bodyParser = require("body-parser");
const Post = require("./post");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require('mongodb').ObjectID;
require('dotenv').config();


mongoose.connect(
    process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, 
    () => {
    console.log("Mongoose is Connected");
});

// ---------------------------------------------- Middleware -------------------------------------- //

app.use(cors({
    origin: "http://localhost:3000", //only want frontend to have access to api
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---------------------------------------------- End of Middleware -------------------------------------- //

app.get('/', (req, res) => {
    res.send("You are on the Home Page");
});


app.post("/", function (req, res, next) {
    console.log(req.body);

    let post = new Post({
        name: req.body.name,
        title: req.body.title,
        msg: req.body.msg,
        tags: req.body.tags,
        img: req.body.img
    });
    console.log(req.body);
    
    post.save((err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send({data});
        }
    })
});

// // add a document to the DB collection recording the click event
app.post("/like", (req, res) => {
    console.log(req.body.id);
    
    // Post.findById(req.body.id, (error, post) => {
    //     console.log(post);
    //     if (error) return res.json({ success: false, error });
        


    //     post.save(error => {
    //     if (error) return res.json({ success: false, error });
    //         return res.json({ success: true });
    //     });
    // });

    MongoClient.connect(process.env.DATABASE_URL, function(err, db) {
        if (err) throw err;

        let dbo = db.db("MemoriesApp");
        dbo.collection('posts').updateOne(
            // find record with name "MyServer"
            { "_id": ObjectID(req.body.id)},
            // increment it's property called "ran" by 1
            { $inc: { likes_count: 1 } }
        );

        return db.close();
        
    });
})

// app.get("/like", (req, res) => {
//     MongoClient.connect(process.env.DATABASE_URL, function(err, db) {
//         if (err) throw err;

//         let dbo = db.db("MemoriesApp");
//         dbo.collection("posts").findOne({
//             "_id": ObjectID(req.body.id)
//         }, 
//         function(err, result) {
//             console.log(result);
//             if (err) throw err;
//             res.json(result);
//             db.close();
//         });
//     });
// })

//display all mongodb data on backend
app.get("/posts/api", (req, res) => {

    MongoClient.connect(process.env.DATABASE_URL, function(err, db) {
        useNewUrlParser: true;
        if (err) throw err;
        let dbo = db.db("MemoriesApp");
        dbo.collection("posts").find({}).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
})


app.listen(3001, () => {
    console.log("Express server is running!")
});


