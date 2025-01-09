import express from "express";
import indexRouter from "./routes/indexRouter.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter)


const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`App is listening at port ${PORT}`)
})