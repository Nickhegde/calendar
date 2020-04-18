import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameDay, subMonths, addMonths, addDays, isAfter, isBefore, isToday } from 'date-fns';
import { STRINGS, ARIALABELS } from 'lib/consts';
import './Cells.scss';

export default function Cells({ currentDate: { currentDate, setCurrentDate }, selectDate: { selectedDate, setSelectedDate }, check: { blockPast, blockFuture }, monthCheck: { nextMonthCheck, prevMonthCheck } }) {

  const [toggleMonth, setToggleMonth] = useState(false);

  useEffect(() => {
    if (toggleMonth) {
      const newId = `day-${format(selectedDate, STRINGS.MONTH_FORMAT)}-${toggleMonth === STRINGS.PREV ? format(endOfMonth(selectedDate), STRINGS.DATE_FORMAT) : format(startOfMonth(selectedDate), STRINGS.DATE_FORMAT)}`;
      document.getElementById(newId).focus();
      setToggleMonth(false);
    } else if (format(selectedDate, STRINGS.COMPARE_DATE_FORMAT) === format(currentDate, STRINGS.COMPARE_DATE_FORMAT)) {
      const newId = `day-${format(selectedDate, STRINGS.MONTH_FORMAT)}-${format(selectedDate, STRINGS.DATE_FORMAT)}`;
      document.getElementById(newId).focus();
    }
  }, [toggleMonth, selectedDate, currentDate])


  const onDateClick = (cloneDay) => {
    setSelectedDate(cloneDay);
  }

  const onArrowKeyPress = (e) => {
    const key = e.keyCode,
      id = e.target.id,
      idArray = id.split('-');
    let nextId, element;
    switch (key) {
      case 37: nextId = Number(idArray[2]) - 1;
        break;
      case 38: nextId = Number(idArray[2]) - 7;
        break;
      case 39: nextId = Number(idArray[2]) + 1;
        break;
      case 40: nextId = Number(idArray[2]) + 7;
        break;
      default: return;
    }
    if (37 <= key <= 40) {
      element = document.getElementById(`${idArray[0]}-${idArray[1]}-${nextId}`);
      setFocusDate(element, nextId);
    }
  }

  const setFocusDate = (element, id) => {
    if (element) {
      if (element.classList.contains('disabled')) return;
      element.focus();
    } else {
      let newDate;
      if (id <= 1) {
        newDate = prevMonthCheck ? '' : endOfMonth(subMonths(selectedDate, 1));
        setToggleMonth(STRINGS.PREV);
      } else {
        newDate = nextMonthCheck ? '' : startOfMonth(addMonths(selectedDate, 1));
        setToggleMonth(STRINGS.NEXT);
      }
      if (newDate) {
        setSelectedDate(newDate);
      }
    }
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
        const disableFuture = blockFuture && isAfter(new Date(cloneDay), blockFuture) && !isToday(new Date(cloneDay)),
          disablePast = isBefore(new Date(cloneDay), blockPast) && !isToday(new Date(cloneDay));
        days.push(
          <button
            className={`day-cell ${disableFuture || disablePast
              ? 'disabled' : isSameDay(day, selectedDate)
                ? 'selected' : ''} ${format(selectedDate, STRINGS.COMPARE_DATE_FORMAT) === format(cloneDay, STRINGS.COMPARE_DATE_FORMAT) ? 'focus' : ''}
                ${format(currentDate, STRINGS.COMPARE_DATE_FORMAT) === format(cloneDay, STRINGS.COMPARE_DATE_FORMAT) ? 'highlight-date' : ''}
                `}
            key={day}
            id={`day-${format(day, STRINGS.MONTH_FORMAT)}-${formattedDate}`}
            onClick={disableFuture || disablePast ? () => { } : () => onDateClick(cloneDay)}
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
