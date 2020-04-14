import React, { useState } from 'react';
import { Header, Days, Cells } from './components';
import './Calendar.scss';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date()),
    [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <div className='calendar-container'>
      <Header currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }}></Header>
      <Days currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }}></Days>
      <Cells currentDate={{ currentDate, setCurrentDate }} selectDate={{ selectedDate, setSelectedDate }}></Cells>
    </div>
  );
}
