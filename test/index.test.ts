import tap from "tap";

import { getNthDay, getLastDay } from "../src/common/util";
import { isHoliday, getHolidays } from "../src/index";

tap.test("nyse-holidays/common/util", async (tests) => {
  tests.test("getNthDay", async (test) => {
    [
      { n: 1, year: 2020, month: 1, day: 1, expected: "Mon Jan 06 2020" },
      { n: 2, year: 2020, month: 2, day: 2, expected: "Tue Feb 11 2020" },
      { n: 3, year: 2020, month: 3, day: 3, expected: "Wed Mar 18 2020" },
      { n: 4, year: 2020, month: 4, day: 4, expected: "Thu Apr 23 2020" },
      { n: 5, year: 2020, month: 5, day: 5, expected: "Fri May 29 2020" },
    ].forEach((param) => {
      const { expected } = param;
      const dateString = getNthDay(param).toDate().toDateString();
      test.ok(dateString === expected, `${dateString} === ${expected}`);
    });
  });

  tests.test("getLastDay", async (test) => {
    [
      { year: 2020, month: 1, day: 1, expected: "Mon Jan 27 2020" },
      { year: 2020, month: 2, day: 2, expected: "Tue Feb 25 2020" },
      { year: 2020, month: 3, day: 3, expected: "Wed Mar 25 2020" },
      { year: 2020, month: 4, day: 4, expected: "Thu Apr 30 2020" },
      { year: 2020, month: 5, day: 5, expected: "Fri May 29 2020" },
    ].forEach((param) => {
      const { expected } = param;
      const dateString = getLastDay(param).toDate().toDateString();
      test.ok(dateString === expected, `${dateString} === ${expected}`);
    });
  });
});

tap.test("nyse-holidays", async (tests) => {
  tests.test("isHoliday", async (test) => {
    [
      /*
       * source: https://nyseholidays.blogspot.com/2012/08/NYSE-Holidays-1891-1990.html
       */
      { year: 1897, month: 12, day: 31, expected: true }, // New Years Day
      { year: 1898, month: 2, day: 11, expected: true }, // Lincoln's Birthday
      { year: 1898, month: 2, day: 22, expected: true }, // Washington's Birthday
      { year: 1898, month: 5, day: 30, expected: true }, // Memorial Day
      { year: 1898, month: 7, day: 4, expected: true }, // Independence Day
      { year: 1898, month: 9, day: 5, expected: true }, // Labor Day
      { year: 1898, month: 11, day: 24, expected: true }, // Thanksgiving Day
      { year: 1898, month: 12, day: 26, expected: true }, // Christmas Day
      /*
       * source: https://nyseholidays.blogspot.com/2012/08/NYSE-Holidays-1891-1990.html
       */
      { year: 1950, month: 1, day: 2, expected: true }, // New Years Day
      { year: 1950, month: 2, day: 13, expected: true }, // Lincoln's Birthday
      { year: 1950, month: 2, day: 22, expected: true }, // Washington's Birthday
      { year: 1950, month: 4, day: 7, expected: true }, // GoodFriday
      { year: 1950, month: 5, day: 30, expected: true }, // Memorial Day
      { year: 1950, month: 7, day: 4, expected: true }, // Independence Day
      { year: 1950, month: 9, day: 4, expected: true }, // Labor Day
      { year: 1950, month: 10, day: 12, expected: true }, // Columbus Day
      { year: 1950, month: 11, day: 7, expected: true }, // Election Day
      { year: 1950, month: 11, day: 10, expected: true }, // Veterans Day
      { year: 1950, month: 11, day: 23, expected: true }, // Thanksgiving Day
      { year: 1950, month: 12, day: 25, expected: true }, // Christmas Day
      /*
       * source: https://www.nyse.com/markets/hours-calendars
       */
      { year: 2021, month: 1, day: 1, expected: true }, // New Years Day
      { year: 2021, month: 1, day: 18, expected: true }, // Martin Luther King, Jr. Day
      { year: 2021, month: 2, day: 15, expected: true }, // Washington's Birthday
      { year: 2021, month: 4, day: 2, expected: true }, // Good Friday
      { year: 2021, month: 5, day: 31, expected: true }, // Memorial Day
      { year: 2021, month: 7, day: 5, expected: true }, // Independence Day
      { year: 2021, month: 9, day: 6, expected: true }, // Labor Day
      { year: 2021, month: 11, day: 25, expected: true }, // Thanksgiving Day
      { year: 2021, month: 12, day: 24, expected: true }, // Christmas Day
      { year: 2021, month: 12, day: 31, expected: false },
      { year: 2022, month: 1, day: 1, expected: false },
      { year: 2022, month: 1, day: 17, expected: true }, // Martin Luther King, Jr. Day
      { year: 2022, month: 2, day: 21, expected: true }, // Washington's Birthday
      { year: 2022, month: 4, day: 15, expected: true }, // Good Friday
      { year: 2022, month: 5, day: 30, expected: true }, // Memorial Day
      { year: 2022, month: 7, day: 4, expected: true }, // Independence Day
      { year: 2022, month: 9, day: 5, expected: true }, // Labor Day
      { year: 2022, month: 11, day: 24, expected: true }, // Thanksgiving Day
      { year: 2022, month: 12, day: 26, expected: true },
      { year: 2023, month: 1, day: 2, expected: true }, // New Years Day
      { year: 2023, month: 1, day: 16, expected: true }, // Martin Luther King, Jr. Day
      { year: 2023, month: 2, day: 20, expected: true }, // Washington's Birthday
      { year: 2023, month: 4, day: 7, expected: true }, // Good Friday
      { year: 2023, month: 5, day: 29, expected: true }, // Memorial Day
      { year: 2023, month: 7, day: 4, expected: true }, // Independence Day
      { year: 2023, month: 9, day: 4, expected: true }, // Labor Day
      { year: 2023, month: 11, day: 23, expected: true }, // Thanksgiving Day
      { year: 2023, month: 12, day: 25, expected: true }, // Christmas Day
    ].forEach((param) => {
      const { day, month, year, expected } = param;
      const date = new Date(`${year}-${month}-${day}`);
      test.ok(
        isHoliday(date) === expected,
        `isHoliday(${date.toDateString()}) === ${expected}`
      );
    });
  });

  tests.test("getHolidays", async (test) => {
    [
      { year: 1800, expected: 0 },
      { year: 2021, expected: 9 },
      { year: 2022, expected: 8 },
      { year: 2023, expected: 9 },
    ].forEach((param) => {
      const { year, expected } = param;

      test.ok(
        getHolidays(year).length === expected,
        `getHolidays(${year}).length = ${
          getHolidays(year).length
        } === ${expected}`
      );
    });
  });
});
