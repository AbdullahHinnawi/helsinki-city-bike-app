import logger from './logger'

/**
 * This middleware function is used to log requests which
 * come from the frontend
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns next() - continue to the next block of code
 */
const requestLogger = (req, _res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

/**
 * This middleware function is used to return error message
 * if the user tries to hit and endpoint which does not exist.
 * come from the frontend
 * @param req - Express Request.
 * @param res - Express Response.
 * @returns error - unknown endpoint
 */
const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

/**
 * This middleware function is used to handle errors
 * @param error - occured error.
 * @param req - Express Request.
 * @param res - Express Response.
 * @param next - Next function
 * @returns error - the error message.
 * @returns next() - continue the functionality of the server
 */
const errorHandler = (error, _req, res, next) => {
  logger.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}