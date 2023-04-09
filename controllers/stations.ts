import express from 'express'
import { createStation, getStations } from '../utils/stationsMiddleware';

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

export default stationsRouter;