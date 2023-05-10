import express from 'express'
import { createJourney, getJourneys } from '../utils/journeysMiddleware';

const journeysRouter = express.Router()

/**
 * Route to get the journeys. Pagination and filtering can be specified in the request body.
 * @openapi
 * /journeys:
 *    post:
 *      summary: Route to get the journeys.
 *      description: Route to get the journeys. Pagination and filtering can be specified in the request body.
 *      tags: [Journeys]
 *      requestBody:
 *        required: true
 *        description: Please choose All Journeys, Basic Filters or Advanced Filters from the selection options below to view the appropriate example.
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: "#/components/schemas/BaseReqBody"
 *            examples:
 *                AllJourneys:
 *                  summary: All Journeys
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
 *                      stationName: kaivopuisto
 *                    options:
 *                      page: 1
 *                      limit: 100
 *                AdvancedFilters:
 *                    summary: Advanced Filters
 *                    value:
 *                      query:
 *                        basicFilter: false
 *                        stationName: kaivopuisto
 *                        firstLogicalOperator: or
 *                        distanceOperator: gt
 *                        distanceValue: 2
 *                        secondLogicalOperator: and
 *                        durationOperator: lte
 *                        durationValue: 60
 *                      options:
 *                        page: 1
 *                        limit: 100
 *      responses:
 *        "200":
 *          description: Returns journey docs supported with MongoDB pagination. Returned docs depend on the request body criteria.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/JourneysRes"
 *        "400":
 *          description: An error occurred. Either a problem with the database, server or malformed request body.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
journeysRouter.post('/', getJourneys)

/**
 * Route to create a new station.
 * @openapi
 * /journeys/create:
 *    post:
 *      summary: Route to create a new journey.
 *      description: Route to create a new journey.
 *      tags: [Journeys]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateJourneyReqBody"
 *      responses:
 *        "201":
 *          description: Returns the journey object/doc that has been created.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Journey"
 *        "400":
 *          description: An error occurred. Either a problem with the database, server or malformed request body.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
journeysRouter.post('/create', createJourney)

export default journeysRouter;