import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import Header from './ResumePdf/PdfHeader';
import PdfSkills from './ResumePdf/PdfSkills';
import PdfWork from './ResumePdf/PdfWork';
import PdfEdu from './ResumePdf/PdfEdu';
import PdfProjects from './ResumePdf/PdfProjects';
import PdfLang from './ResumePdf/PdfLanguages';

// Create styles
const styles = StyleSheet.create({
  // Define styles for PDF elements using react-pdf
  page: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  summary: {
    fontSize: 12,
  }
});

// Create Document Component
const MyDocument = ({ resumeData }) => {
  if (resumeData === null) {
    return <p>Loading...</p>;
  }

  if (!resumeData) {
    return null;
  }

  return (
    <Document >
      <Page size="A4" style={styles.page}>
        <Header resumeData={resumeData} />
        {resumeData.profile_description && <View style={styles.summary}><Text>{resumeData.profile_description}</Text></View>}
        <PdfSkills skills={resumeData.skills} />
        <PdfWork work_experience={resumeData.work_experience} />
        <PdfEdu education={resumeData.education} />
        <PdfProjects projects={resumeData.projects} />
        <PdfLang languages={resumeData.languages} />
      </Page>
    </Document>
  );
};

export default MyDocument;
