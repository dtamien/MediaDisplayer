import React, { useState, useEffect } from 'react';
import { Image } from './Image';
// import { Video } from './Video';
import { fetchMediaInfos } from '../services/fetchMediaInfos';
import '../styles/MediaSide.css';

function MediaSide() {
  const [mediaInfos, setMediaInfos] = useState([]);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [media, setMedia] = useState("There is no media to display.");

  const handleMediaEnd = () => {
    console.log('Media ended');
    const nextIndex = (mediaIndex + 1) % mediaInfos.length;
    setMediaIndex(nextIndex);
    console.log('Next media index:', mediaIndex)
  };

  useEffect(() => {
    fetchMediaInfos()
      .then((data) => {
        setMediaInfos(data);
      })
      .catch((error) => {
        console.error('Error fetching media info:', error);
      });
  }, []);

  useEffect(() => {
    if (mediaInfos.length === 0) return;

    const currentMedia = mediaInfos[mediaIndex];
    console.log('Current media:', currentMedia);
    const isVideo = currentMedia.type === 'video';

    if ((mediaInfos.length === 1) && (isVideo)) {
      setMedia(
        <video autoPlay muted loop src={currentMedia.path} type="video/mp4" onEnded={handleMediaEnd} />
      );
    } else if (isVideo) {
      setMedia(
        <video autoPlay muted src={currentMedia.path} type="video/mp4" onEnded={handleMediaEnd} />
      );
    } else {
      setMedia(<Image media={currentMedia} />);
      const timeoutId = setTimeout(() => {
        handleMediaEnd();
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [mediaIndex, mediaInfos]);



  return <div id="media-side">{media}</div>;
}

export default MediaSide;