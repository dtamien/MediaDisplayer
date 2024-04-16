import React, { useEffect, useRef } from 'react';
import fb_qrcode from '../assets/fb-qrcode.png';
import '../styles/QRCodeWidget.css';

function QRCodeWidget() {
  const qrcodeTextRef = useRef(null);

  useEffect(() => {
    const qrcodeTextElement = qrcodeTextRef.current;
    const qrcodeTextElementStyles = window.getComputedStyle(qrcodeTextElement);
    const qrcodeTextElementFontSize = parseFloat(qrcodeTextElementStyles.fontSize);
    console.log(qrcodeTextElementFontSize)
    const qrcodeTextScaleFactor = 200 / qrcodeTextElement.clientWidth;
    qrcodeTextElement.style.fontSize = `${ qrcodeTextElementFontSize * qrcodeTextScaleFactor}px`;
  }, []);

  return (
    <div id="qrcode-widget">
      <div id="qrcode-text" ref={qrcodeTextRef}>
        Suivez notre actualité !</div>
      <img src={fb_qrcode} alt="https://www.facebook.com/utile.landeda/" />
    </div>
  );
}

export default QRCodeWidget;
