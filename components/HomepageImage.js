import React from 'react';

export default function HomepageImage() {
  const localImage = '/homepage-image.png';
  
  return (
    <div className="w-full flex items-center justify-center bg-cover bg-center" 
    style={{ 
      backgroundImage: `url(${localImage})`,
      height: '600px' 
      
      }}>
      {/* Content inside the component */}
    </div>
  );
};
