const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv/config')

// * -- Routers/Controllers
const planetsRouter = require('./controllers/planets.js')


// ! -- Variables
const app = express()
const port = 3000 || process.env.port



// ! -- Middleware
// app.set('view engine', 'ejs')
app.use(methodOverride('_method')) // this line will convert any request with a ?_method query param into the specified HTTP verb
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(morgan('dev'))


// ! -- Route handlers

// Landing Page
app.get('/', (req, res) => {
  res.render('index.ejs')
})


// * Routers
app.use('/planets', planetsRouter)


// ! -- 404
app.get('*', (req, res) => {
  return res.status(404).render('404.ejs')
})


// ! -- Server Connections

const startServers = async () => {
  try {
    // Database Connection
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database connection established')

    // Server Connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServers()