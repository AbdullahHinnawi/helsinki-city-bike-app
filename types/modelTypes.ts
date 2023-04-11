import { Document, Types } from "mongoose";

export interface IJourney {
    departure: Date,
    return: Date,
    departureStationId: number,
    departureStationName: string,
    returnStationId: number,
    returnStationName: string,
    coveredDistance: number,
    duration: number
}

export interface IJourneyDocument extends Document, IJourney {
    _id: Types.ObjectId,
}


export interface IStation {
    fid: number,
    stationId: number,
    nimi: string,
    namn: string,
    name: string,
    osoite: string,
    address: string,
    kaupunki: string | undefined,
    stad: string | undefined,
    operaattor: string | undefined,
    kapasiteet: number,
    x: number,
    y: number
}

export interface IStationDocument extends Document, IStation {
    _id: Types.ObjectId,
}