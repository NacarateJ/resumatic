import EditResumeSection from '@/components/EditResumeSection';
import EditProfileSection from '@/components/EditProfileSection';;
import EducationSection from '@/components/EducationSection';
import React from "react";
import dynamic from 'next/dynamic';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const PDFViewerComponent = dynamic(() => import('@react-pdf/renderer').then(module => module.PDFViewer), {
  loading: () => <p>Loading PDF Viewer...</p>,
  ssr: false // This ensures that the component is not loaded on the server side
});
import MyDocument from '@/components/MyDocument';

export default function ResumeNew() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <EditResumeSection />
          <EditProfileSection />
          <EducationSection />
        </div>

        <div style={{ width: '50%', padding: '10px' }}>
          <PDFViewerComponent
            showToolbar={false}
            style={{
              width: "100%",
              height: "180%"
            }}
          >
            <MyDocument />
          </PDFViewerComponent>
        </div>
      </div>
    </LocalizationProvider>
  );
}
