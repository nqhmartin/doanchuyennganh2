const Cart = require("../models/cart");

class cartController {
  create = (req, res) => {
    Cart.create(req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };
  show = (req, res) => {
    Cart.find({
      username: req.params.name,
    })

      .then((result) => res.status(200).json(result))
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  delete = (req, res) => {
    Cart.findByIdAndDelete({
      _id: req.params.id,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };
  update = (req, res) => {
    Cart.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    ).then(() => {
      Cart.findOne({
        _id: req.params.id,
      })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  };

  deleteAll = (req, res) => {
    Cart.deleteMany({
      username : req.params.user
    })
    .then((result) => {
      res.status(200).json(result);

    })
    .catch((err) => {
      res.status(500).json(err);
    });
  }
}

module.exports = new cartController;
