import ResumeSection from '@/components/ResumeSection';
import PersonalInfoSection from '@/components/PersonalInfoSection';
import ProfileSection from '@/components/ProfileSection';
import EducationSection from '@/components/EducationSection';
import LanguageSection from '@/components/LanguageSection';
import SkillsSection from '@/components/SkillsSection';
import dynamic from 'next/dynamic';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MyDocument from '@/components/MyDocument';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PDFViewerComponent = dynamic(
  () => import('@react-pdf/renderer').then((module) => module.PDFViewer),
  {
    loading: () => <p>Loading PDF Viewer...</p>,
    ssr: false,
  }
);

export default function ResumeNew() {
  const [resumeData, setResumeData] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (id === undefined) {
      // Query parameters are not available yet, do nothing.
      return;
    }
    if (id && !isNaN(parseInt(id))) {
      const parsedResumeId = parseInt(id);

      fetch(`/api/resumes/${parsedResumeId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setResumeId(parsedResumeId);
          setResumeData(data.resume);
        })
        .catch(error => {
          console.error('Error fetching resume data:', error);
        });
    } else {
      console.error(`Invalid resume ID: ${id}`);
      // Handle invalid or missing ID, e.g., redirect to an error page
    }
  }, [router.query]);

  useEffect(() => {
    // Reload MyDocument component whenever resumeData changes
  }, [resumeData]);



  return resumeData ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <ResumeSection resumeId={resumeId} />
          <PersonalInfoSection resumeId={resumeId} />
          <ProfileSection resumeId={resumeId} />
          <SkillsSection />
          <EducationSection />
          <LanguageSection />
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <PDFViewerComponent showToolbar={true}
            style={{
              width: '100%',
              height: '1000px',
            }}
          >
            <MyDocument resumeData={resumeData} />
          </PDFViewerComponent>
        </div>
      </div>
    </LocalizationProvider>
  ) : null;
}
