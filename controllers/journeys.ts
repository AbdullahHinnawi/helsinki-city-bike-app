import express from 'express'
import { createJourney, getJourneys } from '../utils/journeysMiddleware';

const journeysRouter = express.Router()

/**
 * @info Route to get journeys
 * @info Pagination and filtering are implemented through request body
 */
journeysRouter.post('/', getJourneys)

/**
 * @info Route to create a new station
 */
journeysRouter.post('/create', createJourney)

export default journeysRouter;