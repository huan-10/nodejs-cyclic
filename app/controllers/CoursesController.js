const Course = require("../../app/models/Course");
const { mongooseToObject } = require("../../util/mongoose");

// const userName = require("./middlewareControllers");
const jwt = require("jsonwebtoken");

const show = (req, res, next) => {
  Course.findOne({ slug: req.params.slug })
    .then((course) => {
      // res.json(course);
      // courses = courses.map((course) => course.toObject());
      res.render("courses/show", {
        course: mongooseToObject(course),
        // username: userName.getUserName,
        username: req.myUsername,
      });
    })
    .catch(next);

  // res.send("Hello world");
};
const create = (req, res, next) => {
  res.render("courses/create", { username: req.myUsername });
};

const edit = (req, res, next) => {
  Course.findById(req.params.id)
    .then((course) => {
      res.render("courses/edit", {
        course: mongooseToObject(course),
        username: req.myUsername,
      });
    })
    .catch(next);
};
// POST /courses /store

// PUT courses/:id
const update = (req, res, next) => {
  Course.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.redirect("/me/stored/courses"))
    .catch(next);
};

// DELETE courses/:id

const destroy = (req, res, next) => {
  Course.delete({ _id: req.params.id })
    .then(() => res.redirect("back"))
    .catch(next);
};

// DELETE courses/:id/force

const forceDestroy = (req, res, next) => {
  Course.deleteOne({ _id: req.params.id })
    .then(() => res.redirect("back"))
    .catch(next);
};

// patch courses/:id/restore

const restore = (req, res, next) => {
  Course.restore({ _id: req.params.id })
    .then(() => res.redirect("back"))
    .catch(next);
};

const submitForm = (req, res, next) => {
  switch (req.body.action) {
    case "delete":
      Course.delete({ _id: { $in: req.body.courseIds } })
        .then(() => res.redirect("back"))
        .catch(next);

      break;

    case "restores":
      // Course.delete({ _id: { $in: req.body.courseIds } })
      //   .then(() => res.redirect("back"))
      //   .catch(next);

      Course.restore({ _id: { $in: req.body.courseIds } })
        .then(() => res.redirect("back"))
        .catch(next);
      break;
    case "deleteAll":
      const cookieHeader = req.headers.cookie;
      if (!cookieHeader) {
        return res.render("404", { username: req.myUsername });
      }

      const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("accessToken=")
      );

      if (!accessTokenCookie) {
        return res.render("404", { username: req.myUsername });
      }

      const token = accessTokenCookie.split("=")[1];

      jwt.verify(token, "chaoemnha", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }

        if (user.admin) {
          Course.deleteMany({ _id: { $in: req.body.courseIds } })
            .then(() => res.redirect("back"))
            .catch(next);
        } else {
          return res.render("404", { username: req.myUsername });
        }
      });
      break;

    default:
      res.json({ message: "ACtion is invalid" });
      break;
  }
};

const store = async (req, res, next) => {
  // res.json(req.body)

  const formData = req.body;
  formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

  const course = await new Course(req.body);
  course
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => err);
};

module.exports = {
  show,
  create,
  store,
  edit,
  update,
  destroy,
  restore,
  forceDestroy,
  submitForm,
};
