import * as dateFns from 'date-fns';
import { subWeeks, subMonths, startOfYear } from 'date-fns';

import type { TIME_FRAME } from 'interfaces';

import { DEFAULT_DATE_TIME_FORMAT } from 'global/common';

export const transformDateString = (
  stringInput: string,
  formatInput = 'yyyyMMdd',
  formatOutput = 'yyyyMMdd',
) => {
  try {
    const date = formatStringToDate(stringInput, formatInput);

    if (date) {
      return formatDateToString(date, formatOutput);
    }
    return stringInput;
  } catch (error) {
    console.log(error);

    return '';
  }
};

export const formatDateToYMD = (stringInput: string) => {
  const date = formatStringToDate(stringInput, 'ddMMyyyy');

  if (date) {
    return formatDateToString(date);
  }
  return stringInput;
};

export const formatStringToDate = (
  stringInput: string | undefined,
  formatInput = 'yyyyMMdd',
) => {
  if (stringInput == null) {
    return new Date();
  }

  return dateFns.parse(stringInput, formatInput, new Date());
};

export const formatDateToString = (
  date: Date | null | undefined,
  formatOutput = 'yyyyMMdd',
) => {
  try {
    if (date == null) {
      return null;
    }
    return dateFns.format(date, formatOutput);
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const isDateValid = (date: Date) => dateFns.isValid(date);

export const formatTimeToDisplay = (
  stringInput?: string,
  formatOutput = 'HH:mm:ss',
  formatInput = 'yyyyMMddHHmmss',
  ignoreTimeZone?: boolean,
) => {
  try {
    if (!stringInput) {
      return '';
    }
    const time = dateFns.parse(stringInput, formatInput, new Date());
    return dateFns.format(time, formatOutput);
  } catch (error) {
    return null;
  }
};

export const formatTimeToUTC = (a: Date, offsetTimeZone = 0) => {
  const year = a.getFullYear();
  const month = a.getMonth();
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return Date.UTC(year, month, date, hour + offsetTimeZone, min, sec);
};

export const getUTCTime = (a: Date) => {
  const year = a.getFullYear();
  const month = a.getMonth();
  const date = a.getDate();

  return Date.UTC(year, month, date, 0, 0, 0);
};

export const getEndOfDay = (a: Date) => dateFns.endOfDay(a);

export const formatDateTime = (date: string, time: string): string => {
  const dateTimeString = `${date} ${time}`;

  const parsedDate = dateFns.parse(
    dateTimeString,
    'yyyyMMdd HH:mm:ss',
    new Date(),
  );

  return dateFns.format(parsedDate, DEFAULT_DATE_TIME_FORMAT);
};

export const getFromDateByTimeFrame = (
  timeFrame: TIME_FRAME,
  startDate?: Date,
) => {
  const now = startDate || new Date();
  switch (timeFrame) {
    case '1W':
      return subWeeks(now, 1);
    case '1M':
      return subMonths(now, 1);
    case '3M':
      return subMonths(now, 3);
    case '6M':
      return subMonths(now, 6);
    case '9M':
      return subMonths(now, 9);
    case '1Y':
      return subMonths(now, 12);
    case 'YTD':
      return startOfYear(now);
    default:
      return now;
  }
};
