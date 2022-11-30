const express = require("express");
const jwt = require("jsonwebtoken")
const passport= require("passport")


const AuthController = require("../controllers/authController");

const userSignupValidation = require("../validators/user.validator") // user validator

const authRouter = express.Router();


authRouter.post("/signup", userSignupValidation ,passport.authenticate("signup", { session: false}),  AuthController.signup)

authRouter.post('/login', async (req, res, next) => passport.authenticate('login', (err, user, info) => {
    AuthController.login(req, res, { err, user, info})
})(req, res, next))



module.exports = authRouter;