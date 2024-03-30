import React, { useEffect } from 'react';
import fb_qrcode from '../assets/fb-qrcode.png';
import { maximiseFontSize } from '../utils';
import '../styles/QRCodeWidget.css';


function QRCodeWidget() {
  useEffect(() => {
    maximiseFontSize('qrcode-text');
  }
  , []);

  return (
    <div id="qrcode-widget">
      <div id="qrcode-text">Notre actualité ! </div>
      <img src={fb_qrcode} alt="https://www.facebook.com/utile.landeda/" />
    </div>
  );
}

export default QRCodeWidget;
