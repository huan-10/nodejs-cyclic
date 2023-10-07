const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

const storedCourses = (req, res, next) => {
  Promise.all([
    Course.find({}).sortable(req),
    Course.countWithDeleted({ deleted: true }),
  ])
    .then(([courses, deletedCount]) => {
      res.render("me/stored-courses", {
        deletedCount,
        courses: mutipleMongooseToObject(courses),
        username: req.myUsername,
      });
    })
    .catch(next);

  // res.send("Hello world");
};

const trashCourses = (req, res, next) => {
  Course.findWithDeleted({ deleted: true })
    .sortable(req)
    .then((courses) =>
      res.render("me/trash-courses", {
        courses: mutipleMongooseToObject(courses),
        username: req.myUsername,
      })
    )
    .catch(next);
};

const postsNews = (req, res, next) => {
  res.render("me/posts-courses", { username: req.myUsername });
};

module.exports = {
  storedCourses,
  trashCourses,
  postsNews,
};
