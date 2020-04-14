import React, { useState } from 'react';
import { format, addMonths, subMonths, addYears } from 'date-fns';
import { STRINGS, ARIALABELS } from 'consts';
import { LeftArrow, RightArrow } from 'assets/images';
import './Header.scss'

export default function Header({ currentDate: { currentDate, setCurrentDate }, selectDate: { selectedDate, setSelectedDate } }) {

  const nextMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === format(currentDate, STRINGS.MONTH_YEAR_FORMAT);
  const prevMonthCheck = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT) === STRINGS.PREV_MONTH_CHECK;

  const prevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  }

  const nextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  }

  return (
    <div className='header-container flex-container'>
      <button className={`left-arrow ${prevMonthCheck ? 'disabled' : ''}`} onClick={prevMonthCheck ? () => { } : prevMonth} tabIndex='0' aria-label={ARIALABELS.PREV_MONTH_BTN}>
        <LeftArrow />
      </button>
      <div className='month-year-display' tabIndex='0'>
        <span>{format(selectedDate, STRINGS.MONTH_YEAR_FORMAT)}</span>
      </div>
      <button className={`right-arrow ${nextMonthCheck ? 'disabled' : ''}`} onClick={nextMonthCheck ? () => { } : nextMonth} tabIndex='0' aria-label={ARIALABELS.NEXT_MONTH_BTN}>
        <RightArrow />
      </button>
    </div>
  );
}
