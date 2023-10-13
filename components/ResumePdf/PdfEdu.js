import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";

const styles = StyleSheet.create({
  linksLine: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    gap: 10,
    marginBottom: 10,
  },
  linkItem: {
    display: 'flex',
    flexDirection: 'row',
  },
});

function Education({ education }) {




  return (
    <>
      <View style={...commonStyles.workHeaderLine} >
        <Text>{education.school_name}</Text>
        {!education.end_date ? (
          <Text>{education.start_date} - Present</Text>
        ) : (
          <Text>{education.start_date} - {education.end_date}</Text>
        )}
      </View>
      <View style={{ ...commonStyles.workHeaderLine, fontFamily: 'Times-Italic' }}>
        {education.gpa ? (
          <Text>{education.degree} | GPA: {education.gpa}</Text>
        ) : (
          <Text>{education.degree}</Text>
        )}
        <Text>{education.city}, {education.country}</Text>
      </View>
      <View style={{ ...commonStyles.normalTextLine }}>
        <Text>{education.education_description}</Text>
      </View>
    </>
  );
}

function PdfEdu({ education }) {
  if (!education || education.length === 0) {
    return null; // If there are no languages, don't render anything
  }
  const eduItems = education.map((education, index) => (<Education education={education} key={index} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>EDUCATION</Text></View>
      {eduItems}
    </View>
  );
}

export default PdfEdu;
