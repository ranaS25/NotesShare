const express = require('express');

const slowDown = require('express-slow-down');



const fs = require('fs');
const path = require('path'); // Core module for handling file paths
const app = express();
const PORT = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const  MongoHelper  =  require ("./Mongodb.js")


require('dotenv').config();


const MONGODB_URI = process.env.LOCAL_MONGODB_URI;
let database_path = path.join(__dirname, "notes.json");
const USERS_PATH = path.join(__dirname, "users.json");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

/*  FIXME uncomment when you are done 


  END
 */


// Utility function example
// read any file and returns it in js object
const readJsonFile = async (filePath) => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing file:', error);
        throw error;
    }
};

async function writeStringToFile(filePath, content) {
    console.log(filePath);
    try {
        // Write the string content to the specified file
        await fs.promises.writeFile(filePath, content, 'utf8');
        console.log(`Content successfully written to ${filePath}`);
    } catch (error) {
        // Handle errors (e.g., file not found, permission issues)
        console.error(`Error writing to file: ${error.message}`);
        
    }
}   


function getNextid(database_obj){

    let last_note_id = database_obj[database_obj.length-1].id;
    return Number(last_note_id.substring(8)) + 1;
}

// Create a slowDown middleware instance
const slowDownMiddleware = slowDown({
    // The number of requests that can be made in a given period of time
    windowMs: 20000,
    // The number of requests that can be made before the response time is slowed down
    delayAfter: 5,
  });

  
  // Apply the slowDown middleware to all requests
  app.use(slowDownMiddleware);

  // Use the CORS middleware with appropriate settings
app.use(cors({
    origin: 'http://localhost:1234', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',  // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Userid, Userpassword' // Allow these headers
}));


// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));


//checking if user is not authenticated
 const authorizeUser = async (req, res, next)=>{

    console.log(req.headers.userid);

    
    let users_path = path.join(__dirname,'database', 'users.json');
    let usersArray;

    try {
        usersArray = await readJsonFile(users_path);
        

    } catch (error) {
        res.status(500).send('unexpected error');
    }
    console.log('users array: ', usersArray);
    console.log('user id: '+ usersArray[0].userId)
    console.log("user id: " + usersArray[0].userPassword);
    let userObj = usersArray.find(user=>user.userId === req.headers.userid && user.userPassword === req.headers.userpassword)
            
    // console.log('user Obj: ', userObj);
    if(userObj === undefined) {
        res.send("user is invalid");
        
    }
    else{
        next();
    }





    
};


// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));




app.post("/AuthenticateUser",  (req, res) => {
    // const user = req;
    console.log(req.body);
    res.json({
      isAuthorizedUser: true,
      userId: "admin@notesshare.com",
      passwordToken: "admin123",
    });
});


// Dummy email database
const registeredEmails = ['ankit@gmail.com', 'user@example.com'];

app.get('/check-email/:email', (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
  }

  const isRegistered = registeredEmails.includes(email.toLowerCase());

  return res.json({ isAvailable: !isRegistered });
});

app.post('/registerUser', (req, res)=>{
    // const email = req.params.email;
    console.log(req.body);
    res.setHeader('Content-Type', 'plain/text');

    // console.log(req.body.name, req.body.email, req.body.password, req.body.confirmPassword);
    res.send({accountStatus: "new account is created"});
})

// Define a route for '/sendanote'
app.post('/sendanote', async (req, res) => {
    
    const newObj= {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    }
    console.log(newObj);

    let database_object;

    try {
        database_object = await readJsonFile(database_path);
        

    } catch (error) {
        res.status(500).send('Error reading or parsing file');
    }
    if(newObj.id === 'new-note-window'){

    newObj.id = 'note-id-' + getNextid(database_object);
    database_object.push(newObj);
    }
    else{
        database_object.find(obj => {
            if(obj.id === newObj.id){
                obj.title = newObj.title;
                obj.description = newObj.description;
            }
        })
    }


    console.log(database_object);
    // console.log(Array.isArray(database_object));


    try {
        await writeStringToFile(database_path, JSON.stringify(database_object));
        console.log('File writing operation completed.');
    } catch (error) {
        console.error('File writing operation failed:', error);
        res.send("An error occurred..")
    }
    
    res.json(database_object);


});

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

// Route to serve the JSON data
app.get('/notes',  async (req, res) => {
   
    let database_object;
    console.log('i am here..')

    try {
        database_object = await readJsonFile(database_path);
        

    } catch (error) {
        res.status(500).send('Error reading or parsing file');
    }
    res.send(database_object);
});

app.delete('/notes/:id', async (req, res)=>{

    const noteId = req.params.id;

    let database_object;

    try {
        database_object = await readJsonFile(database_path);
        

    } catch (error) {
        res.status(500).send('Error reading or parsing file');
    }
    
    const noteIndex = database_object.findIndex(note => note.id === noteId);


    if(noteIndex !== -1){
        database_object.splice(noteIndex, 1); 
    }
    else{
        res.send("error: noteId note found.")
    }


    try {
        await writeStringToFile(database_path, JSON.stringify(database_object));
        console.log('File writing operation completed.');
    } catch (error) {
        console.error('File writing operation failed:', error);
        res.send("An error occurred..")
    

    }

    res.json({message: 'delete successfully'});
});


app.get('/notes/:noteid', async(req, res)=>{
    console.log("messgae: ", req.params.noteid)
    
    let database_path = path.join(__dirname,'database', 'notes.json');
    let database_obj =  await readJsonFile(database_path);

    const result = database_obj.find(obj => obj.id === req.params.noteid);

    

    console.log(result);
    res.json(result);



})

//user profile

app.get('/user/:email', async (req, res) => {
    const email = req.params.email;
    const usersArray = await readJsonFile(USERS_PATH);
    const user = usersArray.find((user) => user.userId === email);
    res.json(user);
  
})


app.get('/getAllnotes', async (req, res) => { 
  const mongoHelper = new MongoHelper();
  const db = await mongoHelper.connectToDatabase();
  const coll = db.collection('user_notes');
  const documents = await coll.findOne({ userId: "admin@notesshare.com"});
  console.log(documents.user_notes);
  await mongoHelper.closeConnection()
  res.json(documents.user_notes);


  


})

// Start the server using Express
app.listen(PORT, () => {
    console.log(process.env.MONGODB_URI);
    console.log(`Server running at http://localhost:${PORT}`);
});
