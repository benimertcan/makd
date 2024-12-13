// components/Gravatar.js
import React from 'react';
import md5 from 'md5';

const Gravatar = ({ email, size }) => {
  if (!email) {
    return null;
  }

  try {
    const hash = md5(email.trim().toLowerCase());
    const url = `https://www.gravatar.com/avatar/${hash}?s=${size}`;

    return <img src={url} alt="Gravatar" />;
  } catch (error) {
    console.error('Error generating Gravatar URL:', error);
    return null;
  }
};

export default Gravatar;