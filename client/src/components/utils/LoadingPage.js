import React from 'react';
import loader from '../../images/loader.gif';

import '../../styles/LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className='loader'>
      <img src={loader} alt='loader' className='loaderImage' />
    </div>
  );
};

export default LoadingPage;
