import React, { useState } from 'react';
import { Calendar } from './lib';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date()),
    min = '',
    max = '',
    blocked = [new Date('07/24/2021'), '07/26/2021'];
  return (
    <div className="App">
      <Calendar
        dates={{
          selectedDate: date,
          min: min,
          max: max,
          blocked: blocked
        }}
        themeColor=''
        onDateChange={setDate}
      ></Calendar>
    </div>
  );
}

export default App;
