import express from 'express'
import { createStation, getStationStats, getStations } from '../utils/stationsMiddleware';

const stationsRouter = express.Router()

/**
 * @info Route to get all stations
 * @info Pagination and filtering are implemented through request body
 */
stationsRouter.post('/', getStations)

/**
 * @info Route to create a new station
 */
stationsRouter.post('/create', createStation)

/**
 * @info Route to get a station statistics by station id
 */
stationsRouter.get('/:stationId/:startDate/:endDate', getStationStats)

export default stationsRouter;