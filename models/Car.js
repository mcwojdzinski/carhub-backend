const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: String,
});

module.exports = mongoose.model("Car", carSchema);
