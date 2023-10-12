const express = require("express");
const router = express.Router();
const middleware = require("../app/controllers/middlewareControllers");

const coursesController = require("../app/controllers/CoursesController");
router.get(
  "/create",
  middleware.verifyToken,
  middleware.getUserName,
  coursesController.create
);
router.post("/store", coursesController.store);
router.get(
  "/:id/edit",
  middleware.verifyTokenAndAdm,
  middleware.getUserName,
  coursesController.edit
);
router.post(
  "/submit-form",
  middleware.getUserName,
  coursesController.submitForm
);

router.put("/:id", coursesController.update);
router.delete("/:id", coursesController.destroy);
router.delete(
  "/:id/force",
  middleware.verifyTokenAndAdm,
  middleware.getUserName,
  coursesController.forceDestroy
);

router.patch("/:id/restore", coursesController.restore);

router.get("/:slug", middleware.getUserName, coursesController.show);

module.exports = router;
