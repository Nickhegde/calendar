import React from 'react';
import { format, addMonths, subMonths, addYears, startOfWeek, addDays } from 'date-fns';
import { STRINGS, ARIALABELS } from 'consts';
import './Days.scss';

export default function Days({ currentDate: { currentDate, setCurrentDate }, selectDate: { selectedDate, setSelectedDate } }) {

  const getDays = (() => {
    let days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="week-days" key={i} id={`day-${i}`}>
          {format(addDays(startDate, i), STRINGS.DAY_FORMAT)}
        </div>
      );
    }
    return days;
  });

  return (
    <div className='days-container flex-container'>
      {getDays().map((day) => {
        return day;
      })}
    </div>
  );
}
