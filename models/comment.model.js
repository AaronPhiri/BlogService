const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10
    },
    email: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    content: {
        type:String,
        required: true
    },
    status: {
        type:Number,
        required: true
    }
})

module.exports.Comment = mongoose.model("Comment", commentSchema)