import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import userRouter from './routes/users.route.js';
import notesRouter from './routes/notes.route.js';
const app = express();

app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:1234", // Allow requests from this origin
//     methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
//     allowedHeaders: "Content-Type,Userid, Userpassword", // Allow these headers
//   })
// );

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/users", userRouter)
app.use("/notes", notesRouter);

export default app;
