import fs from 'fs'
import JourneyModel from './models/Journey'
import StationModel from './models/Station';
import * as fastcsv from "fast-csv";
import { connectToDB, db } from './db/db';
import logger from './utils/logger';


/**
 * @info To run this module use:  npm run insert-data
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
                        logger.info(`Inserting ${journeys.length} journeys into db...`);
                        await JourneyModel.insertMany(journeys);
                        journeys = []
                        // wait for 100ms
                        setTimeout(() => { }, 100);
                        csvStream.resume()
                    }
                }

            }).on('end', async () => {
                logger.info(`Inserting final ${journeys.length} journeys from ${dataset} into db...`);
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

    const stations: any[] = []
    const stream = fs.createReadStream(`datasets/bike-stations.csv`);

    const csvStream = fastcsv.parse().on('data', async (row) => {

        const station = new StationModel({
            fid: row[0],
            id: row[1],
            nimi: row[2],
            namn: row[3],
            name: row[4],
            osoite: row[5],
            address: row[6],
            kaupunki: row[7],
            stad: row[8],
            operaattor: row[9],
            kapasiteet: row[10],
            x: row[11],
            y: row[12]
        })
        stations.push(station)

    }).on('end', async () => {
        logger.info(`CSV file bike-stations.csv processed successfully`);
        // remove the first line (csv file header)
        stations.shift();
        logger.info(`Inserting ${stations.length} stations into db...`);
        await StationModel.insertMany(stations);
        logger.info(`Stations inserted successfully`);
    }).on('error', async (error) => {
        logger.error(`Error reading from bike-stations.csv `, error.message)
    });

    stream.pipe(csvStream);

}


(async () => {
    await connectToDB()
    db.collection('stations').drop()
    db.collection('journeys').drop()
    insertBikeStationsIntoDB()
    await insertJourneysIntoDB()
})();

