import express from 'express'
import cors from 'cors'
import config from './utils/config'
import middleware from './utils/middleware'
import logger from './utils/logger'
import { connectToDB } from './db/db'
import stationsRouter from './controllers/stations'
import journeysRouter from './controllers/journeys'


const app = express();

// Connect to db
(async () => {
    logger.info('connecting to', config.MONGODB_URI)
    await connectToDB()
})();

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/stations', stationsRouter)
app.use('/api/journeys', journeysRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app