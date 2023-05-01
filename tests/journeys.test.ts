import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app'
import JourneyModel from './../models/Journey'
import { initialJourneys, initialRequestBody } from './helpers'

const api = request(app)

describe("journeys", () => {

  beforeEach(async () => {
    await JourneyModel.deleteMany({})
    await JourneyModel.insertMany(initialJourneys);
  })

  test('get all journeys: expect response with status code 200', async () => {
    const response = await api.post('/api/journeys').send(initialRequestBody)
    expect(response.status).toBe(200)
  })

  test('get all journeys: expect response body to have docs property', async () => {
    const response = await api.post('/api/journeys').send(initialRequestBody)
    expect(response.body).toHaveProperty('docs')
  })

  test('get all journeys: all journey docs are returned', async () => {
    const response = await api.post('/api/journeys').send(initialRequestBody)
    expect(response.body.totalDocs).toEqual(initialJourneys.length)
  })

  test('a valid journey obejct can be added', async () => {
    const newJourney = {
      departure: "2021-06-29T23:59:07",
      return: "2021-06-30T23:59:07",
      departureStationId: 52,
      departureStationName: "Heikkilänaukio",
      returnStationId: 15,
      returnStationName: "Ritarikatu",
      coveredDistance: 8000,
      duration: 2320
    }
    await api.post('/api/journeys/create').send(newJourney)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.post('/api/journeys').send(initialRequestBody)
    expect(response.body.totalDocs).toEqual(initialJourneys.length + 1)

  })

  test('adding a journey fails if departure station id or duration are missing', async () => {
    const newJourney = {
      departure: "2021-06-29T23:59:07",
      return: "2021-06-30T23:59:07",
      departureStationName: "Heikkilänaukio",
      returnStationId: 15,
      returnStationName: "Ritarikatu",
      coveredDistance: 8000,
    }
    const response = await api.post('/api/journeys/create').send(newJourney)
    expect(response.status).toBe(400)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})
