import React, { useState, useEffect } from "react";
import dateFns from "date-fns";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ListDate from "../../components/listDate";
import * as service from "../../state/services";
import "./index.scss";

const Calendar = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    service
      .getListHolidays(dateFns.getYear(currDate.getFullYear()))
      .then(resp => {
        const newHoliday = [];
        resp.data.holidays.holidays.map(e => {
          const randomColor =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
          const obj = {
            name: e.name,
            date: dateFns.addDays(e.date, 0),
            color: randomColor
          };
          newHoliday.push(obj);
        });
        setHolidays(newHoliday);
      });
  }, []);

  useEffect(() => {
    renderDays();
  }, [currDate]);

  useEffect(() => {
    renderDays();
  }, [holidays]);

  const _nextMonth = async () => {
    const oldCurrDate = currDate;
    const newDate = dateFns.addMonths(currDate, 1);
    if (!dateFns.isSameYear(newDate, oldCurrDate)) {
      service.getListHolidays(dateFns.getYear(newDate)).then(resp => {
        const newHoliday = [];
        resp.data.holidays.holidays.map(e => {
          const randomColor =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
          const obj = {
            name: e.name,
            date: new Date(e.date),
            color: randomColor
          };
          newHoliday.push(obj);
        });
        setHolidays(newHoliday);
      });
    }
    setCurrDate(newDate);
  };

  const _prevMonth = () => {
    const oldCurrDate = currDate;
    const newDate = dateFns.subMonths(currDate, 1);
    if (!dateFns.isSameYear(newDate, oldCurrDate)) {
      service.getListHolidays(dateFns.getYear(newDate)).then(resp => {
        const newHoliday = [];
        resp.data.holidays.holidays.map(e => {
          const randomColor =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
          const obj = {
            name: e.name,
            date: new Date(e.date),
            color: randomColor
          };
          newHoliday.push(obj);
        });
        setHolidays(newHoliday);
      });
    }
    setCurrDate(newDate);
  };

  const renderDays = () => {
    const monthStart = dateFns.startOfMonth(currDate);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const formatDay = "D";

    let days = [];
    let day = startDate;
    let formattedDate = "";
    var daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, formatDay);
        const cloneDay = day;

        const holiday = holidays.filter(e => {
          return (
            dateFns.format(e.date, "DD/MM") === dateFns.format(day, "DD/MM")
          );
        });

        const obj = {
          disabled: !dateFns.isSameMonth(day, monthStart) ? true : false,
          sameDate: dateFns.isSameDay(day, selectedDate) ? true : false,
          day: formattedDate.length === 2 ? formattedDate : "0" + formattedDate,
          dayName: daysOfWeek[day.getDay()],
          isHoliday: holiday,
          onClick: () => setSelectedDate(dateFns.parse(cloneDay))
        };

        days.push(obj);
        day = dateFns.addDays(day, 1);
      }
    }
    setDays(days);
  };

  return (
    <div className="calendar">
      <Header currText={currDate} nextDate={_nextMonth} prevDate={_prevMonth} />
      <ListDate listDate={days} />
      <Footer holidays={holidays} />
    </div>
  );
};

export default Calendar;
