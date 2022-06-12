const authRouter = require("./authRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const reviewRouter = require("./reviewRouter");
const feedRouter = require("./feedRouter");
const commentRouter = require("./commentRouter");

const fs = require("fs");
const multer = require("multer");

function route(app) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/auth", authRouter);
  app.use("/category", categoryRouter);
  app.use("/product", productRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);
  app.use("/review", reviewRouter);
  app.use("/feed", feedRouter);
  app.use("/comment", commentRouter);

  // upload ảnh bên client
  app.post("/api/upload", (req, res) => {
    fs.writeFile(
      "images/" + req.body.name,
      req.body.imgsource,
      "base64",
      (err) => {
        if (err) throw err;
      }
    );
    res.status(200);
  });

  //upload ảnh admin

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage: storage });
  app.post("/api/uploads", upload.single("file"), (req, res) => {
    res.status(200).json("file has been uploads");
  });
}

module.exports = route;
