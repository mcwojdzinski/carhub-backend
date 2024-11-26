const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/db");
const carRoutes = require("./routes/carRoutes");
const app = express();
connectToDB();

app.use(
  cors({
    origin: "https://carhub-frontend.netlify.app",
  })
);
app.use(express.json());
app.use("/api/cars", carRoutes);
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
