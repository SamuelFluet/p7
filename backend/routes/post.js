const express = require("express");
const postControllers = require("../controllers/post");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
// @route GET && POST - /posts/
router.route("/").get(auth, postControllers.getAllPosts)
router.route("/").post(auth, multer, postControllers.createNewPost);

router.route("/:id").get(auth, postControllers.getPostById);
router.route("/:id").delete(auth, postControllers.deletePost);

module.exports = router;
