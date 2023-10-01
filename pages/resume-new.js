import ResumeSection from '@/components/ResumeSection';
import PesronalInfoSection from '@/components/PersonalInfoSection';
import EducationSection from '@/components/EducationSection';
import React from 'react';
import dynamic from 'next/dynamic';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const PDFViewerComponent = dynamic(
  () => import('@react-pdf/renderer').then((module) => module.PDFViewer),
  {
    loading: () => <p>Loading PDF Viewer...</p>,
    ssr: false, // This ensures that the component is not loaded on the server side
  }
);
import MyDocument from '@/components/MyDocument';
import LanguageSection from '@/components/LanguageSection';

export default function ResumeNew() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <ResumeSection />
          <PesronalInfoSection />
          <EducationSection />
          <LanguageSection />
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

    </LocalizationProvider >
  );
}
