


export const isStartEndDateRangeValid = (startDate: string, endDate: string) => {
  if (startDate && endDate && Boolean(Date.parse(startDate)) && Boolean(Date.parse(endDate)) && Boolean(Date.parse(endDate) >= Date.parse(startDate))) {
    return true
  }
  return false
}

export const getStatement = (operator: string, value: number) => {

  let statement = {}

  switch (operator) {
    // greater than
    case "gt":
      statement = { $gt: value }
      break;
    // greater than or equal
    case "gte":
      statement = { $gte: value }
      break;
    // equal
    case "eq":
      statement = { $eq: value }
      break;
    // less than
    case "lt":
      statement = { $lt: value }
      break;
    // less than or equal
    case "lte":
      statement = { $lte: value }
      break;
    default:
      statement = { $gt: 0 }
      break;
  }
  return statement;
}


export const convertMinutesToSeconds = (minutes: number) => {
  return minutes * 60
}


export const convertKilometersToMeters = (kilometers: number) => {
  return kilometers * 1000
}