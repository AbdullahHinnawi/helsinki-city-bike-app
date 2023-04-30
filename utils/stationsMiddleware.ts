import { Request, Response, NextFunction } from "express"
import Station from "../models/Station"
import { getStatement, isStartEndDateRangeValid } from "./helpers"
import logger from "./logger"


/**
 * Used to get the stations.
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns stations
 * @info Pagination and filtering are implemented through request body
 * Example:
 * req.body = {
 *  "query": {},
 *  "options": {
 *    "limit":50,
 *    "page": 1
 *  }
 * }
 */
export const getStations = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { query, options } = req.body
    const {basicFilter, nameOrAddress, logicalOperator, capacityOperator, capacityValue} = query

    let dbQuery = {}

    // Search/filter according to the name/address
    if(Boolean(basicFilter  && nameOrAddress)){
      dbQuery = {
        $or: [
          { nimi: { $in: new RegExp(nameOrAddress, 'i') } },
          { osoite: { $in: new RegExp(nameOrAddress, 'i') } },
        ]
      }
    }

    // Filter according to capacity only
    if(Boolean(!nameOrAddress  && capacityOperator)){
      dbQuery = {
        $and: [
          { kapasiteet: getStatement(capacityOperator, capacityValue) }
        ]
      }
    }

    // Filter according to name/address AND/OR capacity
    if (Boolean(nameOrAddress && logicalOperator && capacityOperator)) {

      if (logicalOperator.toString() === 'and') {
        dbQuery = {
          $or: [
            { nimi: { $in: new RegExp(nameOrAddress, 'i') } },
            { osoite: { $in: new RegExp(nameOrAddress, 'i') } },
          ],
          $and: [
            { kapasiteet: getStatement(capacityOperator, capacityValue) }
          ]
        }
      }

      if (logicalOperator.toString() === 'or') {
        dbQuery = {
          $or: [
            { nimi: { $in: new RegExp(nameOrAddress, 'i') } },
            { osoite: { $in: new RegExp(nameOrAddress, 'i') } },
            { kapasiteet: getStatement(capacityOperator, capacityValue) }
          ]
        }
      }
    }
    logger.info("Stations dbQuery", JSON.stringify(dbQuery, null, 2))
    const result = await Station.paginate(dbQuery, options)
    return res.status(200).json(result)
  } catch (error: any) {
    logger.error(error)
    return res.status(400).json({error: error.message})
  }
}

/**
 * Used to create a new station.
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns created station object
 */

export const createStation = async (req: Request, res: Response, _next: NextFunction) => {

  try {
    const { body } = req

    const newId = Math.round(Date.now() + Math.random())
    const newStation = new Station({
      fid: newId,
      stationId: newId,
      nimi: body.nimi,
      namn: '',
      name: '',
      osoite: body.osoite,
      address: '',
      kaupunki: body.kaupunki,
      stad: '',
      Operaattor: '',
      kapasiteet: body.kapasiteet,
      x: body.x,
      y: body.y
    })
    const createdStation = await newStation.save()
    return res.status(201).json(createdStation)

  } catch (error: any) {
    logger.error(error)
    return res.status(400).json({error: error.message})
  }

}

/**
 * Used to get a station statistics including departure journeys count, return journeys count,
 * departure journeys average distance and return journeys average distance.
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns station object
 */

export const getStationStats = async (req: Request, res: Response, _next: NextFunction) => {

  try {
    const { stationId, startDate, endDate } = req.params

    let andProp: any[] = []

    if (isStartEndDateRangeValid(startDate, endDate)) {

      const sDate: Date = new Date(startDate)
      let eDate: Date = new Date(endDate)
      eDate.setDate(eDate.getDate() + 1);

      andProp = [
        { $gte: ["$departure", sDate] },
        { $lte: ["$departure", eDate] },
        { $gte: ["$return", sDate] },
        { $lte: ["$return", eDate] }
      ]
    }


    const pipeline = [
      {
        $match: { stationId: Number(stationId) }
      },
      {
        $lookup: {
          from: 'journeys',
          localField: 'stationId',
          foreignField: 'departureStationId',
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: andProp
                }
              }
            }
          ],
          as: 'departureJourneys'
        },
      },
      {
        $lookup: {
          from: 'journeys',
          localField: 'stationId',
          foreignField: 'returnStationId',
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: andProp
                }
              }
            }
          ],
          as: 'returnJourneys'
        },
      },
      {
        $addFields: {
          departureJourneysCount: { $size: "$departureJourneys" },
          returnJourneysCount: { $size: "$returnJourneys" },
          departureJourneysDistanceAverage: { $avg: '$departureJourneys.coveredDistance' },
          returnJourneysDistanceAverage: { $avg: '$returnJourneys.coveredDistance' },
        },
      },
      {
        $lookup: {
          from: 'journeys',
          localField: 'stationId',
          foreignField: 'departureStationId',
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: andProp
                }
              }
            },
            {
              $sortByCount: '$returnStationName',
            },
            { $limit: 5 }
          ],
          as: 'mostPopularReturnStationsForDepartureStations'
        },
      },
      {
        $lookup: {
          from: 'journeys',
          localField: 'stationId',
          foreignField: 'returnStationId',
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: andProp
                }
              }
            },
            {
              $sortByCount: '$departureStationName',
            },
            { $limit: 5 }
          ],
          as: 'mostPopularDepartureStationsForReturnStations'
        },
      }

    ]

    let result = await Station.aggregate(pipeline)
    return res.status(200).json(result[0])

  } catch (error: any) {
    logger.error(error)
    return res.status(400).json({error: error.message})
  }

}