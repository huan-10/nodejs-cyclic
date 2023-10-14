const path = require("path");
const express = require("express");
const morgan = require("morgan");
const route = require("./routes");
const handlebars = require("express-handlebars").engine;
const methodOverride = require("method-override");
const Handlebars = require("handlebars");
const SortMiddleware = require("./app/middlewares/SortMiddleware");
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./config/db");

db.connect();

const app = express();
const port = 3001;

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

//  custom middleware

app.use(SortMiddleware);

// test login

// app.use("/", function (req, res, next) {
//   res.send("Test Login");
// });

// middleware

// app.use(bacBaoVe);

// function bacBaoVe(req, res, next) {
//   if (["vethuong", "vevip"].includes(req.query.ve)) {
//     req.face = " một đấm";
//     return next();
//   }
//   res.status(403).json({
//     message: "Đi về nhé cháu",
//   });
// }

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";
        const icons = {
          default: "fas fa-sort",
          asc: "fas fa-sort-amount-up-alt",
          desc: "fas fa-sort-amount-down",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        const address = Handlebars.escapeExpression(
          `?_sort&column=${field}&type=${type}`
        );
        const output = `<a href="${address}"><span
        class="${icon}">
    </span></a> `;

        return new Handlebars.SafeString(output);
      },
    },
  })
);
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "resources", "views"));

route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
