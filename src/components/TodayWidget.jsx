import React, { useEffect, useState } from 'react';
import saints from '../assets/saints.json';
import { maximiseFontSize, capitalizeFirstLetter } from '../utils';
import "../styles/TodayWidget.css";

function TodayWidget() {
  const [dateTime, setDateTime] = useState(new Date());
  const [saint, setSaint] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const formattedDate = `${(dateTime.getMonth() + 1).toString().padStart(2, '0')}-${dateTime.getDate().toString().padStart(2, '0')}`;
    const saintOfTheDay = saints[formattedDate] || 'Unknown Saint';
    setSaint(saintOfTheDay);
  }, [dateTime]);

  useEffect(() => {
    maximiseFontSize('date');
    maximiseFontSize('time');
    maximiseFontSize('saint');
  }, [dateTime, saint]);

  return (
    <div id='date-time-place-widget'>
      <div id="date">
        {capitalizeFirstLetter(dateTime.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' }))}
      </div>
      <div id="time">
        {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div id="saint">
        {saint}
      </div>
    </div>
  );
}

export default TodayWidget;
