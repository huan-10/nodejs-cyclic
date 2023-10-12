const express = require("express");
const router = express.Router();
const createAccount = require("../app/controllers/CreateAccount");
const middleware = require("../app/controllers/middlewareControllers");

router.get("/login", createAccount.login);
router.get("/register", createAccount.register);

router.post("/registerUser", createAccount.registerUser);

router.post("/loginUser", createAccount.loginUser);

router.post("/logOut", createAccount.logOut);

// test
module.exports = router;
