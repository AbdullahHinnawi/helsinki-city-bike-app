import { Request, Response, NextFunction } from "express"
import Journey from "../models/Journey"
import { convertKilometersToMeters, convertMinutesToSeconds, getStatement } from "./helpers"
import logger from "./logger"

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

    const { stationName, firstLogicalOperator, distanceOperator, distanceValue, secondLogicalOperator, durationOperator, durationValue } = query

    let dbQuery = {}

    console.log(firstLogicalOperator)

    // Filter according to distance and/or duration
    if (Boolean(!stationName && secondLogicalOperator)) {
      if (secondLogicalOperator.toString() === 'and') {
        dbQuery = {
          $and: [
            { coveredDistance: getStatement(distanceOperator, convertKilometersToMeters(distanceValue)) },
            { duration: getStatement(durationOperator, convertMinutesToSeconds(durationValue)) }
          ]
        }
      }
      if (secondLogicalOperator.toString() === 'or') {
        dbQuery = {
          $or: [
            { coveredDistance: getStatement(distanceOperator, convertKilometersToMeters(distanceValue)) },
            { duration: getStatement(durationOperator, convertMinutesToSeconds(durationValue)) }
          ]
        }
      }

    }

    // Filter according to departure/return station name AND/OR  (distance AND/OR duration)
    if (Boolean(stationName && firstLogicalOperator && secondLogicalOperator)) {

      // Departure/return station AND (distance AND duration)
      if (firstLogicalOperator.toString() === 'and' && secondLogicalOperator.toString() === 'and') {
        dbQuery = {
          // Retrieve departure/return station by name
          $or: [
            { departureStationName: { $in: new RegExp(stationName, 'i') } },
            { returnStationName: { $in: new RegExp(stationName, 'i') } },
          ],
          // AND covered distance by kilometers AND duration by seconds
          $and: [
            { coveredDistance: getStatement(distanceOperator, convertKilometersToMeters(distanceValue)) },
            { duration: getStatement(durationOperator, convertMinutesToSeconds(durationValue)) },
          ]
        }
      }

      // Departure/return station OR (distance OR duration)
      if (firstLogicalOperator.toString() === 'or' && secondLogicalOperator.toString() === 'or') {
        dbQuery = {
          // Retrieve departure/return station by name OR covered distance by kilometers OR duration by seconds
          $or: [
            { departureStationName: { $in: new RegExp(stationName, 'i') } },
            { returnStationName: { $in: new RegExp(stationName, 'i') } },
            { coveredDistance: getStatement(distanceOperator, convertKilometersToMeters(distanceValue)) },
            { duration: getStatement(durationOperator, convertMinutesToSeconds(durationValue)) }
          ],
        }
      }

      // Departure/return station AND (distance OR duration)
      if (firstLogicalOperator.toString() === 'and' && secondLogicalOperator.toString() === 'or') {
        dbQuery = {
          // Retrieve departure/return station by name
          $or: [
            { departureStationName: { $in: new RegExp(stationName, 'i') } },
            { returnStationName: { $in: new RegExp(stationName, 'i') } },
          ],
          // AND  (covered distance by kilometers OR duration by seconds)
          $and: [
            {
              $or: [
                { coveredDistance: getStatement(distanceOperator, convertKilometersToMeters(distanceValue)) },
                { duration: getStatement(durationOperator, convertMinutesToSeconds(durationValue)) }
              ]
            }
          ],
        }
      }

      // Departure/return station OR (distance AND duration)
      if (firstLogicalOperator.toString() === 'or' && secondLogicalOperator.toString() === 'and') {
        dbQuery = {
          // Retrieve departure/return station by name
          $or: [
            { departureStationName: { $in: new RegExp(stationName, 'i') } },
            { returnStationName: { $in: new RegExp(stationName, 'i') } },
            // OR  (covered distance by kilometers AND duration by seconds)
            { $or: [
              {
                $and: [
                  { coveredDistance: getStatement(distanceOperator, convertKilometersToMeters(distanceValue)) },
                  { duration: getStatement(durationOperator, convertMinutesToSeconds(durationValue)) }
                ]
              }
            ],}
          ],
        }
      }

    }

    logger.info("journeys dbQuery", JSON.stringify(dbQuery, null, 2))
    const result = await Journey.paginate(dbQuery, options)
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

export const createJourney = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { body } = req

    if(new Date(body.return).getTime() <= new Date(body.departure).getTime()){
      return res.status(400).json({error: "Retrun time can not be before or same as departure time"})
    }
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
    logger.info("createdJourney", createdJourney)
    return res.status(201).json(createdJourney)

  } catch (error: any) {
    logger.error(error)
    return res.status(400).json({error: error.message})
  }

}