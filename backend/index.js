const express = require("express");
const dbConnect = require("./config/db");
const Router = require("./config/routes");
const cors = require("cors");

const app = express();
const port = 3001;

dbConnect();
app.use(express.json());
app.use(cors());
app.use(Router);

app.listen(port, (err) => {
  err && console.log(err);
  console.log("server running on", port);
});
