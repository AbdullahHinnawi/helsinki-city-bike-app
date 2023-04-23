


export const isStartEndDateRangeValid = (startDate: string, endDate: string) => {
  if (startDate && endDate && Boolean(Date.parse(startDate)) && Boolean(Date.parse(endDate)) && Boolean(Date.parse(endDate) >= Date.parse(startDate))) {
    return true
  }
  return false
}