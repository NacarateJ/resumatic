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

const resumeData = {
  "resume": {
    "resume_id": 2,
    "resume_title": "Frontend Developer Resume (Liz Erd)",
    "resume_description": "Passionate frontend developer with expertise in UI/UX design.",
    "full_name": "Liz Erd",
    "job_title": "Frontend Developer",
    "email": "liz@example.com",
    "profile_description": "Experienced software engineer with a passion for coding.",
    "phone_number": "987-654-3210",
    "address": "456 Elm St, Another City, Another Country",
    "website_link": "https://www.example.com/liz_erd",
    "linkedin_link": "https://www.linkedin.com/in/lizerd",
    "github_link": "https://github.com/lizerd",
    "created_at": "2023-09-27T01:54:55.345Z",
    "last_modified_at": "2023-09-27T01:54:55.345Z",
    "projects": [
      {
        "project_id": 2,
        "project_title": "Predictive Analytics",
        "project_subtitle": "Customer Churn Prediction",
        "project_description": "Developed a machine learning model to predict customer churn in a telecom company.",
        "start_date": "2022-02-10T00:00:00.000Z",
        "end_date": "2022-07-15T00:00:00.000Z",
        "project_link": "https://www.example.com/project3",
        "is_current": false,
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      },
      {
        "project_id": 2,
        "project_title": "Predictive Analytics",
        "project_subtitle": "Customer Churn Prediction",
        "project_description": "Developed a machine learning model to predict customer churn in a telecom company.",
        "start_date": "2022-02-10T00:00:00.000Z",
        "end_date": "2022-07-15T00:00:00.000Z",
        "project_link": "https://www.example.com/project3",
        "is_current": false,
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      }
    ],
    "education": [
      {
        "education_id": 2,
        "school_name": "Data Science Institute",
        "city": "Data Science City",
        "country": "Data Science Country",
        "degree": "Ph.D. in Machine Learning",
        "education_description": "Published several research papers.",
        "start_date": "2023-09-01T00:00:00.000Z",
        "end_date": "2027-05-31T00:00:00.000Z",
        "gpa": 4,
        "is_current": true,
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      },
      {
        "education_id": 2,
        "school_name": "Data Science Institute",
        "city": "Data Science City",
        "country": "Data Science Country",
        "degree": "Ph.D. in Machine Learning",
        "education_description": "Published several research papers.",
        "start_date": "2023-09-01T00:00:00.000Z",
        "end_date": "2027-05-31T00:00:00.000Z",
        "gpa": 4,
        "is_current": false,
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      }
    ],
    "skills": [
      {
        "skill_id": 3,
        "skill_name": "Python",
        "skill_description": null,
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      },
      {
        "skill_id": 3,
        "skill_name": "Languages",
        "skill_description": "Python, Ruby, Javascript",
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      },
      {
        "skill_id": 3,
        "skill_name": "Databases",
        "skill_description": "Postgresql, MongoDb",
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      }
    ],
    "work_experience": [
      {
        "experience_id": 2,
        "job_title": "Data Analyst",
        "employer": "Data Analytics Inc.",
        "city": "Analytics City",
        "country": "Analytics Country",
        "start_date": "2021-03-01T00:00:00.000Z",
        "end_date": "2021-12-31T00:00:00.000Z",
        "is_current": true,
        "experience_description": "Analyzed data and generated insights for clients.",
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      },
      {
        "experience_id": 2,
        "job_title": "Data Analyst",
        "employer": "Data Analytics Inc.",
        "city": "Analytics City",
        "country": "Analytics Country",
        "start_date": "2021-03-01T00:00:00.000Z",
        "end_date": "2021-12-31T00:00:00.000Z",
        "is_current": false,
        "experience_description": "Analyzed data and generated insights for clients.",
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      }
    ],
    "languages": [
      {
        "language_id": 2,
        "language_name": "French",
        "language_level": "Advanced",
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      },
      {
        "language_id": 2,
        "language_name": "French",
        "language_level": "Advanced",
        "last_modified_at": "2023-09-27T01:54:55.345Z"
      }
    ]
  }
};

// Create Document Component
const MyDocument = () => {
  console.log("MyDocument Component - Start");

  console.log("MyDocument Component - resumeData:", resumeData);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <Header resumeData={resumeData.resume} />
        {resumeData.resume.profile_description !== '' && <View style={styles.summary}><Text>{resumeData.resume.profile_description}</Text></View>}
        <PdfSkills skills={resumeData.resume.skills} />

        <PdfWork work_experience={resumeData.resume.work_experience} />
        <PdfEdu education={resumeData.resume.education} />
        <PdfProjects projects={resumeData.resume.projects} />
        <PdfLang languages={resumeData.resume.languages} />
      </Page>
    </Document>
  );
};



export default MyDocument;