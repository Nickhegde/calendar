import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { STRINGS, ARIALABELS } from 'lib/consts';
import { LeftArrow, RightArrow } from 'lib/assets/images';
import './Header.scss'

export default function Header({ currentDate: { currentDate, setCurrentDate }, selectDate: { selectedDate, setSelectedDate }, check: { nextMonthCheck, prevMonthCheck } }) {


  const prevMonth = () => {
    setSelectedDate(endOfMonth(subMonths(selectedDate, 1)));
  }

  const nextMonth = () => {
    setSelectedDate(startOfMonth(addMonths(selectedDate, 1)));
  }

  const month = format(selectedDate, STRINGS.MONTH_YEAR_FORMAT);

  return (
    <div className='header-container flex-container'>
      <button className={`left-arrow ${prevMonthCheck ? 'disabled' : ''}`} onClick={prevMonthCheck ? () => { } : prevMonth} tabIndex='0' aria-label={ARIALABELS.PREV_MONTH_BTN}>
        <LeftArrow />
      </button>
      <div className='month-year-display' tabIndex='0' aria-label={month}>
        <span>{month}</span>
      </div>
      <button className={`right-arrow ${nextMonthCheck ? 'disabled' : ''}`} onClick={nextMonthCheck ? () => { } : nextMonth} tabIndex='0' aria-label={ARIALABELS.NEXT_MONTH_BTN}>
        <RightArrow />
      </button>
    </div>
  );
}
