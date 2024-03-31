import React, { useEffect, useState } from 'react';
import saints from '../assets/saints.json';
import { maximizeFontSize, formatDate, formatTime } from '../utils';
import "../styles/TodayWidget.css";

function TodayWidget() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [saint, setSaint] = useState('');

  useEffect(() => {
    maximizeFontSize('date');
  }, [date]);

  useEffect(() => {
    maximizeFontSize('time');
  }, [time]);

  useEffect(() => {
    const interval = setInterval(() => {
      const dateTime = new Date();

      if (dateTime.getSeconds() === 0) {
        setTime(dateTime);
      }

      if (dateTime.getHours() === 0 && dateTime.getMinutes() === 0) {
        setDate(dateTime);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const saintOfTheDay = saints[month][day] || 'Unknown Saint';
    setSaint(saintOfTheDay);
  }, [date]);

  return (
    <div id='date-time-place-widget'>
      <div id="date">
        {formatDate(date)}
      </div>
      <div id="time">
        {formatTime(time)}
      </div>
      {/* <div id="saint">
        {saint}
      </div> */}
    </div>
  );
}

export default TodayWidget;
