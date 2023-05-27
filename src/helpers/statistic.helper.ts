import moment from 'moment';

export function getMonthlyRate(value: any, lastMonthValue: any) {
  const currentDate = moment().date();
  const daysOfLastMoth = moment().subtract(1, 'month').daysInMonth();
  if (value && lastMonthValue) {
    const curAverage = Number(value) / currentDate;
    const prevAverage = Number(lastMonthValue) / daysOfLastMoth;
    return curAverage / prevAverage;
  }
  return 0;
}
