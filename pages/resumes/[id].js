
import React from 'react';
import dynamic from 'next/dynamic';
const PDFViewerComponent = dynamic(() => import('@react-pdf/renderer').then(module => module.PDFViewer), {
  loading: () => <p>Loading PDF Viewer...</p>,
  ssr: false // This ensures that the component is not loaded on the server side
});
import MyDocument from '@/components/MyDocument';
const index = () => {
  return (
    <PDFViewerComponent
      style={{
        width: "100%",
        height: "1000px"
      }}
    >
      <MyDocument />
    </PDFViewerComponent>
  );
};

export default index;
