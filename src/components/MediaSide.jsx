import React, { useState, useEffect, useRef } from 'react';
import { fetchMedia } from '../services/fetchMedia';
import '../styles/MediaSide.css';

function MediaSide() {
  const [mediaList, setMediaList] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const currentMedia = mediaList[currentMediaIndex];
  const videoExtensions = ['.mp4', '.mov'];
  const photoExtensions = ['.jpg', '.jpeg', '.png'];
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 'auto', height: 'auto' });
  const mediaRef = useRef(null);

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setCurrentMediaIndex(prevIndex => (prevIndex + 1) % mediaList.length);
  };

  useEffect(() => {
    fetchMedia()
      .then(mediaList => {
        setMediaList(mediaList);
      })
      .catch(error => {
        console.error('Error fetching media:', error);
      });
  }, []);

  useEffect(() => {
    if (!isVideoPlaying) {
      const interval = setInterval(() => {
        setCurrentMediaIndex(prevIndex => (prevIndex + 1) % mediaList.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [currentMediaIndex, mediaList, isVideoPlaying]);

  useEffect(() => {
    if (currentMedia && videoExtensions.some(ext => currentMedia.endsWith(ext))) {
      setIsVideoPlaying(true);
    } else {
      setIsVideoPlaying(false);
    }
  }, [currentMediaIndex]);

  useEffect(() => {
    if (mediaRef.current) {
      const media = mediaRef.current;
      if (media instanceof HTMLImageElement) {
        const img = new Image();
        img.src = media.src;
        img.onload = () => {
          const { width, height } = img;
          if (width > height) {
            setDimensions({ width: '100%', height: 'auto' });
          } else {
            setDimensions({ width: 'auto', height: '100%' });
          }
        };
      } else if (media instanceof HTMLVideoElement) {
        media.onloadedmetadata = () => {
          const { videoWidth, videoHeight } = media;
          if (videoWidth > videoHeight) {
            setDimensions({ width: '100%', height: 'auto' });
          } else {
            setDimensions({ width: 'auto', height: '100%' });
          }
        };
      }
    }
  }, [mediaRef.current]);

  return (
    <div id="media-side">
      {currentMedia && (
        isVideoPlaying ? (
          <video
            autoPlay
            muted
            onEnded={handleVideoEnded}
            ref={mediaRef}
            style={dimensions}
          >
            <source src={`/media/${currentMedia}`} type="video/mp4" />
            <source src={`/media/${currentMedia}`} type="video/mov" />
            Your browser does not support the video tag.
          </video>
        ) : (photoExtensions.some(ext => currentMedia.endsWith(ext)) ? (
          <img
            src={`/media/${currentMedia}`}
            alt={`Media ${currentMediaIndex}`}
            ref={mediaRef}
            style={dimensions}
          />
        ) : (
          <p>Unsupported media type</p>
        ))
      )}
    </div>
  );
}

export default MediaSide;