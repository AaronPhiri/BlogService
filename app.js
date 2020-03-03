const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect('mongodb://127.0.0.1/blogs',{
    useNewUrlParser: true,
    useCreateIndex: true
}).then(err => {
    console.log('conected to mongodb at mongodb://localhost/blogs')
}).catch (err => {
    console.log("Failed to connect to MongoDB...", err)
    process.exit();
})
const postsRouter = require('./routes/post.route');
const commentsRouter = require('./routes/comment.route')
const tagsRouter = require('./routes/tag.route')
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/tags", tagsRouter);
app.use((req,res,next) => {
    next(createError(404))
})
app.use(function(err,req,res, next){
    res.locals.message = err.message
    res.status(err.status || 500)
    res.send(err)
})
module.exports = app