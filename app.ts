import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './utils/config'
import middleware from './utils/middleware'
import logger from './utils/logger'

const app = express()

logger.info('connecting to', config.MONGODB_URI)

const options = {};

mongoose.connect(config.MONGODB_URI, options).then(() => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app