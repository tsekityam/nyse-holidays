import assert from "assert";
import { getHolidays, isHoliday } from ".";

describe("nyse-holidays", function () {
  describe("isHoliday", function () {
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

      it(`should return ${expected} for isHoliday(${date.toDateString()})`, function () {
        assert.equal(isHoliday(date), expected);
      });
    });
  });

  describe("getHolidays", function () {
    [
      { year: 1800, expected: 0 },
      { year: 2021, expected: 9 },
      { year: 2022, expected: 8 },
      { year: 2023, expected: 9 },
    ].forEach((param) => {
      const { year, expected } = param;
      const length = getHolidays(year).length;

      it(`should return ${expected} for getHolidays(${JSON.stringify({
        year,
      })}).length`, function () {
        assert.equal(length, expected);
      });
    });
  });
});
