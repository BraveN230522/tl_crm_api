import moment from 'moment';
import { enumDashboardDataFilter, enumDashboardFilter } from '../enums';
import { daysInYear } from './date.helper';

moment.locale('zh-cn', {
  week: {
    dow: 1, // Monday is the first day of the week
  },
});

export function getMonthlyRate(value: any, lastMonthValue: any) {
  const currentDate = moment().date();
  const daysOfLastMoth = moment().subtract(1, 'month').daysInMonth();
  if (value && lastMonthValue) {
    const curAverage = Number(value) / currentDate;
    const prevAverage = Number(lastMonthValue) / daysOfLastMoth;
    return (curAverage - prevAverage) / prevAverage;
  }
  return 0;
}

export function getPeriodRate(value: any, prevValue: any, type: 'week' | 'month' | 'year') {
  let dateInPeriod;
  let dateInPrevPeriod;
  if (type === 'week') {
    // Trong momentJs: Monday return 1, Sunday is return 0
    // dateInPeriod = moment().weekday() === 0 ? 7 : moment().weekday();
    dateInPeriod = moment().weekday() + 1;
    console.log("check dateInPeriod", dateInPeriod, moment().weekday());
    dateInPrevPeriod = 7;
  }
  if (type === 'month') {
    dateInPeriod = moment().date();
    dateInPrevPeriod = moment().subtract(1, type).daysInMonth();
  }
  if (type === 'year') {
    dateInPeriod = moment().dayOfYear();
    dateInPrevPeriod = daysInYear(moment().year);
  }
  if (value && prevValue) {
    const curAverage = Number(value) / dateInPeriod;
    const prevAverage = Number(prevValue) / dateInPrevPeriod;
    return (curAverage - prevAverage) / prevAverage;
  }
  return 0;
}

export function getTimeDataFilter(timeFilter: enumDashboardDataFilter) {
  return {
    startTime: moment().startOf(timeFilter).valueOf(),
    endTime: moment().endOf(timeFilter).valueOf(),
    prevStartTime: moment().subtract(1, timeFilter).startOf(timeFilter).valueOf(),
    prevEndTime: moment().subtract(1, timeFilter).endOf(timeFilter).valueOf(),
  };
}

export function getTimePeriodFilter(timeFilter: enumDashboardFilter) {
  console.log(timeFilter);
  switch (Number(timeFilter)) {
    case enumDashboardFilter.DAY:
      console.log('anc');
      return getListTimePeriod(7, 'day');
    case enumDashboardFilter.WEEK:
      return getListTimePeriod(4, 'week');
    case enumDashboardFilter.MONTH:
      return getListTimePeriod(6, 'month');
    default:
      console.log('case null');
      return [];
  }
}

export function getListTimePeriod(subtract: number, type: 'day' | 'week' | 'month' | 'year') {
  const resultDates = [];
  const current = moment();
  let n = subtract;
  while (n > 0) {
    let label = '';
    if (type === 'day') {
      label = current.format('DD/MM');
    }
    if (type === 'week') {
      label = current.startOf(type).format('DD/MM') + '-' + current.endOf(type).format('DD/MM');
    }
    if (type === 'month') {
      label = current.format('MM/YY');
    }
    resultDates.push({
      timeLabel: label,
      timeValue: current.valueOf(),
      startTime: current.startOf(type).valueOf(),
      endTime: current.endOf(type).valueOf(),
    });
    current.subtract(1, type);
    n--;
  }
  return resultDates;
}
