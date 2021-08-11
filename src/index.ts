import dayjs from "dayjs";
import { getDate, getGoodFriday, getLastDay, getNthDay } from "./common/util";

export type Holiday = {
  name: string;
  date: Date;
  dateString: string;
};

export const getHolidays = (year: number): Holiday[] => {
  if (year < 1885) {
    return [];
  }

  const holidays: { name: string; date: dayjs.Dayjs }[] = [];

  const newYearsDay = NewYearsDay(year);
  newYearsDay && holidays.push(newYearsDay);

  const martinLutherKingJrDay = MartinLutherKingJrDay(year);
  martinLutherKingJrDay && holidays.push(martinLutherKingJrDay);

  const lincolnsBirthday = LincolnsBirthday(year);
  lincolnsBirthday && holidays.push(lincolnsBirthday);

  const washingtonsBirthday = WashingtonsBirthday(year);
  washingtonsBirthday && holidays.push(washingtonsBirthday);

  const goodFriday = GoodFriday(year);
  goodFriday && holidays.push(goodFriday);

  const memorialDay = MemorialDay(year);
  memorialDay && holidays.push(memorialDay);

  const independenceDay = IndependenceDay(year);
  independenceDay && holidays.push(independenceDay);

  const laborDay = LaborDay(year);
  laborDay && holidays.push(laborDay);

  const columbusDay = ColumbusDay(year);
  columbusDay && holidays.push(columbusDay);

  const electionDay = ElectionDay(year);
  electionDay && holidays.push(electionDay);

  const veteransDay = VeteransDay(year);
  veteransDay && holidays.push(veteransDay);

  const thanksgivingDay = ThanksgivingDay(year);
  thanksgivingDay && holidays.push(thanksgivingDay);

  const christmasDay = ChristmasDay(year);
  christmasDay && holidays.push(christmasDay);

  const result = holidays
    .map((holiday) => {
      if (holiday.date.day() === 0) {
        /*
         * Traditionally, when a holiday falls on a Sunday,
         * the NYSE closes the succeeding Monday
         */
        return {
          ...holiday,
          date: holiday.date.add(1, "day"),
        };
      }
      if (holiday.date.day() === 6) {
        /* On July 3, 1959, the Board adopted a policy that,
         * when a holiday falls on a Saturday,
         * the Exchange will not be open for business on the preceding Friday,
         * unless it ends a monthly or yearly accounting period
         */
        const observed = holiday.date.subtract(1, "day");
        if (holiday.date.isBefore(getDate({ year: 1959, month: 7, day: 3 }))) {
          return {
            ...holiday,
            date: observed,
          };
        } else if (observed.month() === holiday.date.month()) {
          return {
            ...holiday,
            date: observed,
          };
        }
      }

      return holiday;
    })
    .filter((holiday) => holiday.date.day() !== 6)
    .map((holiday) => {
      return {
        ...holiday,
        date: holiday.date.toDate(),
        dateString: holiday.date.format("YYYY-MM-DD"),
      };
    });

  return result;
};

export const isHoliday = (date: Date): boolean => {
  const year = dayjs(date).year();
  return (
    getHolidays(year).some(
      (holiday) => holiday.date.toDateString() === date.toDateString()
    ) ||
    getHolidays(year + 1).some(
      (holiday) => holiday.date.toDateString() === date.toDateString()
    )
  );
};

const NewYearsDay = (year: number) => {
  // Closed every year.
  return { name: "New Years Day", date: getDate({ year, month: 1, day: 1 }) };
};

const MartinLutherKingJrDay = (year: number) => {
  // Closed all day beginning in 1998.
  if (year >= 1998) {
    return {
      name: "Martin Luther King, Jr. Day",
      date: getNthDay({ n: 3, year, month: 1, day: 1 }),
    };
  }
};

const LincolnsBirthday = (year: number) => {
  // Closed every year, 1896-1953.
  if (year >= 1896 && year <= 1953) {
    return {
      name: "Lincoln's Birthday",
      date: getDate({ year, month: 2, day: 12 }),
    };
  }
};

const WashingtonsBirthday = (year: number) => {
  // Closed every year. Observed on Mondays since 1971.
  const name = "Washington's Birthday";

  if (year > 1971) {
    return {
      name,
      date: getNthDay({ n: 3, year, month: 2, day: 1 }),
    };
  }

  return {
    name,
    date: getDate({ year, month: 2, day: 22 }),
  };
};

const GoodFriday = (year: number) => {
  // Closed every year except 1898, 1906 and 1907.
  if (year === 1898 || year === 1906 || year === 1907) {
    return undefined;
  }

  return {
    name: "Good Friday",
    date: getGoodFriday({ year }),
  };
};

const MemorialDay = (year: number) => {
  // Closed every year since 1873. Observed on Mondays since 1971.
  const name = "Memorial Day";

  if (year >= 1971) {
    return {
      name,
      date: getLastDay({ year, month: 5, day: 1 }),
    };
  } else if (year >= 1873) {
    return {
      name,
      date: getDate({ year, month: 5, day: 30 }),
    };
  }
};

const IndependenceDay = (year: number) => {
  // Closed every year.
  return {
    name: "Independence Day",
    date: getDate({ year, month: 7, day: 4 }),
  };
};

const LaborDay = (year: number) => {
  // Closed every year, 1887-date.
  if (year >= 1887) {
    return {
      name: "Labor Day",
      date: getNthDay({ n: 1, year, month: 9, day: 1 }),
    };
  }
};

const ColumbusDay = (year: number) => {
  // Closed every year, 1909-1953.
  if (year >= 1909 && year <= 1953) {
    return {
      name: "Columbus Day",
      date: getDate({ year, month: 10, day: 12 }),
    };
  }
};

const ElectionDay = (year: number) => {
  // Closed every year through 1968. Closed presidential election years only, 1972-1980.
  if (year <= 1968 || year === 1972 || year === 1976 || year === 1980) {
    const date = getNthDay({ n: 1, year, month: 11, day: 1 }).add(1, "day");
    return {
      name: "Election Day",
      date,
    };
  }
};

const VeteransDay = (year: number) => {
  // Closed all day, 1918 and 1921.
  // Closed all day, 1934-1953.
  if (year === 1918 || year === 1921 || (year >= 1934 && year <= 1953)) {
    return {
      name: "Veterans Day",
      date: getDate({ year, month: 11, day: 11 }),
    };
  }
};

const ThanksgivingDay = (year: number) => {
  // Closed every year.
  return {
    name: "Thanksgiving Day",
    date: getNthDay({ n: 4, year, month: 11, day: 4 }),
  };
};

const ChristmasDay = (year: number) => {
  // Closed every year.
  return { name: "Christmas Day", date: getDate({ year, month: 12, day: 25 }) };
};
