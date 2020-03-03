const mongoose = require('mongoose')
const { Tag } = require('../models/tag.model')
module.exports.getAllTags= async (req,res) => {
    let tags = await Tag.find({});
    return res.send(tags)
}
module.exports.getTag = async (req, res) => {
    let tagId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(tagId))
    return res.status(400).send("Invalid Object id");
    let tag = await Tag.findById(tagId)
    if (!tag)
    return res.status(404).send("Tag not found")
    return res.send(tag)
}
module.exports.createTag = async (req, res) => {
    console.log(req.body)
    let tag = new Tag({
        name: req.body.name,
        frequency: req.body.frequency
    })
    await tag.save;
    return res.send(tag);
}
module.exports.updateTag = async (req,res) => {
    let tagId = req.params.id;
    Tag.findOneAndUpdate(tagId, req.body,{new: true})
    .then(tag => {
        return res.send(tag)
    })
    .catch(err => {
        return res.status(500).send(err)
    })
}
module.exports.deleteTag = async (req, res) => {
    let tagId = req.params.id;
    await Tag.findByIdAndDelete(tagId)
    return res.send("Tag deleted")
}