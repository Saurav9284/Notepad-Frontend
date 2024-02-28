import React from 'react';
import loader from '../Assests/loader.gif'

// loading indicator

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <img src={loader} alt='Loading' style={{ textAlign: 'center', margin: 'auto', alignItems: 'center' }} width={100}/>
    </div>
  );
};

export default Loading;
