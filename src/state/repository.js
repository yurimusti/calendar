import axios from "axios";

const API_KEY = `530cc65d-a050-4100-9395-1701de741783`;

export const getListHolidays = year => {
  const COUNTRY = "BR";
  const URL = `https://holidayapi.pl/v1/holidays?api_key=${API_KEY}&country=${COUNTRY}&year=${year}`;
  return axios.get(URL)
  ;
};
