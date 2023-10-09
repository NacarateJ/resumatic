import React from 'react';

import HomepageImage from '../components/HomepageImage';

export default function Home() {
  return (
    <div
      id='homepage'
      style={{
        position: 'absolute',
        top: '49.5%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <HomepageImage />
    </div>
  );
}
