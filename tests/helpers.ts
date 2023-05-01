export const initialStations = [
  {
    "fid": 2,
    "stationId": 503,
    "nimi": "Keilalahti",
    "namn": "Kägelviken",
    "name": "Keilalahti",
    "osoite": "Keilalahdentie 2",
    "address": "Kägelviksvägen 2",
    "kaupunki": "Espoo",
    "stad": "Esbo",
    "operaattor": "CityBike Finland",
    "kapasiteet": 28,
    "x": 60.171524,
    "y": 24.827467,
  },
  {
    "fid": 7,
    "stationId": 513,
    "nimi": "Hakalehto",
    "namn": "Hagliden",
    "name": "Hakalehto",
    "osoite": "Merituulentie 18",
    "address": "Havsvindsvägen 18",
    "kaupunki": "Espoo",
    "stad": "Esbo",
    "operaattor": "CityBike Finland",
    "kapasiteet": 24,
    "x": 60.173567,
    "y": 24.79139,
  },
  {
    "fid": 10,
    "stationId": 518,
    "nimi": "Tuulimäki",
    "namn": "Väderbacken",
    "name": "Tuulimäki",
    "osoite": "Itätuulenkuja 11",
    "address": "Östanvindsgränden 11",
    "kaupunki": "Espoo",
    "stad": "Esbo",
    "operaattor": "CityBike Finland",
    "kapasiteet": 18,
    "x": 60.174144,
    "y": 24.806051,
  },
]

export const initialJourneys = [
  {
    "departure": "2021-05-31T20:54:11.000Z",
    "return": "2021-05-31T21:17:11.000Z",
    "departureStationId": 34,
    "departureStationName": "Kansallismuseo",
    "returnStationId": 81,
    "returnStationName": "Stenbäckinkatu",
    "coveredDistance": 2550,
    "duration": 1377,
  },
  {
    "departure": "2021-05-31T20:52:03.000Z",
    "return": "2021-05-31T21:15:16.000Z",
    "departureStationId": 116,
    "departureStationName": "Linnanmäki",
    "returnStationId": 117,
    "returnStationName": "Brahen puistikko",
    "coveredDistance": 3344,
    "duration": 1393,
  },
  {
    "departure": "2021-05-31T20:50:19.000Z",
    "return": "2021-05-31T21:05:58.000Z",
    "departureStationId": 116,
    "departureStationName": "Linnanmäki",
    "returnStationId": 145,
    "returnStationName": "Pohjolankatu",
    "coveredDistance": 3248,
    "duration": 935,
  }
]

export const initialRequestBody = {
  query: {},
  options: {
    limit:100,
    page: 1
  }
}