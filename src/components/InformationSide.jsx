import React, { useEffect, useState, useRef } from 'react';
import TodayWidget from './TodayWidget';
import WeatherWidget from './WeatherWidget';
import QRCodeWidget from './QRCodeWidget';
import '../styles/InformationSide.css';

function InformationSide() {
  const informationSideRef = useRef(null);

  useEffect(() => {
    const informationSideElement = informationSideRef.current;
    informationSideElement.style.width = `250px`;
  }, []);

  return (
    <div id="information-side" ref={informationSideRef}>
      <TodayWidget />
      <WeatherWidget />
      <QRCodeWidget />
    </div>
  );
}

export default InformationSide;