const express = require('express')
const app = express()
const userRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')
const path = require("path")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRouter)
app.use("/api/post", postRouter)
app.use("/api/comment", commentRouter)

module.exports = app;