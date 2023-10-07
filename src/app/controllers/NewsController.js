// class NewsController {
//   //Get / news
//   index(req, res) {
//     res.render("views");
//   }

//   //get / news /: slug
//   show(req, res) {
//     res.send("Chao em nha");
//   }
// }

// module.exports = new NewsController();

// cách viết bằng function

const index = (req, res) => {
  res.render('views');
};

const show = (req, res) => {
  res.send('Chao em nha');
};

module.exports = {
  index,
  show,
};
