const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");
const user = require("../models/user.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
    saveRedirectUrl, 
    passport.authenticate("local", { 
    failureRedirect: "/login", 
    failureFlas: true,
 }), 
 userController.login
);

router.get("/logout", userController.logout);

module.exports = router;