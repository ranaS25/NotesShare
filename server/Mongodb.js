require("dotenv").config();

const mongoose = require("mongoose");

class MongoHelper {
  constructor() {
    
    this.db = null;
  }

  connectToDatabase = async() => {
    await mongoose.connect(process.env.LOCAL_MONGODB_URI, {
     
      
    });
    this.db = mongoose.connection;
    return this.db;
  }

  closeConnection= async() => {
    mongoose.connection.close();
    this.db = null;
    this.URI = null;
  }
}
module.exports = MongoHelper;
