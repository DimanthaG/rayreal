import React from 'react';
import logo from '../../assets/images/06.svg';

const Logo = () => {
  return (
    <img 
      src={logo} 
      alt="Ray Realty Logo" 
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'contain'
      }}
    />
  );
};

export default Logo; 