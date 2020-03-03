const mongoose = require('mongoose')
const { Post } = require("../models/post.model")
module.exports.getAllPosts= async (req,res) => {
    let posts = await Post.find({});
    return res.send(posts)
}
module.exports.getPost = async (req, res) => {
    let postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(400).send("Invalid Object id");
    let post = await Post.findById(postId)
    if (!post)
    return res.status(404).send("Post not found")
    return res.send(post)
}
module.exports.createPost = async (req, res) => {
    console.log(req.body)
    let post = new Post({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        tags: req.body.tags
    })
    await post.save();
    return res.send(post);
}
module.exports.updatePost = async (req,res) => {
    let postId = req.params.id;
    Post.findOneAndUpdate(postId, req.body,{new: true})
    .then(post => {
        return res.send(post)
    })
    .catch(err => {
        return res.status(500).send(err)
    })
}
module.exports.deletePost = async (req, res) => {
    let postId = req.params.id;
    await Post.findByIdAndDelete(postId)
    return res.send("Post deleted")
}