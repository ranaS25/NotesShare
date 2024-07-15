require("dotenv").config();
const mongoose = require("mongoose");


mongoose.set("debug", true); // Enable debug output for mongoose

async function main(){
  const uri = process.env.LOCAL_MONGODB_URI;
    const params = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

  
  await mongoose.connect(uri, params);
  console.log("MongoDB connected");

  const db = mongoose.connection;

      // const newUser = new User({ userId: "avhh@ashv.com", name: "John Doe"});
  const coll = await db.collection("users")
  const docs = await coll.find({}).toArray()

  console.log(docs);
    
  



 

  // mongoose.disconnect();
}

main().catch(console.error)




