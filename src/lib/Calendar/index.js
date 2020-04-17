import React, { useState } from 'react';
import { format, subYears } from 'date-fns';
import { Header, Days, Cells } from './components';
import { STRINGS, ARIALABELS } from 'lib/consts';
import './Calendar.scss';

export default function Calendar({ dates, themeColor, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date()),
    [selectedDate, setSelectedDate] = useState(new Date()),
    nextMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(currentDate, STRINGS.MONTH_YEAR_FORMAT),
    prevMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(subYears(currentDate, 1), STRINGS.MONTH_YEAR_FORMAT);
  console.log("date min", dates.min);

  return (
    <div className='calendar-container'>
      <Header currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }} check={{ nextMonthCheck, prevMonthCheck }}></Header>
      <Days currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }}></Days>
      <Cells currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }} check={{ nextMonthCheck, prevMonthCheck }}></Cells>
      <div className='calendar-triangle'></div>
    </div>
  );
}
