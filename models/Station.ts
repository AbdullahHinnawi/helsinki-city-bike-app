import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";
import { IStationDocument } from '../types/modelTypes';
/**
 * Station Schema
 */
const stationSchema: Schema = new mongoose.Schema({
  fid: {
    type: Number,
  },
  stationId: {
    type: Number,
    required: true,
    unique: true,
  },
  nimi: {
    type: String,
    required: true
  },
  namn: {
    type: String,
  },
  name: {
    type: String,
  },
  osoite: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  kaupunki: {
    type: String,
    enum: ["espoo", "helsinki"],
    required: true
  },
  stad: {
    type: String,
  },
  operaattor: {
    type: String
  },
  kapasiteet: {
    type: Number,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
})

stationSchema.plugin(mongoosePaginate);

export default mongoose.model<IStationDocument, mongoose.PaginateModel<IStationDocument>>('Station', stationSchema)