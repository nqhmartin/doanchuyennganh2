const express = require("express");
const app = express();
const port = 3000;
const db = require("./src/db/config");
const route = require("./src/routers/index");
var cors = require("cors");
const path = require("path");
app.use(cors());
db.connect();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use("/images", express.static(path.join(__dirname, "/images")));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

route(app);
module.exports = app;
