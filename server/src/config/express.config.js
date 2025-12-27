const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const helmet = require("helmet");

const connectDB = require('./db.config');

const mainRoute = require("./routing.config");

const app = express();
connectDB();  
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(mainRoute);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

console.log("Express server is running");
module.exports = app;
