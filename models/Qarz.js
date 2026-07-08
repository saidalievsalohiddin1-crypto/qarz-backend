const mongoose = require('mongoose');

const QarzSchema = new mongoose.Schema({
    qarz_oluvchi: {
        type: String,
        required: true,
        trim: true
    },
    summa: {
        type: Number,
        required: true
    },
    izoh: {
        type: String,
        trim: true
    },
    qaytarish_sanasi: {
        type: Date
    },
    holati: {
        type: String,
        enum: ['qaytarilmagan', 'qaytarilgan'],
        default: 'qaytarilmagan'
    }
}, { timestamps: true });

module.exports = mongoose.model('Qarz', QarzSchema);
