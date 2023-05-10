import express from 'express'
import { createStation, getStationStats, getStations } from '../utils/stationsMiddleware';

const stationsRouter = express.Router()

/**
 * Route to get the stations. Pagination and filtering can be specified in the request body.
 * @openapi
 * /stations:
 *    post:
 *      summary: Route to get the stations.
 *      description: Route to get the stations. Pagination and filtering can be specified in the request body.
 *      tags: [Stations]
 *      requestBody:
 *        required: true
 *        description: Please select All Stations, Basic Filters or Advanced Filters from the select element below to show the proper example.
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: "#/components/schemas/BaseReqBody"
 *            examples:
 *                AllStations:
 *                  summary: All Stations
 *                  value:
 *                    query: {}
 *                    options:
 *                      page: 1
 *                      limit: 100
 *                BasicFilters:
 *                  summary: Basic Filters
 *                  value:
 *                    query:
 *                      basicFilter: true
 *                      nameOrAddress: yhdyskunnankuja
 *                    options:
 *                      page: 1
 *                      limit: 100
 *                AdvancedFilters:
 *                    summary: Advanced Filters
 *                    value:
 *                      query:
 *                        basicFilter: false
 *                        nameOrAddress: yhdyskunnankuja
 *                        logicalOperator: or
 *                        capacityOperator: gt
 *                        capacityValue: 30
 *                      options:
 *                        page: 1
 *                        limit: 100
 *      responses:
 *        "200":
 *          description: Returns station docs supported with MongoDB pagination. Returned docs depend on the request body criteria.
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/StationsRes"
 *        "400":
 *          description: An error occurred. Either a problem with the database, server or malformed request body.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
stationsRouter.post('/', getStations)

/**
 * Route to create a new station.
 * @openapi
 * /stations/create:
 *    post:
 *      summary: Route to create a new station.
 *      description: Route to create a new station.
 *      tags: [Stations]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateStationReqBody"
 *      responses:
 *        "201":
 *          description: Returns the station object/doc that has been created.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Station"
 *        "400":
 *          description: An error occurred. Either a problem with the database, server or malformed request body.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
stationsRouter.post('/create', createStation)

/**
 * Route to get a station statistics by id and date range.
 * @openapi
 * /stations/{stationId}/{startDate}/{endDate}:
 *    get:
 *      summary: Route to get a station statistics by id and date range.
 *      description: Route to get a station statistics by id and date range.
 *      tags: [Stations]
 *      parameters:
 *        - in: header
 *          name: stationId
 *          required: true
 *          example: 507
 *        - in: header
 *          name: startDate
 *          required: true
 *          example: 2021-05-20
 *        - in: header
 *          name: endDate
 *          required: true
 *          example: 2021-06-20
 *      responses:
 *        "200":
 *          description: Returns full station object, along with its statistics.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example: {
 *                   "_id": "645684ca02be146d3c27f976",
 *                   "fid": 160,
 *                   "stationId": 50,
 *                   "nimi": "Melkonkuja",
 *                   "namn": "Melkögränd",
 *                   "name": "Melkonkuja",
 *                   "osoite": "Melkonkuja 1",
 *                   "address": "Melkögränd 1",
 *                   "kaupunki": "",
 *                   "stad": "",
 *                   "operaattor": "",
 *                   "kapasiteet": 12,
 *                   "x": 60.1498126916296,
 *                   "y": 24.8861093999757,
 *                   "__v": 0,
 *                   "departureJourneys": [],
 *                   "returnJourneys": [],
 *                   departureJourneysCount: 4274,
 *                   returnJourneysCount: 4258,
 *                   departureJourneysDistanceAverage: 3121.9124941506784,
 *                   returnJourneysDistanceAverage: 2946.5440723344295,
 *                   mostPopularReturnStationsForDepartureStations: [{"_id": "Gyldenintie", "count": 714}],
 *                   mostPopularDepartureStationsForReturnStations: [{"_id": "Gyldenintie", "count": 586}]
 *                 }
 *        "400":
 *          description: An error occurred. Either a problem with the database, server or malformed request body.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
stationsRouter.get('/:stationId/:startDate/:endDate', getStationStats)

export default stationsRouter;