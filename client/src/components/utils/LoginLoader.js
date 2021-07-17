import React from 'react';
import whiteBgLoader from '../../images/whiteBgLoader.gif';

const SubmitLoader = () => {
  return (
    <div style={{ margin: '2rem 0', textAlign: 'center' }}>
      <img src={whiteBgLoader} alt='loader' />
    </div>
  );
};

export default SubmitLoader;
