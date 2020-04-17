import React, { useState } from 'react';
import { format, subYears, isFuture } from 'date-fns';
import { Header, Days, Cells } from './components';
import { STRINGS, ARIALABELS } from 'lib/consts';
import './Calendar.scss';

export default function Calendar({ dates, themeColor, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date()),
    [selectedDate, setSelectedDate] = useState(dates.selectedDate);
  let nextMonthCheck, prevMonthCheck, blockPast, blockFuture;
  if (dates.min) {
    prevMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(new Date(dates.min), STRINGS.MONTH_YEAR_FORMAT);
    blockPast = new Date(dates.min);
  } else {
    prevMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(currentDate, STRINGS.MONTH_YEAR_FORMAT);
    blockPast = currentDate;
  }
  if (dates.max) {
    nextMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(new Date(dates.max), STRINGS.MONTH_YEAR_FORMAT);
    blockFuture = new Date(dates.max);
  } else {
    nextMonthCheck = false;
    blockFuture = '';
  }

  return (
    <div className='calendar-container'>
      <Header currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }} check={{ nextMonthCheck, prevMonthCheck }}></Header>
      <Days currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }}></Days>
      <Cells currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }} check={{ blockPast, blockFuture }} monthCheck={{ nextMonthCheck, prevMonthCheck }}></Cells>
      <div className='calendar-triangle'></div>
    </div>
  );
}
