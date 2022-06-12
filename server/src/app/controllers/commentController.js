const Comment = require("../models/comment");

class commentController {
  create = (req, res) => {
    Comment.create(req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  index = (req, res) => {
    Comment.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };
}

module.exports = new commentController();
