const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    frequency: {
        type: Number,
        required: true
    }
})
module.exports.Tag = mongoose.model("Tag", tagSchema)