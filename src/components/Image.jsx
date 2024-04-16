import React from 'react';

export const Image = ({ media }) => {
    return (
        <img src={media.path} alt="Image" />
    );
};