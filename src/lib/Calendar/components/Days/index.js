import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { STRINGS, ARIALABELS } from 'lib/consts';
import './Days.scss';

export default function Days({ currentDate: { currentDate, setCurrentDate }, selectDate: { selectedDate, setSelectedDate }, themeColor = { themeColor } }) {

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
    <div className='days-container flex-container' style={{ backgroundColor: themeColor }}>
      {getDays().map((day) => {
        return day;
      })}
    </div>
  );
}
