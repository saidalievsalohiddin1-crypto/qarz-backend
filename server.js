const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const qarzRoutes = require('./routes/qarzRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bilan ulanish
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB bazasiga muvaffaqiyatli ulandi!'))
.catch((err) => console.error('MongoDB ulanishda xato:', err));

// Marshrutlar (Routes)
app.use('/api/qarz', qarzRoutes);

// Asosiy sahifa tekshiruvi
app.get('/', (req, res) => {
    res.send('Qarz Yomon API ishlamoqda...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishga tushdi...`);
});
