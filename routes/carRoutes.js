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

router.get("/filter", async (req, res) => {
  try {
    const { brand, model, year, transmission } = req.query;

    const filters = {};
    if (brand) filters.brand = brand;
    if (model) filters.model = model;
    if (year) filters.year = Number(year);
    if (transmission) filters.transmission = transmission;
    const filteredCars = await Car.find(filters);
    res.status(200).json(filteredCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Wystąpił błąd podczas filtrowania." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: "Nie znaleziono samochodu" });
    }

    res.json({ message: "Pomyślnie zaktualizowano samochód", car: updatedCar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Pomyślnie usunięto samochód" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
