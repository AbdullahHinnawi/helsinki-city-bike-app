import fs from 'fs'
import JourneyModel from './models/Journey'
import StationModel from './models/Station';
// https://c2fo.github.io/fast-csv/docs/parsing/examples
import * as fastcsv from "fast-csv";
import { connectToDB, dropCollection } from './db/db';
import logger from './utils/logger';
import { IStationDocument } from './types/modelTypes';

/**
 * @info To run this module use:  npm run import-data
 * @info This module is used to import journeys datasets and bike stations (located in datasets folder) into the db
 */


/**
 * Validates journey data.
 * @param row Journey row
 * @returns true if the row's data is valid, otherwise false.
 */
const isJourneyRowValid = (row: any): boolean => {

  if (new Date(row[0]) && new Date(row[1]) && Number(row[2]) && row[3] && Number(row[4]) && row[5] && Number(row[6]) && Number(row[7])) {
    return true
  }
  return false
}


/**
 * Inserts journey datasets into db.
 * Processes only two csv files since MongoDB free tier has only 512 MB of storage.
 */
export const insertJourneysIntoDB = async (): Promise<void> => {

  const datasets: string[] = ['2021-05.csv', '2021-06.csv']

  await Promise.all(
    datasets.map((dataset: string) => {

      let journeys: any[] = []
      const stream = fs.createReadStream(`datasets/${dataset}`);

      const csvStream = fastcsv.parse().on('data', async (row: any) => {
        // Don't import journeys that lasted for less than ten seconds or that covered distances shorter than 10 meters.
        if (isJourneyRowValid(row) && Number(row[6]) >= 10 && Number(row[7]) >= 10) {
          const journey = new JourneyModel({
            departure: row[0],
            return: row[1],
            departureStationId: row[2],
            departureStationName: row[3],
            returnStationId: row[4],
            returnStationName: row[5],
            coveredDistance: row[6],
            duration: row[7]
          })
          journeys.push(journey)

          if (journeys.length % 100_000 === 0) {

            csvStream.pause()
            logger.info(`Inserting ${journeys?.length} journeys into db...`);
            await JourneyModel.insertMany(journeys);
            journeys = []
            // wait for 100ms
            setTimeout(() => { }, 100);
            csvStream.resume()
          }
        }

      }).on('end', async () => {
        logger.info(`Inserting final ${journeys?.length} journeys from ${dataset} into db...`);
        await JourneyModel.insertMany(journeys);
        logger.info(`CSV file ${dataset} processed successfully`);
      }).on('error', async (error) => {
        logger.error(`Error reading from ${dataset} `, error.message)
      });

      stream.pipe(csvStream);

    })

  )
}



/**
 * Inserts bike stations into db.
 */
export const insertBikeStationsIntoDB = (): void => {

  const stations: IStationDocument[] = []
  const stream = fs.createReadStream(`datasets/bike-stations.csv`);
  const csvStream = fastcsv.parse({
    headers: ['fid', 'stationId', 'nimi', 'namn', 'name', 'osoite', 'address', 'kaupunki', 'stad', 'operaattor', 'kapasiteet', 'y', 'x'], renameHeaders: true,
    ignoreEmpty: true
  })
    .validate((row: any) => {
      if (Number(row['fid']) && Number(row['stationId']) && row['nimi'] && row['namn'] && row['name'] && row['osoite'] && row['address'] && Number(row['kapasiteet']) && Number(row['y']) && Number(row['x'])) {

        if (row['kaupunki'] === ' ') {
          row['kaupunki'] = ''
        }
        if (row['stad'] === ' ') {
          row['stad'] = ''
        }
        if (row['operaattor'] === ' ') {
          row['operaattor'] = ''
        }
        return true
      }
      return false
    })
    .on('data-invalid', (row, rowNumber, reason) => {
      logger.info(`Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}] [reason=${reason}]`);
    })
    .on('data', async (row) => {
      const station: IStationDocument = new StationModel({
        fid: row['fid'],
        stationId: row['stationId'],
        nimi: row['nimi'],
        namn: row['namn'],
        name: row['name'],
        osoite: row['osoite'],
        address: row['address'],
        kaupunki: row['kaupunki'],
        stad: row['stad'],
        operaattor: row['operaattor'],
        kapasiteet: row['kapasiteet'],
        x: row['x'],
        y: row['y']
      })
      stations.push(station)
    })
    .on('end', async () => {
      logger.info(`CSV file bike-stations.csv processed successfully`);
      logger.info(`Inserting ${stations?.length} stations into db...`);
      await StationModel.insertMany(stations);
      logger.info(`Stations inserted successfully`);
    })
    .on('error', async (error) => {
      logger.error(`Error reading from bike-stations.csv `, error.message)
    })
  stream.pipe(csvStream);
}



(async () => {
  await connectToDB()
  await dropCollection('stations')
  await dropCollection('journeys')
  insertBikeStationsIntoDB()
  await insertJourneysIntoDB()
})();



