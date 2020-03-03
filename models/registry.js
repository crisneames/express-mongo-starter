// DEPENDENCIES
const mongoose = require('mongoose')

const registrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  sex: {type: String},
  kennel: {type: String},
  birthdate: {type: String},
},
{timestamp: true})

const Registry = mongoose.model('registry', registrySchema)

module.exports = Registry
