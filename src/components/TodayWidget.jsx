import React, { useEffect, useState, useRef } from 'react';
import saints from '../assets/saints.json';
import { formatDate, formatTime } from '../utils';
import "../styles/TodayWidget.css";

function TodayWidget() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [saint, setSaint] = useState('');

  const dateTimeSaintRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const saintRef = useRef(null);

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

    const saintOfTheDay = saints[month][day] || '';
    setSaint(saintOfTheDay);
  }, [date]);

  useEffect(() => {
  const dateElement = dateRef.current;
  const timeElement = timeRef.current;
  const saintElement = saintRef.current;

  const dateElementStyles = window.getComputedStyle(dateElement);
  const timeElementStyles = window.getComputedStyle(timeElement);
  const saintElementStyles = window.getComputedStyle(saintElement);

  const dateElementFontSize = parseFloat(dateElementStyles.fontSize);
  const timeElementFontSize = parseFloat(timeElementStyles.fontSize);
  const saintElementFontSize = parseFloat(saintElementStyles.fontSize);

  const dateScaleFactor = 200 / dateElement.clientWidth;
  const timeScaleFactor = 200 / timeElement.clientWidth;
  const saintScaleFactor = 200 / saintElement.clientWidth;

  dateElement.style.fontSize = `${ dateElementFontSize * dateScaleFactor}px`;
  timeElement.style.fontSize = `${ timeElementFontSize * timeScaleFactor}px`;
  saintElement.style.fontSize = `${ saintElementFontSize * saintScaleFactor}px`;

}, [date, time, saint]);

  return (
    <div id='date-time-saint-widget' ref={dateTimeSaintRef}>
      <div id="date" ref={dateRef}>
        {formatDate(date)}
      </div>
      <div id="time" ref={timeRef}>
        {formatTime(time)}
      </div>
      <div id="saint" ref={saintRef}>
        {saint}
      </div>
    </div>
  );
}

export default TodayWidget;
