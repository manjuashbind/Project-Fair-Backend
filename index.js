//loads .env file into process .env
require('dotenv').config()//loads .env file contents into process.env by defaults
//import express
const express=require('express');

//import cors
const cors=require('cors')

const db= require('./DB/connection')

//import router
const router=require('./Router/route')
//import middleware
const appMiddleware=require('./Middlewares/appMiddleware')
const jwtMiddleware=require('./Middlewares/jwtMiddleware')
//Create a backend application using express
const pfServer=express();

//use
pfServer.use(cors())
pfServer.use(express.json())//returns a middleware that only parses json
//pfServer.use(appMiddleware)
pfServer.use(router)

//import image from uploads
pfServer.use('/uploads',express.static('./uploads'))


//port creation
const PORT=4000 || process.env.port //its when we use render.com theport changes so we have to give .env file port from whre the .env file comes
//serverlisten
pfServer.listen(PORT,()=>{
    console.log('listening on port'+ PORT);
})
//http- get solving to http://localhost4000
pfServer.get("/",(req,res)=>{
    res.send('<h1>Project fair is started</h1>')
})