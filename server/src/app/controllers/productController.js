const Product = require("../models/product");

class productController {
  create = (req, res) => {
    const formData = req.body;
    const newProduct = Product(formData);
    if (req.file) {
      newProduct.imgpro = req.file.path;
    }
    newProduct
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  index = (req, res) => {
    const categoryName = req.query.categoryName;
    try {
      if (categoryName) {
        Product.find({
          categoryName,
        }).then((result) => {
          res.status(200).json(result);
        });
      } else {
        Product.find().then((result) => {
          res.status(200).json(result);
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  delete = (req, res) => {
    Product.findByIdAndDelete({
      _id: req.params.id,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  search = (req, res) => {
    var regex = new RegExp(req.params.product, "i");
    Product.find({
      productname: regex,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };
  update = (req, res) => {
    Product.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };

  indexOne = (req, res) => {
    Product.findById({
      _id: req.params.id,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };
}

module.exports = new productController();
