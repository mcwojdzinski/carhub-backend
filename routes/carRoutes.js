const express = require("express");
const router = express.Router();

const Car = require("../models/Car");

router.post("/", async (req, res) => {
  const newCar = new Car(req.body);

  try {
    const car = await newCar.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (res, req) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Pomyślnie usunięto samochód" });
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
