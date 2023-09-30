import ResumeSection from '@/components/ResumeSection';
import PersonalInfoSection from '@/components/PersonalInfoSection';
import ProfileSection from '@/components/ProfileSection';
import React from 'react';
import dynamic from 'next/dynamic';

const PDFViewerComponent = dynamic(
  () => import('@react-pdf/renderer').then((module) => module.PDFViewer),
  {
    loading: () => <p>Loading PDF Viewer...</p>,
    ssr: false, // This ensures that the component is not loaded on the server side
  }
);
import MyDocument from '@/components/MyDocument';

export default function ResumeNew() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '10px' }}>
        <ResumeSection />
        <PersonalInfoSection />
        <ProfileSection />
      </div>

      <div style={{ width: '50%', padding: '10px' }}>
        <PDFViewerComponent
          style={{
            width: '100%',
            height: '1000px',
          }}
        >
          <MyDocument />
        </PDFViewerComponent>
      </div>
    </div>
  );
}
