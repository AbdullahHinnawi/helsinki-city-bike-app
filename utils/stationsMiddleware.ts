import { Request, Response, NextFunction } from "express"
import Station from "../models/Station"



/**
 * Used to get the stations.
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns stations
 * @info Pagination and filtering are implemented through request body
 * Example:
 * req.body = {
 *  "query": {
 *    "Kaupunki": "Espoo"
 *  },
 *  "options": {
 *    "limit":50,
 *    "page": 1
 *  }
 * }
 */
export const getStations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, options } = req.body
    const result = await Station.paginate(query, options)
    return res.status(200).json(result)
  } catch (exception: unknown) {
    return next(exception)
  }
}

/**
 * Used to create a new station.
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns created station object
 */

export const createStation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { body } = req
    const newStation = new Station({
      fid: body.fid,
      nimi: body.nimi,
      namn: body.name,
      name: body.name,
      osoite: body.osoite,
      address: body.osoite,
      kaupunki: body.kaupunki,
      stad: body.stad,
      operaattor: body.operaattor,
      kapasiteet: body.kapasiteet,
      x: body.x,
      y: body.y
    })
    const createdStation = await newStation.save()
    return res.status(201).json(createdStation)

  } catch (exception: unknown) {
    return next(exception)
  }

}