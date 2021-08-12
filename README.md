# nyse-holidays

Get all NYSE markets observe U.S. holidays since 1885

[![npm version](https://badge.fury.io/js/nyse-holidays.svg)](https://badge.fury.io/js/nyse-holidays)
[![Node.js CI](https://github.com/tsekityam/nyse-holidays/actions/workflows/test.yml/badge.svg)](https://github.com/tsekityam/nyse-holidays/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/tsekityam/nyse-holidays/branch/main/graph/badge.svg?token=gZOvThQpTV)](https://codecov.io/gh/tsekityam/nyse-holidays)
[![Known Vulnerabilities](https://snyk.io/test/github/tsekityam/nyse-holidays/badge.svg)](https://snyk.io/test/github/tsekityam/nyse-holidays)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftsekityam%2Fnyse-holidays.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftsekityam%2Fnyse-holidays?ref=badge_shield)

## Installation

`yarn add nyse-holidays`

## Usage

```ts
import { isHoliday, getHolidays } from "nyse-holidays";

console.log(isHoliday(new Date("2021-01-01"))); // true

console.log(isHoliday(new Date("2022-01-01"))); // false

console.log(getHolidays(2021));
/*
[
  {
    name: 'New Years Day',
    date: 2020-12-31T16:00:00.000Z,
    dateString: '2021-01-01'
  },
  {
    name: 'Martin Luther King, Jr. Day',
    date: 2021-01-17T16:00:00.000Z,
    dateString: '2021-01-18'
  },
  {
    name: "Washington's Birthday",
    date: 2021-02-14T16:00:00.000Z,
    dateString: '2021-02-15'
  },
  {
    name: 'Good Friday',
    date: 2021-04-01T16:00:00.000Z,
    dateString: '2021-04-02'
  },
  {
    name: 'Memorial Day',
    date: 2021-05-30T16:00:00.000Z,
    dateString: '2021-05-31'
  },
  {
    name: 'Independence Day',
    date: 2021-07-04T16:00:00.000Z,
    dateString: '2021-07-05'
  },
  {
    name: 'Labor Day',
    date: 2021-09-05T16:00:00.000Z,
    dateString: '2021-09-06'
  },
  {
    name: 'Thanksgiving Day',
    date: 2021-11-24T16:00:00.000Z,
    dateString: '2021-11-25'
  },
  {
    name: 'Christmas Day',
    date: 2021-12-23T16:00:00.000Z,
    dateString: '2021-12-24'
  }
]
*/
```

[CodeSandbox](https://codesandbox.io/s/ts-example-o8smc)

## References

- [HISTORY OF NEW YORK STOCK EXCHANGE HOLIDAYS](https://www.bcm-news.de/wp-content/uploads/closings-nyse.pdf)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftsekityam%2Fnyse-holidays.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftsekityam%2Fnyse-holidays?ref=badge_large)
