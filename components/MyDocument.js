import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import Header from './ResumePdf/PdfHeader';
import PdfSkills from './ResumePdf/PdfSkills';
import PdfWork from './ResumePdf/PdfWork';
import PdfEdu from './ResumePdf/PdfEdu';
import PdfProjects from './ResumePdf/PdfProjects';
import PdfLang from './ResumePdf/PdfLanguages';
// import Garamond from '../public/fonts/cormorant-garamond-v16-latin-regular.ttf';
// import garamondItalic from '../public/fonts/cormorant-garamond-v16-latin-italic.ttf';
// import garamondBold from '../public/fonts/cormorant-garamond-v16-latin-700.ttf';



// Font.register({
//   family: 'Times-Roman',
//   fontStyle: "normal",
//   fontWeight: "normal",
//   fonts: [
//     { src: "Times-Roman" },
//     // { src: garamondItalic, fontStyle: 'italic' },
//     // { src: garamondBold, fontWeight: 700 },
//   ]
// });


// Create Document Component
const MyDocument = ({ resumeData }) => {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    // const loadFonts = async () => {
    //   await Font.register({
    //     family: 'Times-Roman',
    //     fontStyle: "normal",
    //     fontWeight: "normal",
    //     fonts: [
    //       { src: "Times-Roman" },
    //       { src: "Times-Italic" },
    //       { src: "Times-Bold" },
    //     ]
    //   });
    //   setFontsLoaded(true);
    // };

    // loadFonts();
  }, []);



  if (!resumeData) {
    return null;
  }

  // Create styles
  const styles = StyleSheet.create({
    // Define styles for PDF elements using react-pdf
    page: {
      padding: 30,
      display: 'flex',
      fontWeight: "bold",
      fontFamily: 'Times-Roman',
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
      fontWeight: 'Bold',
    },
    normal: {
      fontFamily: 'Times-Roman',
    },
    bold: {
      fontFamily: 'Times-Bold',
    },
    italic: {
      fontFamily: 'Times-Italic',
    },
  });


  return (
    <Document >
      <Page size="A4" style={styles.page} >
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
