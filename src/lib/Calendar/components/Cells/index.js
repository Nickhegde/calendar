import React, {  useEffect } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameDay, addDays, isAfter, isBefore, subDays, isSameMonth } from 'date-fns';
import { STRINGS } from 'lib/consts';
import './Cells.scss';

export default function Cells({ currentDate: { currentDate }, selectDate: { selectedDate, setSelectedDate }, check: { blockPast, blockFuture, blockDates }, monthCheck: { nextMonthCheck, prevMonthCheck }, themeColor, onDateChange }) {

  useEffect(() => {
    const newId = `day-${format(selectedDate, STRINGS.MONTH_FORMAT)}-${format(selectedDate, STRINGS.DATE_FORMAT)}`;
    document.getElementById(newId).focus();
  }, [selectedDate, currentDate])


  const onDateClick = (cloneDay) => {
    setSelectedDate(cloneDay);
    onDateChange(cloneDay);
  }

  const onArrowKeyPress = (e, date) => {
    const key = e.keyCode,
      id = e.target.id,
      idArray = id.split('-');
    let nextId, element, newDate;
    switch (key) {
      case 9: e.preventDefault(); return;
      case 37: newDate = subDays(selectedDate, 1);
        if (!isSameMonth(newDate, selectedDate) && prevMonthCheck) return;
        nextId = Number(idArray[2]) - 1;
        break;
      case 38: newDate = subDays(selectedDate, 7);
        if (!isSameMonth(newDate, selectedDate) && prevMonthCheck) return;
        nextId = Number(idArray[2]) - 7;
        break;
      case 39: newDate = addDays(selectedDate, 1);
        if (!isSameMonth(newDate, selectedDate) && nextMonthCheck) return;
        nextId = Number(idArray[2]) + 1;
        break;
      case 40: newDate = addDays(selectedDate, 7);
        if (!isSameMonth(newDate, selectedDate) && nextMonthCheck) return;
        nextId = Number(idArray[2]) + 7;
        break;
      default: return;
    }
    if (37 <= key <= 40) {
      element = document.getElementById(`${idArray[0]}-${idArray[1]}-${nextId}`);
      if (element && element.classList.contains('disabled')) return;
      setSelectedDate(newDate);
    }
  }

 const checkDisableDate = (blockFuture, blockPast, date)=>{
  const disableFuture = blockFuture && isAfter(new Date(date), blockFuture),
   disablePast = blockPast && isBefore(new Date(date), blockPast),
   dateSelected = new Date(date);
  const disableDate =  blockDates.includes(format(dateSelected, STRINGS.COMPARE_DATE_FORMAT));
  return (disableFuture || disablePast || disableDate);
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
        const disableDate = checkDisableDate(blockFuture, blockPast,cloneDay);
        
        days.push(
          <button
            className={`day-cell ${disableDate
              ? 'disabled' : isSameDay(day, selectedDate)
                ? 'selected' : ''} ${format(selectedDate, STRINGS.COMPARE_DATE_FORMAT) === format(cloneDay, STRINGS.COMPARE_DATE_FORMAT) ? 'focus' : ''}
                ${format(currentDate, STRINGS.COMPARE_DATE_FORMAT) === format(cloneDay, STRINGS.COMPARE_DATE_FORMAT) ? 'highlight-date' : ''}
                `}
            style={{ backgroundColor: `${format(selectedDate, STRINGS.COMPARE_DATE_FORMAT) === format(cloneDay, STRINGS.COMPARE_DATE_FORMAT) ? themeColor : ''}` }}
            key={day}
            id={`day-${format(day, STRINGS.MONTH_FORMAT)}-${formattedDate}`}
            onClick={disableDate ? () => { } : () => onDateClick(cloneDay)}
            onKeyDown={(e, cloneDay) => { onArrowKeyPress(e, cloneDay) }}
            aria-label={format(day, STRINGS.ARIA_LABEL_DATE_FORMAT)}
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
    <div className='cell-container' tabIndex='0' role='application'>
      {cells().map((week, index) => {
        return (
          week
        )
      })}
    </div>
  );
}
