import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2";
import { IJourneyDocument } from '../types/modelTypes';

/**
 * Journey Schema
 */
const journeySchema: Schema = new mongoose.Schema({
    departure: {
        type: Date,
    },
    return: {
        type: Date,
    },
    departureStationId: {
        type: Number,
    },
    departureStationName: {
        type: String,
    },
    returnStationId: {
        type: Number,
    },
    returnStationName: {
        type: String,
    },
    coveredDistance: {
        type: Number
    },
    duration: {
        type: Number
    }
})

journeySchema.plugin(mongoosePaginate);

export default mongoose.model<IJourneyDocument, mongoose.PaginateModel<IJourneyDocument>>('Journey', journeySchema)