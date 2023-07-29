const express = require('express');
require('dotenv').config();
const app = express();
const Products = require('./models/productsSchema');
const DefaultData = require('./defaultdata');
const connection = require('./db/conn');
const PORT = 4000 || process.env.PORT;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const buyRoutes = require('./routes/buyRoutes');

connection();
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use(cookieParser(""));
require('dotenv').config();
app.use('/', userRoutes);
app.use('/product/', productRoutes);
app.use('/buy/', buyRoutes);

app.listen(PORT, () => {
    console.log('Server is running on PORT number  :', +PORT);
})





