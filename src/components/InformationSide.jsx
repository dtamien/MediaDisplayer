import React, { useEffect, useState } from 'react';
import TodayWidget from './TodayWidget';
import WeatherWidget from './WeatherWidget';
import QRCodeWidget from './QRCodeWidget';
import '../styles/InformationSide.css';

function InformationSide() {
  return (
    <div id="information-side">
      <TodayWidget />
      <WeatherWidget />
      <QRCodeWidget />
    </div>
  );
}

export default InformationSide;