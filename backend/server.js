const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/db.js');
const productsRoute = require('./routes/product.route.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is ready');
});

app.use('/api/products', productsRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log('server   started at http://localhost:' + PORT);
});
