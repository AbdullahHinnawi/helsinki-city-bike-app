import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app'
import StationModel from './../models/Station'
import { initialRequestBody, initialStations } from './helpers'

const api = request(app)

describe("stations", () => {

  beforeEach(async () => {
    await StationModel.deleteMany({})
    await StationModel.insertMany(initialStations);
  })

  test('get all stations: expect response with status code 200', async () => {
    const response  = await api.post('/api/stations').send(initialRequestBody)
    expect(response.status).toBe(200)
  })

  test('get all stations: expect response body to have docs property', async () => {
    const response  = await api.post('/api/stations').send(initialRequestBody)
    expect(response.body).toHaveProperty('docs')
  })

  test('get all stations: all station docs are returned', async () => {
    const response  = await api.post('/api/stations').send(initialRequestBody)
    expect(response.body.totalDocs).toEqual(initialStations.length)
  })

  test('a valid station obejct can be added', async () => {
    const newStation = {
      nimi: "Aleksanderinkatu",
      osoite: "Aleksanderinkatu 1",
      kaupunki: "helsinki",
      kapasiteet: 30,
      x: 60.4342424,
      y: 24.435434
    }
    await api.post('/api/stations/create').send(newStation)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.post('/api/stations').send(initialRequestBody)
    expect(response.body.totalDocs).toEqual(initialStations.length + 1)

  })

  test('adding a station fails if kapasiteet or x properties are missing', async () => {
    const newStation = {
      nimi: "Aleksanderinkatu",
      osoite: "Aleksanderinkatu 1",
      kaupunki: "helsinki",
      y: 24.435434
    }
    const response = await api.post('/api/stations/create').send(newStation)
    expect(response.status).toBe(400)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})
