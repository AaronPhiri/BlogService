const mongoose = require('mongoose')
const { Comment } = require("../models/comment.model")
module.exports.getAllComments= async (req,res) => {
    let comments = await Comment.find({});
    return res.send(comments)
}
module.exports.getComment = async (req, res) => {
    let commentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(commentId))
    return res.status(400).send("Invalid Object id");
    let comment = await Comment.findById(commentId)
    if (!comment)
    return res.status(404).send("Comment not found")
    return res.send(comment)
}
module.exports.createComment = async (req, res) => {
    console.log(req.body)
    let comment = new Comment({
        author: req.body.author,
        email: req.body.email,
        url: req.body.url,
        content: req.body.content,
        status:req.body.status
    })
    await comment.save();
    return res.send(comment);
}
module.exports.updateComment = async (req,res) => {
    let commentId = req.params.id;
    Comment.findOneAndUpdate(commentId, req.body,{new: true})
    .then(comment => {
        return res.send(comment)
    })
    .catch(err => {
        return res.status(500).send(err)
    })
}
module.exports.deleteComment = async (req, res) => {
    let commenttId = req.params.id;
    await Comment.findByIdAndDelete(commenttId)
    return res.send("Comment deleted")
}