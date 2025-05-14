const express = require('express');  //import express
const userController = require('../controllers/user.controller');     //import the controller to acess the methods

//acess router method in the express object
const router = express.Router();

//endpoints
router.post("/sign-up", userController.signUp);
router.post("/login", userController.login);



module.exports = router;