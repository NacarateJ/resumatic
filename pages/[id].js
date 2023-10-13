import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import ResumeSection from '@/components/ResumeSection';
import PersonalInfoSection from '@/components/PersonalInfoSection';
import ProfileSection from '@/components/ProfileSection';
import ProjectSection from '@/components/ProjectSection';
import ProfessionalExperienceSection from '@/components/ProfessionalExperienceSection';
import EducationSection from '@/components/EducationSection';
import LanguageSection from '@/components/LanguageSection';
import SkillsSection from '@/components/SkillsSection';
import MyDocument from '@/components/MyDocument';
import PdfMenu from '@/components/ResumePdf/PdfMenu';

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
  const [dataFetch, setDataFetch] = useState(false);
  const router = useRouter();
  const [openAccordion, setOpenAccordion] = useState(null);
  const handleAccordionToggle = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : null);
  };

  const fetchResumeData = (resId) => {
    fetch(`/api/resumes/${resId}`) //
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setResumeId(resId);
        setResumeData(data.resume);
      })
      .catch((error) => {
        console.error('Error fetching resume data:', error);
      });
  };

  useEffect(() => {
    const { id } = router.query;
    if (id === undefined) {
      // Query parameters are not available yet, do nothing.
      return;
    }
    if (id && !isNaN(parseInt(id))) {
      const parsedResumeId = parseInt(id);

      fetchResumeData(parsedResumeId);
    } else {
      console.error(`Invalid resume ID: ${id}`);
      // Handle invalid or missing ID, e.g., redirect to an error page
    }
  }, [router.query]);

  return resumeData ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '2em' }}>
          <ResumeSection
            resumeData={resumeData}
            resumeId={resumeId}
            isOpen={openAccordion === 'resume'}
            onToggleAccordion={handleAccordionToggle('resume')}
          />
          <PersonalInfoSection
            resumeData={resumeData}
            fetchResumeData={fetchResumeData}
            resumeId={resumeId}
            isOpen={openAccordion === 'personalInfo'}
            onToggleAccordion={handleAccordionToggle('personalInfo')}
          />
          <ProfileSection
            resumeData={resumeData}
            fetchResumeData={fetchResumeData}
            resumeId={resumeId}
            isOpen={openAccordion === 'profile'}
            onToggleAccordion={handleAccordionToggle('profile')}
          />
          <SkillsSection
            resumeData={resumeData}
            fetchResumeData={fetchResumeData}
            resumeId={resumeId}
            isOpen={openAccordion === 'skills'}
            onToggleAccordion={handleAccordionToggle('skills')}
          />
          <ProfessionalExperienceSection
            resumeData={resumeData}
            fetchResumeData={fetchResumeData}
            resumeId={resumeId}
            isOpen={openAccordion === 'professionalExperience'}
            onToggleAccordion={handleAccordionToggle('professionalExperience')}
          />
          <EducationSection
            resumeData={resumeData}
            fetchResumeData={fetchResumeData}
            resumeId={resumeId}
            isOpen={openAccordion === 'education'}
            onToggleAccordion={handleAccordionToggle('education')}
          />
          <ProjectSection
            resumeData={resumeData}
            fetchResumeData={fetchResumeData}
            resumeId={resumeId}
            isOpen={openAccordion === 'project'}
            onToggleAccordion={handleAccordionToggle('project')}
          />
          <LanguageSection
            resumeData={resumeData}
            fetchResumeData={fetchResumeData}
            resumeId={resumeId}
            isOpen={openAccordion === 'language'}
            onToggleAccordion={handleAccordionToggle('language')}
          />
        </div>
        <div style={{ width: '50%', padding: '10px' }}>
          <PdfMenu resumeData={resumeData} />
          <PDFViewerComponent
            showToolbar={false}
            style={{
              width: '100%',
              height: '120vh',
            }}
          >
            <MyDocument
              resumeData={resumeData} />
          </PDFViewerComponent>
        </div>
      </div>
    </LocalizationProvider>
  ) : null;
}
