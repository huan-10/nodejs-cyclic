const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const middleware = require("../app/controllers/middlewareControllers");

router.get(
  "/search",
  middleware.verifyToken,
  middleware.getUserName,
  siteController.search
);
router.get("/", middleware.getUserName, siteController.index);

module.exports = router;
