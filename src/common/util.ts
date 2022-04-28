import dayjs from "dayjs";

export const getDate = (param: {
  year: number;
  month: number;
  day?: number;
}): dayjs.Dayjs => {
  const { year, month, day } = param;
  return dayjs(`${year}-${month}-${day ?? 1}`, "YYYY-MM-DD");
};

export const getNthDay = (param: {
  n: number;
  year: number;
  month: number;
  day: number;
}): dayjs.Dayjs => {
  const { n, year, month, day } = param;

  let result = getDate({ month, year }).day(day);

  if (result.month() !== month - 1) {
    result = result.add(1, "week");
  }

  result = result.add(n - 1, "week");

  return result;
};

export const getNextPreviousWorkDay = (param: {
  year: number;
  month: number;
  day: number;
}): dayjs.Dayjs => {
  const { year, month, day } = param;

  let result = getDate({ month, year, day });

  if (result.day() == 0) {
    //sunday
    result = result.add(1, "day");
  }

  if (result.day() == 6) {
    //saturday
    result = result.subtract(1, "day");
  }

  return result;
};

export const getLastDay = (param: {
  year: number;
  month: number;
  day: number;
}): dayjs.Dayjs => {
  const { year, month, day } = param;

  const daysInMonth = dayjs(getDate({ month, year })).daysInMonth();
  const lastDayOfMonth = dayjs(`${year}-${month}-${daysInMonth}`, "YYYY-MM-DD");

  let result = lastDayOfMonth.day(day);

  if (result.month() !== month - 1) {
    result = result.subtract(1, "week");
  }

  return result;
};

const getEasterSunday = (param: { year: number }): dayjs.Dayjs => {
  const { year } = param;

  /* credit: https://gist.github.com/johndyer/0dffbdd98c2046f41180c051f378f343 */
  const f = Math.floor,
    // Golden Number - 1
    G = year % 19,
    C = f(year / 100),
    // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    // number of days from 21 March to the Paschal full moon
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);

  return getDate({ year, month, day });
};

export const getGoodFriday = (param: { year: number }): dayjs.Dayjs => {
  const { year } = param;
  return getEasterSunday({ year }).subtract(2, "days");
};
