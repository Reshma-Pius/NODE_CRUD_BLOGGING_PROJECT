require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');   //import bodyParser

const app = express();

//initial example for hello world
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.get('/blog', (req, res) => {
//     res.send('Hello, Blog!');
// });

//import route in route.js
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');            //routes for users
const imageRoute = require('./routes/images');
const commentsRoute = require('./routes/comments');
const testRoutes = require('./routes/tests');

//with use method we can run anythong as middleware for incoming req
app.use(bodyParser.json());          //bodyparser as middleware
app.use('/uploads',express.static('uploads'));                //get image 


app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);
app.use("/comments", commentsRoute);
app.use("/test", testRoutes);

module.exports = app;