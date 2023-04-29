


export const isStartEndDateRangeValid = (startDate: string, endDate: string) => {
  if (startDate && endDate && Boolean(Date.parse(startDate)) && Boolean(Date.parse(endDate)) && Boolean(Date.parse(endDate) >= Date.parse(startDate))) {
    return true
  }
  return false
}

export const getCapacity = (capacityOperator: string, capacityValue: number) => {

  let capacity = {}

  switch (capacityOperator) {
    case "gt":
      capacity = { $gt: capacityValue }
      break;
    case "gte":
      capacity = { $gte: capacityValue }
      break;
    case "eq":
      capacity = { $eq: capacityValue }
      break;
    case "lt":
      capacity = { $lt: capacityValue }
      break;
    case "lte":
      capacity = { $lte: capacityValue }
      break;
    default:
      capacity = { $gt: 0 }
      break;
  }
  return capacity;
}