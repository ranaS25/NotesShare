require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("debug", true); // Enable debug output for mongoose

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
        console.log("MongoDB connected");
        
        
    })
    .catch((err) => console.error("Error connecting to MongoDB:", err));
  
const db = mongoose.connection;
