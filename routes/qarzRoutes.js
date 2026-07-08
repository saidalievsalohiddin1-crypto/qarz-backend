const express = require('express');
const router = express.Router();
const Qarz = require('../models/Qarz');

// 1. Barcha qarzlarni olish
router.get('/', async (req, res) => {
    try {
        const qarzlar = await Qarz.find().sort({ createdAt: -1 });
        res.status(200).json(qarzlar);
    } catch (error) {
        res.status(500).json({ message: 'Ma\'lumotlarni olishda xatolik', error });
    }
});

// 2. Yangi qarz qo'shish
router.post('/', async (req, res) => {
    try {
        const yangiQarz = new Qarz(req.body);
        const saqlanganQarz = await yangiQarz.save();
        res.status(201).json(saqlanganQarz);
    } catch (error) {
        res.status(400).json({ message: 'Qarz qo\'shishda xatolik', error });
    }
});

// 3. Qarzni yangilash (masalan, holatini "qaytarilgan" deb o'zgartirish)
router.put('/:id', async (req, res) => {
    try {
        const yangilanganQarz = await Qarz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Yangilangan ma'lumotni qaytarish
        );
        if (!yangilanganQarz) {
            return res.status(404).json({ message: 'Qarz topilmadi' });
        }
        res.status(200).json(yangilanganQarz);
    } catch (error) {
        res.status(400).json({ message: 'Qarzni yangilashda xatolik', error });
    }
});

// 4. Qarzni o'chirish
router.delete('/:id', async (req, res) => {
    try {
        const ochirilganQarz = await Qarz.findByIdAndDelete(req.params.id);
        if (!ochirilganQarz) {
            return res.status(404).json({ message: 'Qarz topilmadi' });
        }
        res.status(200).json({ message: 'Qarz muvaffaqiyatli o\'chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Qarzni o\'chirishda xatolik', error });
    }
});

module.exports = router;
