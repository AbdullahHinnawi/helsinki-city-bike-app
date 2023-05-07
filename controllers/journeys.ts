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
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/BaseReqBody"
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