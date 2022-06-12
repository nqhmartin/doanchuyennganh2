var express = require("express");
var router = express.Router();
const Payment = require("../models/payment");

router.post("/", (req, res) => {
  Payment.create(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

router.get("/update", (req, res) => {
  Payment.findOneAndUpdate(
    {
      description:
        "Đặt hàng vào lúc Fri Apr 15 10:33:24 2022 tổng giá tiền 124960VNĐ username đặt nqh.martin",
    },
    {
      status: "Đã thanh toán",
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

router.get("/:user", (req, res) => {
  Payment.find({
    username: req.params.user,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(200).json(err);
    });
});

module.exports = router;
