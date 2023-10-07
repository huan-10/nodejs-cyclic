const Course = require("../models/Course");

const index = (req, res, next) => {
  Course.find({})
    .then((courses) => {
      res.json(courses);
    })
    .catch(next);
};

module.exports = {
  index,
};
