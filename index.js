const express = require("express");
const connectToDB = require("./config/db");

const app = express();
connectToDB();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
