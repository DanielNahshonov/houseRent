const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const flatRoutes = require('./routes/flatRoutes');

const app = express();
const port = process.env.PORT || 5001;

// Подключение к MongoDB
mongoose
  .connect(
    'mongodb+srv://dnahshonov:sk859vlbro@cluster0.txy3eu1.mongodb.net/sample_airbnb'
  )
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Middleware

app.use(cors()); // Включите CORS
app.use(express.json());


// Маршруты
app.use('/api/users', userRoutes);
app.use('/api/flats', flatRoutes);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
