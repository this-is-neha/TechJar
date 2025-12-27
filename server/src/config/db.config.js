// require("dotenv").config();
// const mongoose=require("mongoose");
// const {MONGO_DB_URL,MONGO_DB_NAME} = process.env;
//  mongoose.connect(MONGO_DB_URL,{
//     dbName:MONGO_DB_NAME,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
 
//  })
//  .then (()=>console.log("MongoDB connected"))
//  .catch((err)=>console.log(err))



// src/config/db.config.js
// db.config.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debug logging
    console.log('Current directory:', __dirname);
    console.log('MONGO_URI value:', process.env.MONGO_URI);
    
    const uri = process.env.MONGO_URI;
    
    // Validate URI exists
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables. Check your .env file.');
    }
    
    console.log('Attempting to connect to MongoDB...');
    
    // Connect without deprecated options
    await mongoose.connect(uri);
    
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;