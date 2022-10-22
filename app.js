const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const helmet = require('helmet')
const userRoutes = require('./routes/userRoutes') 
const authRoutes = require('./routes/authRoutes') 

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(morgan('common'))
app.use(helmet())


// BASE ROUTING
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)


// //CONNECTING TO THE MONGODB 
// mongoose.connect(process.env.DB_URL, ()=> {
// // RUNNING THE SERVER
// app.listen(process.env.PORT, ()=> console.log('server is running on ' + process.env.PORT))
// })

mongoose.connect(
    process.env.DB_URL,
    
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));

app.listen(process.env.PORT, ()=> console.log('server is running on ' + process.env.PORT))