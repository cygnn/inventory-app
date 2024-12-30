import { Router } from "express";

const indexRouter = Router()

indexRouter.get('/', (req,res)=> {
    res.send('This is index router')
})

export default indexRouter