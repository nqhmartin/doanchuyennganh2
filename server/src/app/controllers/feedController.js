const Feed = require("../models/feed");

class feedController {
  create = (req, res) => {
    const formData = req.body;
    const newFeed = Feed(formData);
    if (req.file) {
      newFeed.image = req.file.path;
    }
    newFeed
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  index = (req, res) => {
    Feed.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  delete = (req, res) => {
    Feed.findByIdAndDelete({
      _id: req.params.id,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };
}
module.exports = new feedController();
