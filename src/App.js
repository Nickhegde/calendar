import React, { useState } from 'react';
import { Calendar } from './lib';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date()),
    min = '',
    max = '',
    blocked = [];
  console.log("min", min);
  return (
    <div className="App">
      <Calendar
        dates={{
          currentDate: date,
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
