import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";
import { IStationDocument } from '../types/modeTypes';
/**
 * Station Schema
 */
const stationSchema: Schema = new mongoose.Schema({
  fid: {
    type: Number,
  },
  stationId: {
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

stationSchema.plugin(mongoosePaginate);

export default mongoose.model<IStationDocument, mongoose.PaginateModel<IStationDocument>>('Station', stationSchema)