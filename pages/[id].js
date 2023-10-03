import ResumeSection from '@/components/ResumeSection';
import PesronalInfoSection from '@/components/PersonalInfoSection';
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
import ProjectSection from '@/components/ProjectSection';

const PDFViewerComponent = dynamic(
  () => import('@react-pdf/renderer').then((module) => module.PDFViewer),
  {
    loading: () => <p>Loading PDF Viewer...</p>,
    ssr: false, // This ensures that the component is not loaded on the server side
  }
);


export default function ResumeNew() {
  const [resumeData, setResumeData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get the id parameter from the URL
    const { id } = router.query;
    if (id === undefined) {
      // Query parameters are not available yet, do nothing.
      return;
    }
    // Check if id is defined and is a valid integer
    if (id && !isNaN(parseInt(id))) {
      // Parse id into an integer
      const resumeId = parseInt(id);


      // Make a request to your API endpoint with the parsed resumeId
      fetch(`/api/resumes/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Update state with the retrieved resume data
          setResumeData(data.resume);
        })
        .catch(error => {
          console.error('Error fetching resume data:', error);
          // Handle error, e.g., show an error message to the user or redirect to an error page
        });
    } else {
      console.error(`Invalid resume ID: ${resumeId}`);
      // Handle invalid or missing ID, e.g., redirect to an error page
    }
  }, [router.query]); // Call the async function inside useEffect

  useEffect(() => {
    // Reload MyDocument component whenever resumeData changes
  }, [resumeData]);

  return resumeData ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <ResumeSection />
          <PesronalInfoSection />
          <ProfileSection />
          <SkillsSection />
          <LanguageSection />
          <EducationSection />
          <ProjectSection />
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
  ) : null; // Return null if resumeData is not available yet
};
