import React from 'react';

function MediaDisplay({ mediaFile }) {
  const fileExtension = mediaFile.split('.').pop().toLowerCase();
  const isImage = ['png', 'jpg', 'jpeg'].includes(fileExtension);
  const isVideo = ['mp4', 'mov'].includes(fileExtension);

  if (isImage) {
    return <img src={`media/${mediaFile}`} alt="Photo" />;
  } else if (isVideo) {
    return <video autoPlay loop src={`media/${mediaFile}`} />;
  } else {
    return <div>Unsupported media type</div>;
  }
}

export default MediaDisplay;
