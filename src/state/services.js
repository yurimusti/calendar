import * as repository from "./repository";

export const getListHolidays = year => {
  return repository.getListHolidays(year);
};
