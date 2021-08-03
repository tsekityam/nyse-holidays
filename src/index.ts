import dayjs from "dayjs";
import {
  getDateFor,
  getGoodFridayOf,
  getLastDayOf,
  getNthDayOf,
} from "./common/util";

export type Holiday = {
  name: string;
  date: Date;
  dateString: string;
};

export const getHolidays = (year: number): Holiday[] =>
  [
    { name: "New Years Day", date: getDateFor({ year, month: 1, day: 1 }) },
    {
      name: "Martin Luther King, Jr. Day",
      date: getNthDayOf({ n: 3, year, month: 1, day: 1 }),
    },
    {
      name: "Washington's Birthday",
      date: getNthDayOf({ n: 3, year, month: 2, day: 1 }),
    },
    {
      name: "Good Friday",
      date: getGoodFridayOf({ year }),
    },
    { name: "Memorial Day", date: getLastDayOf({ year, month: 5, day: 1 }) },
    { name: "Independence Day", date: getDateFor({ year, month: 7, day: 4 }) },
    { name: "Labor Day", date: getNthDayOf({ n: 1, year, month: 9, day: 1 }) },
    {
      name: "Thanksgiving Day",
      date: getNthDayOf({ n: 4, year, month: 11, day: 4 }),
    },
    { name: "Christmas Day", date: getDateFor({ year, month: 12, day: 25 }) },
  ]
    .map((holiday) => {
      if (holiday.date.day() === 0) {
        return {
          ...holiday,
          date: holiday.date.add(1, "day"),
        };
      } else if (holiday.date.day() === 6) {
        return {
          ...holiday,
          date: holiday.date.subtract(1, "day"),
        };
      } else {
        return holiday;
      }
    })
    .filter((holiday) => holiday.date.year() === year)
    .map((holiday) => {
      return {
        ...holiday,
        date: holiday.date.toDate(),
        dateString: holiday.date.format("YYYY-MM-DD"),
      };
    });

export const isHoliday = (date: Date): boolean => {
  const year = dayjs(date).year();
  return getHolidays(year).some(
    (holiday) => holiday.date.toDateString() === date.toDateString()
  );
};
