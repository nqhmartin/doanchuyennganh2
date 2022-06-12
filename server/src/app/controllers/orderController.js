const Order = require("../models/order");

class OrderController {
  create = (req, res) => {
    Order.create(req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  indexAll = (req, res) => {
    Order.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  index = (req, res) => {
    Order.find({
      username: req.params.name,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  update = (req, res) => {
    Order.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    )
      .then((result) => {
        Order.findById({
          _id: req.params.id,
        })
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  delete = (req, res) => {
    Order.findByIdAndDelete({
      _id: req.params.id,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  findId = (req, res) => {
    Order.findById({
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

module.exports = new OrderController();
