import assert from "assert";
import { getNthDay, getLastDay } from "./util";

describe("nyse-holidays/common/util", function () {
  describe("getNthDay", function () {
    [
      { n: 1, year: 2020, month: 1, day: 1, expected: "Mon Jan 06 2020" },
      { n: 2, year: 2020, month: 2, day: 2, expected: "Tue Feb 11 2020" },
      { n: 3, year: 2020, month: 3, day: 3, expected: "Wed Mar 18 2020" },
      { n: 4, year: 2020, month: 4, day: 4, expected: "Thu Apr 23 2020" },
      { n: 5, year: 2020, month: 5, day: 5, expected: "Fri May 29 2020" },
    ].forEach((param) => {
      const { n, year, month, day, expected } = param;
      const dateString = getNthDay(param).toDate().toDateString();

      it(`should return ${expected} for getNthDay(${JSON.stringify({
        n,
        year,
        month,
        day,
      })}).toDate().toDateString()`, function () {
        assert.equal(dateString, expected);
      });
    });
  });

  describe("getLastDay", function () {
    [
      { year: 2020, month: 1, day: 1, expected: "Mon Jan 27 2020" },
      { year: 2020, month: 2, day: 2, expected: "Tue Feb 25 2020" },
      { year: 2020, month: 3, day: 3, expected: "Wed Mar 25 2020" },
      { year: 2020, month: 4, day: 4, expected: "Thu Apr 30 2020" },
      { year: 2020, month: 5, day: 5, expected: "Fri May 29 2020" },
    ].forEach((param) => {
      const { year, month, day, expected } = param;
      const dateString = getLastDay(param).toDate().toDateString();

      it(`should return ${expected} for getLastDay(${JSON.stringify({
        year,
        month,
        day,
      })}).toDate().toDateString()`, function () {
        assert.equal(dateString, expected);
      });
    });
  });
});
