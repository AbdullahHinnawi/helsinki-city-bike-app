import mongoose from 'mongoose'
/**
 * Station Schema
 */
const stationSchema = new mongoose.Schema({
  fid: {
    type: Number,
  },
  id: {
    type: Number,
  },
  nimi: {
    type: String,
  },
  namn: {
    type: String,
  },
  name: {
    type: String,
  },
  osoite: {
    type: String,
  },
  address: {
    type: String
  },
  kaupunki: {
    type: String
  },
  stad: {
    type: String,
  },
  operaattor: {
    type: String
  },
  kapasiteet: {
    type: Number
  },
  x: {
    type: Number
  },
  y: {
    type: Number
  }
})

export default mongoose.model('Station', stationSchema)