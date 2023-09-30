import { Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

function Education({ education }) {
  // const bullets = education.bullets.map((bullet) => (<Bullet bullet={bullet} key={bullet.id} />));

  return (
    <>
      <View style={{ ...commonStyles.workHeaderLine, fontWeight: 700 }}>
        <Text>{education.school_name}</Text>
        {education.is_current ? (
          <Text>{education.start_date} - Present</Text>
        ) : (
          <Text>{education.start_date} - {education.end_date}</Text>
        )}
      </View>
      <View style={{ ...commonStyles.workHeaderLine, fontStyle: 'italic' }}>
        {education.gpa ? (
          <Text>{education.degree} GPA: {education.gpa}</Text>
        ) : (
          <Text>{education.degree}</Text>
        )}
        <Text>{education.city}, {education.country}</Text>
      </View>
      <View style={commonStyles.bulletBlock}>
        <Text>{education.education_description}</Text>
      </View>
    </>
  );
}

function PdfEdu({ education }) {
  const eduItems = education.map((education, index) => (<Education education={education} key={index} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>EDUCATION</Text></View>
      {eduItems}
    </View>
  );
}

export default PdfEdu;
