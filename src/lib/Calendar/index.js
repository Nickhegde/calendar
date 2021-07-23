import React, { useState } from 'react';
import { format, startOfToday } from 'date-fns';
import { Header, Days, Cells } from './components';
import { STRINGS } from 'lib/consts';
import './Calendar.scss';

export default function Calendar({ dates, themeColor, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date()),
    [selectedDate, setSelectedDate] = useState(dates.selectedDate);
  let nextMonthCheck, prevMonthCheck, blockPast, blockFuture, blockDates;
  if (dates.min) {
    prevMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(new Date(dates.min), STRINGS.MONTH_YEAR_FORMAT);
    blockPast = new Date(dates.min);
  } else {
    prevMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(currentDate, STRINGS.MONTH_YEAR_FORMAT);
    blockPast = new Date(startOfToday());
  }
  if (dates.max) {
    nextMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(new Date(dates.max), STRINGS.MONTH_YEAR_FORMAT);
    blockFuture = new Date(dates.max);
  } else {
    nextMonthCheck = false;
    blockFuture = '';
  }

if(dates.blocked){
  blockDates = dates.blocked.map((d)=> {
    let date = new Date(d);
    return format(date, STRINGS.COMPARE_DATE_FORMAT);
    
  })
}

  return (
    <div className='calendar-container'>
      <Header currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }} check={{ nextMonthCheck, prevMonthCheck }} themeColor={themeColor}></Header>
      <Days currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }} themeColor={themeColor}></Days>
      <Cells currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }} check={{ blockPast, blockFuture, blockDates }} monthCheck={{ nextMonthCheck, prevMonthCheck }} themeColor={themeColor} onDateChange={onDateChange}></Cells>
      <div className='calendar-triangle'></div>
    </div>
  );
}
