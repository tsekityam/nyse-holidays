# nyse-holidays

Get all NYSE markets observe U.S. holidays

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
