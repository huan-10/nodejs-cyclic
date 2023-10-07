const express = require("express");
const router = express.Router();

const apiController = require("../app/controllers/ApiController");

router.get("/data", apiController.index);

module.exports = router;
