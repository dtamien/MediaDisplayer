import React, { useEffect } from 'react';
import fb_qrcode from '../assets/fb-qrcode.png';
import { maximizeFontSize } from '../utils';
import '../styles/QRCodeWidget.css';

function QRCodeWidget() {
  useEffect(() => {
    const handleLoad = () => {
      maximizeFontSize('qrcode-text');
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div id="qrcode-widget">
      <div id="qrcode-text">Suivez notre actualité ! </div>
      <img src={fb_qrcode} alt="https://www.facebook.com/utile.landeda/" />
    </div>
  );
}

export default QRCodeWidget;
