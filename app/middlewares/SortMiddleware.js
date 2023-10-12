// const jwt = require("jwt");

module.exports = function SortMiddleware(req, res, next) {
  res.locals._sort = {
    enabled: false,
    type: "default",
  };
  if (req.query.hasOwnProperty("_sort")) {
    res.locals._sort.enabled = true;
    res.locals._sort.type = req.query.type;
    res.locals._sort.column = req.query.column;
  }

  next();
};

// const SortMiddleware = (req, res, next) => {
//   res.render("search");
//   res.locals._sort = {
//     enabled: false,
//     type: "default",
//   };
//   if (req.query.hasOwnProperty("_sort")) {
//     res.locals._sort.enabled = true;
//     res.locals._sort.type = req.query.type;
//     res.locals._sort.column = req.query.column;
//   }

//   next();
// };

// module.exports = {
//   SortMiddleware,
// };
