import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";
import { IJourneyDocument } from '../types/modelTypes';

/**
 * Journey Schema
 */
const journeySchema: Schema = new mongoose.Schema({
    departure: {
        type: Date,
        required: true
    },
    return: {
        type: Date,
        required: true
    },
    departureStationId: {
        type: Number,
        required: true
    },
    departureStationName: {
        type: String,
        required: true
    },
    returnStationId: {
        type: Number,
        required: true
    },
    returnStationName: {
        type: String,
        required: true
    },
    coveredDistance: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
})

journeySchema.plugin(mongoosePaginate);

export default mongoose.model<IJourneyDocument, mongoose.PaginateModel<IJourneyDocument>>('Journey', journeySchema)