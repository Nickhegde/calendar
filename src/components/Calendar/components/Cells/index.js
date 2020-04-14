import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameMonth, isSameDay, parse, addDays } from 'date-fns';
import { STRINGS, ARIALABELS } from 'consts';
import './Cells.scss'

export default function Cells({ currentDate: { currentDate, setCurrentDate }, selectDate: { selectedDate, setSelectedDate } }) {

  const [toggleDate, setToggleDate] = useState(selectedDate);

  const onDateClick = (cloneDay) => {
    setToggleDate(cloneDay);
    setSelectedDate(cloneDay);
  }

  const onArrowKeyPress = (e) => {
    const id = e.target.id,
      idArray = id.split('-'),
      nextId = Number(idArray[2]) + 1;
    document.getElementById(`${idArray[0]}-${idArray[1]}-${nextId}`).focus();
    console.log("e", e.keyCode);
    console.log("id", e.target.id);
  }

  const cells = (() => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, STRINGS.DATE_FORMAT);
        const cloneDay = day;
        days.push(
          <button
            className={`day-cell ${!isSameMonth(day, monthStart)
              ? 'disabled' : isSameDay(day, selectedDate)
                ? 'selected' : ''} ${format(selectedDate, STRINGS.COMPARE_DATE_FORMAT) === format(cloneDay, STRINGS.COMPARE_DATE_FORMAT) ? 'focus' : ''}`}
            key={day}
            id={`day-${format(day, STRINGS.MONTH_FORMAT)}-${formattedDate}`}
            onClick={!isSameMonth(day, monthStart) ? () => { } : () => onDateClick(cloneDay)}
            onKeyDown={(e) => { onArrowKeyPress(e) }}
          >
            <span className='date' id={`date-${formattedDate}`}>{formattedDate >= 10 ? formattedDate : `0${formattedDate}`}</span>
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className='week-row flex-container' key={day}> {days} </div>
      );
      days = [];
    }
    return rows;
  });

  return (
    <div className='cell-container'>
      {cells().map((week, index) => {
        return (
          week
        )
      })}
    </div>
  );
}
