import mongoose from 'mongoose'

/**
 * Journey Schema
 */
const journeySchema = new mongoose.Schema({
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

export default mongoose.model('Journey', journeySchema)