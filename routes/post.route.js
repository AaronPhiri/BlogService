const express = require("express")
const router = express.Router();
const controller = require("../controllers/post.controller")
router.route('/').get(controller.getAllPosts).post(controller.createPost)
router.route("/:id").get(controller.getPost).put(controller.updatePost).delete(controller.deletePost)
module.exports = router