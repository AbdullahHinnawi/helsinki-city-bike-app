
import mongoose from 'mongoose'
import logger from '../utils/logger'
import config from './../utils/config'

/**
 * Connects to DB
 */
export const connectToDB = async (): Promise<void> => {
  const options = {}
  try {
    await mongoose.connect(config.MONGODB_URI, options)
    logger.info('connected to MongoDB')
  } catch (error: any) {
    logger.error('connection error to MongoDB:', error.message)
  }
}

export const db = mongoose.connection;

export const dropCollection = async (collection: string) => {
  return await db.collection(collection).drop()
}