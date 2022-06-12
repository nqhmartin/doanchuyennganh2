const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://nqhmartin:4QYmGRWCng0SFwtm@cluster0.yfaqp.mongodb.net/quanghuyshop?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Kết nối thành công!!!");
    })
    .catch((err) => {
      console.log("Kết nối thất bại!!!");
    });
};

module.exports = { connect };
