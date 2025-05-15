//import dotenv
require('dotenv').config()

//import express
const express = require('express')

//import cors
const cors = require('cors')

//import Router
const router = require('./router')

//import connection
require('./connection')


//create server
const ccms = express()

//user cors
ccms.use(cors())

ccms.use(express.json())

//user route
ccms.use(router)


//set port
const PORT = 4000 || process.env.PORT

//listen
ccms.listen(PORT, ()=>{
    console.log(`Server is running successfully at PORT ${PORT}`);
})

ccms.get('/', (req, res)=>{
    res.send(`Get Request Received`)
} )