// routes/flatRoutes.js
const express = require('express');
const router = express.Router();
const Flat = require('../models/flatModel');

// Получение всех квартир
router.get('/', async (req, res) => {
  try {
    const flats = await Flat.find();
    res.json(flats);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Получение квартиры по ID
router.get('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);
    if (!flat) return res.status(404).send('Flat not found');
    res.json(flat);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Добавление новой квартиры
router.post('/', async (req, res) => {
  try {
    const flat = new Flat(req.body);
    await flat.save();
    res.status(201).json(flat);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Обновление квартиры по ID
router.put('/:id', async (req, res) => {
  try {
    const flat = await Flat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!flat) return res.status(404).send('Flat not found');
    res.json(flat);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Удаление квартиры по ID
router.delete('/:id', async (req, res) => {
  try {
    const flat = await Flat.findByIdAndDelete(req.params.id);
    if (!flat) return res.status(404).send('Flat not found');
    res.json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
cd