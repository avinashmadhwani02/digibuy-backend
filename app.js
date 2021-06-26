const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser')

//Load config
dotenv.config({ path : './config/config.env' });


connectDB();

const app = express();
app.use(bodyParser());

//Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));