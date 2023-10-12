const newsRouter = require("./news");
const siteRouter = require("./site");
const coursesRouter = require("./courses");
const meRouter = require("./me");
const apiRouter = require("./api");
const createAccountRouter = require("./createAccount");

function route(app) {
  app.use("/me", meRouter);
  app.use("/createAccount", createAccountRouter);

  app.use("/api", apiRouter);

  app.use("/news", newsRouter);
  app.use("/courses", coursesRouter);
  app.use("/", siteRouter);
}

module.exports = route;
