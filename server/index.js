import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from './routes/posts.js';
import userRouter from "./routes/userRoutes.js";

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());


app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use('/uploads', express.static('uploads'));


const CONNECTION_URL = 'mongodb+srv://juweria:HKys9IuLWTc9ZqaC@cluster0.rcdmo.mongodb.net/memoir_db';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
