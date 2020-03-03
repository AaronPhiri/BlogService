const express = require("express")
const router = express.Router();
const controller = require("../controllers/comment.controller.js")
router.route('/').get(controller.getAllComments).post(controller.createComment)
router.route("/:id").get(controller.getComment).put(controller.updateComment).delete(controller.deleteComment)
module.exports = router