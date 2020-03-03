const express = require("express")
const router = express.Router();
const controller = require("../controllers/tag.controller")
router.route('/').get(controller.getAllTags).post(controller.createTag)
router.route("/:id").get(controller.getTag).put(controller.updateTag).delete(controller.deleteTag)
module.exports = router