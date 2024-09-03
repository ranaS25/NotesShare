import 'dotenv/config'

import app from './app.js'
import connectDB from './db/index.js';

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  
  app.listen(PORT, () => {
    app.on("error", (error) => { 
      console.log("ERROR : ", error)
    })
    
    console.log(`Server running at http://localhost:${PORT}`);
  });

})