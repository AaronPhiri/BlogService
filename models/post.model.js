const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    status: {
        type: Number,
        required:true
    },
    tags: {
        type: Array,
        required: false
    }
})
module.exports.Post = mongoose.model("Post", postSchema)