// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const token = req.headers.token;
//   if (token) {
//     const accessToken = token.split(" ")[1];
//     jwt.verify(accessToken, "chaoemnha", (err, user) => {
//       if (err) {
//         res.status(403).json("Token is not value");
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json("Lỗi token rồi em ơi");
//   }
// };

// const verifyTokenAndAdm = (req, res, next) => {
//   middlewareControllers.verifyToken(req, res, () => {
//     if (req.user.id == req.params.id || req.user.admin) {
//       next();
//     } else {
//       res.status(403).json("Bạn không phải là chủ sở hữu hoặc adm");
//     }
//   });
// };

// module.exports = {
//   verifyToken,
//   verifyTokenAndAdm,
// };
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//   const newStr = req.headers.cookie;
//   const token = newStr.substring(12);

//   if (token) {
//     // const accessToken = token.split(" ")[1];
//     jwt.verify(token, "chaoemnha", (err, user) => {
//       if (err) {
//         return res.status(403).json("Token is not valid");
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json("Đăng nhập đi em zai ");
//   }
// };
const verifyToken = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    // return res.status(401).json("Đăng nhập đi em zai");
    return res.render("createAccount/messenger");
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("accessToken=")
  );

  if (!accessTokenCookie) {
    // return res.status(401).json("Đăng nhập đi em zai");
    return res.render("createAccount/messenger");
  }

  const token = accessTokenCookie.split("=")[1];

  jwt.verify(token, "chaoemnha", (err, user) => {
    if (err) {
      return res.render("createAccount/messenger2");
    }
    req.user = user;
    next();
  });
};

const verifyTokenAndAdm = (req, res, next) => {
  // verifyToken(req, res);
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return res.status(401).json("Đăng nhập đi em zai");
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("accessToken=")
  );

  if (!accessTokenCookie) {
    return res.status(401).json("Đăng nhập đi em zai");
  }

  const token = accessTokenCookie.split("=")[1];

  jwt.verify(token, "chaoemnha", (err, user) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    }
    req.user = user;

    if (req.user.admin) {
      next();
    } else {
      return res.render("404", { username: req.user.username });
    }
  });
};

const getUserName = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    // return res.status(401).json("Đăng nhập đi em zai");
    return res.render("createAccount/login");
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("accessToken=")
  );

  if (!accessTokenCookie) {
    // return res.status(401).json("Đăng nhập đi em zai");
    return res.render("createAccount/messenger");
  }

  const token = accessTokenCookie.split("=")[1];

  jwt.verify(token, "chaoemnha", (err, user) => {
    if (err) {
      return res.render("createAccount/messenger2");
    }

    req.myUsername = user.username;
    next();
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdm,
  getUserName,
};
