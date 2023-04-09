import { Request, Response, NextFunction } from "express"
import Journey from "../models/Journey"

// https://www.npmjs.com/package/mongoose-paginate-v2

/**
 * Used to get journeys.
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns journeys
 * @info Pagination and filtering are implemented through request body
 * Example:
 * req.body = {
 *   "query":{
 *      "departureStationName": "Huopalahdentie"
 *   },
 *   "options":{
 *      "page": 1,
 *      "limit": 100
 *   }
 * }
 */
export const getJourneys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query, options } = req.body
        const result = await Journey.paginate(query, options)
        return res.status(200).json(result)
    } catch (exception: unknown) {
        return next(exception)
    }

}

/**
 * Used to create a new journey.
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns created journey object
 */

export const createJourney = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req
        const newJourney = new Journey({
            departure: body.departure,
            return: body.return,
            departureStationId: body.departureStationId,
            departureStationName: body.departureStationName,
            returnStationId: body.returnStationId,
            returnStationName: body.returnStationName,
            coveredDistance: body.coveredDistance,
            duration: body.duration,
        })
        const createdJourney = await newJourney.save()
        return res.status(201).json(createdJourney)

    } catch (exception: unknown) {
        return next(exception)
    }

}