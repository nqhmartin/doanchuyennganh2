const Review = require("../models/review");

class ReviewController {
  create = (req, res) => {
    const formData = req.body;
    const newReview = Review(formData);
    if (req.file) {
      newReview.imgReview = req.file.path;
    }
    newReview
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  index = (req, res) => {
    Review.find({
      productId: req.params.product,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  getAll = (req, res) => {
    Review.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  delete = (req, res) => {
    Review.findByIdAndDelete({
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

module.exports = new ReviewController();
