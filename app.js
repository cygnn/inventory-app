import express from "express";
import indexRouter from "./routes/indexRouter.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=> {
    res.send("Hello world!")
})

app.use('/index', indexRouter)

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`App is listening at port ${PORT}`)
})