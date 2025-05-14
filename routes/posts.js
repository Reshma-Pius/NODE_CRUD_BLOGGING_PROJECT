const express = require('express');  //import express
const postsController = require('../controllers/post.controller');     //import the controller to acess the methods
const checkAuthMiddleware = require('../middleware/check-auth');       //import the middleware

//acess router method in the express object
const router = express.Router();

//define endpoints inside router methods
// router.get("/", postsController.index);
// router.post("/", postsController.save);
// router.get("/", postsController.list);
// router.get("/:id", postsController.show);
// router.patch("/:id", postsController.update);
// router.delete("/:id", postsController.destroy);

//middleware -> now only authenticated users can add or edit or delete a post
router.post("/", checkAuthMiddleware.checkAuth, postsController.save);
router.get("/", postsController.list);
router.get("/:id", postsController.show);
router.patch("/:id", checkAuthMiddleware.checkAuth, postsController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, postsController.destroy);

module.exports = router;
