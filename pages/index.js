import React from 'react';

import HomepageImage from '../components/HomepageImage';

export default function Home() {
  return (
    <div
      id='homepage'
      style={{
        position: 'static',
        top: '50%',
        left: '50%',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <HomepageImage />
    </div>
  );
}
