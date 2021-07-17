import React from 'react';
import customLoader from '../../images/customLoader.gif';

const SubmitLoader = () => {
  return (
    <div style={{ margin: '2rem 0', textAlign: 'center' }}>
      <img src={customLoader} alt='loader' />
    </div>
  );
};

export default SubmitLoader;
