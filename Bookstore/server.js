const express = require('express');
const app=express();
const path = require('path')
require('dotenv').config();
const cors = require('cors')
app.use(cors())
app.use(express.json())


const BookRouter = require('./src/routes/BooksRoutes')
const MemberRouter = require('./src/routes/MemberRoute')
const LoanRouter = require('./src/routes/LoanRoute.js')

app.get('/',(req,res,next)=>{
    let cont =false;
    if(!cont){
        next()
    }else{
        res.send('validation failed')
    }
},(req,res)=>{
    res.send('Bookstore')
})

app.use(LoanRouter)
app.use(MemberRouter)
app.use(BookRouter);

app.use("*",(req,res,next)=>{
 const error = new Error('Route not found')
 next({
    status:404,
    message:error.message
 })
})

app.use((error,req,res,next)=>{
   res.status(error.status).json(error.message)
})

app.use((error, req,res,next)=>{
    console.log("Error invalid token on middleware");
    res.status(error.status).json(error.message)
})



const PORT = process.env.PORT ||5000;

app.listen(PORT,()=>console.log(`server running at port ${PORT}`))

