const express = require("express");
const UserControllers = require("../models/User/Controllers");
const baseHandler = require("../utils/baseHandler");

const userRouter = express.Router({
    mergeParams: true
})

userRouter.get('/user/search/:name', baseHandler(UserControllers.findByName))
userRouter.get('/user/me', baseHandler(UserControllers.getLoggedInUser))
userRouter.get('/user/:id', baseHandler(UserControllers.findById))

userRouter.post('/user/register', baseHandler(UserControllers.registerUser))
userRouter.post('/user/login', baseHandler(UserControllers.login))

userRouter.patch('/user/:id', baseHandler(UserControllers.updateProfile))

module.exports = userRouter;