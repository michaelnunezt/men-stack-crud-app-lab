const mongoose = require('mongoose')
const express = require('express')

// ! -- Router
const router = express.Router()

// ! -- Model
const Planet = require('../models/planet.js')

// ! -- Routes
// * Each route is already prepended with `/planets`

// * Index Page
router.get('/', async (req, res) => {
  try {
    const planets = await Planet.find()
    return res.render('planets/index.ejs', { planets })
  } catch (error) {
    console.log(error)
    return res.status(500).send('<h1>An error occurred.</h1>')
  }
})


// New Page (form page)
router.get('/new', (req, res) => {
  res.render('planets/new.ejs')
})

// * Show Page
router.get('/:planetId', async (req, res, next) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.planetId)) {
      const planet = await Planet.findById(req.params.planetId)
      if (!planet) return next()
      return res.render('planets/show.ejs', { planet })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send('<h1>An error occurred.</h1>')
  }
})


// * Create Route
router.post('/', async (req, res) => {
  try {
    const planet = await Planet.create(req.body)
    return res.redirect('/planets')
  } catch (error) {
    console.log(error)
    return res.status(500).send('<h1>An error occurred.</h1>')
  }
})

// * Delete Route
router.delete('/:planetId', async (req, res) => {
  try {
    const deletedPlanet = await Planet.findByIdAndDelete(req,params,planetId)
    return res.redirect('/planets')
  } catch (error) {
    console.log(error)
    return res.status(500).send('<h1>An error occured.</h1>')
  }
} )

router.get('/:planetId/edit', async (req, res, next) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.planetId)) {
      const Planet = await Planet.findById(req.params.planetId)
      if (!planet) return next()
      return res.render('planets/edit.ejs', { planet })
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send('<h1>An error occurred.</h1>')
  }
})

router.put('/planets/:planetId/edit', async (req, res) => {
  try {
    // req.body.hasLife = !!req.body.hasLife
    const updatedPlanet = await Planet.findByIdAndUpdate(req.params.planetId, req.body, { new: true })
    console.log(updatedPlanet)
    return res.redirect(`/planets/${updatedPlanet._id}`)
  } catch (error) {
    console.log(error)
    return res.status(500).send('<h1>An error occured.</h1>')
  }
})


module.exports = router