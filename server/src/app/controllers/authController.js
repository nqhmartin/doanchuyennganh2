const User = require("../models/user");
const bcrypt = require("bcrypt");

class authController {
  register = async (req, res) => {
    const check = await User.findOne({
      username: req.body.username,
    });
    if (check) {
      res.status(404).json({
        message: "Tên đăng nhập đã tồn tại",
      });
    } else {
      const hash = await bcrypt.genSalt(10);
      await bcrypt.hash(req.body.password, hash, function (err, hashedPass) {
        if (err) {
          res.status(500).json(err);
          return;
        } else {
          User.create({
            username: req.body.username,
            email: req.body.email,
            fullName: req.body.fullName,
            phone: req.body.phone,
            address: req.body.address,
            password: hashedPass,
            level: req.body.level,
          })
            .then((result) => {
              res.stauts(200).json(result);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      });
    }
  };

  login = async (req, res) => {
    const check = await User.findOne({
      username: req.body.username,
    });
    if (!check) {
      res.status(400).json({
        message: "Tên tài khoản sai",
      });
      return;
    } else {
      const validate = await bcrypt.compare(req.body.password, check.password);
      if (!validate) {
        res.status(400).json({
          message: "Sai mật khẩu",
        });
        return;
      } else {
        res.status(200).json(check);
      }
    }
  };

  getUser = (req, res) => {
    User.findById({
      _id: req.params.id,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };
  getAll = (req, res) => {
    User.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };

  updateUser = (req, res) => {
    User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };
  deleteUser = (req, res) => {
    User.findByIdAndDelete({
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

module.exports = new authController();
