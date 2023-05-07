import app from './app'
import http from 'http'
import config from './utils/config'

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Node environment: ${config.NODE_ENV}`)
    console.log(`Server running at ${config.BASE_URI}`)
    console.log(`API docs can be found at ${config.BASE_URI}/api-docs`)
})