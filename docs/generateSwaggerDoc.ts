
import swaggerJsdoc from "swagger-jsdoc"
import config from './../utils/config'

const options: any = {
  swaggerDefinition: {
    openapi: "3.0.0",
    version : "1.0.0",
    info: {
      title: "City Bikes REST API",
      version: "1.0.0",
      description: "City Bikes REST API Documentation",
      license: {
        name: "Apache-2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0"
      }
    },
    servers: [
      {
        url: `${config.BASE_URI}/api`
      }
    ],
    tags: [
      {
        name: "Stations",
        description: "All routes regarding stations"
      },
      {
        name: "Journeys",
        description: "All routes regarding journeys"
      }
    ]
  },
  // List of files to be processed.
  apis: ["./docs/swaggerComponents.yaml", "./controllers/**/*.ts"],
}

const swaggerDocument = swaggerJsdoc(options)

export default swaggerDocument