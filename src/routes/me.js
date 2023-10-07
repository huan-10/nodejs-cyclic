const express = require("express");
const router = express.Router();
const meController = require("../app/controllers/MeController");

const middleware = require("../app/controllers/middlewareControllers");

router.get(
  "/stored/courses",
  middleware.verifyToken,
  middleware.getUserName,
  meController.storedCourses
);
router.get(
  "/trash/courses",
  middleware.verifyToken,
  middleware.getUserName,
  meController.trashCourses
);
router.get(
  "/stored/news",
  middleware.verifyToken,
  middleware.getUserName,
  meController.postsNews
);

module.exports = router;
