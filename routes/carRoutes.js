const express = require("express");
const router = express.Router();

const Car = require("../models/Car");

router.post("/car", async (req, res) => {
  const newCar = new Car(req.body);

  try {
    const car = await newCar.save();
    res.status(201).json(car);
  } catch {
    res.status(400).json({ error: error.message });
  }
});
