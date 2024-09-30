const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({
  name: {type: String, required: true },
  description: { type: String },
  distanceFromSun: Number,  // in million kilometers 
  image: String,
  hasLife: Boolean
})


const Planet = mongoose.model('Planet', planetSchema)

module.exports = Planet