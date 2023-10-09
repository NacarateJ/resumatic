import { View, Text, StyleSheet } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

const styles = StyleSheet.create({
  workHeaderLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    fontSize: 12,
    fontFamily: 'Times-Italic'
  },
});

function WorkItem({ job }) {
  const bullets = Array.isArray(job.bullets)
    ? job.bullets.map((bullet) => <Bullet bullet={bullet} key={bullet.id} />)
    : [];



  return (
    <>
      <View style={{ ...commonStyles.workHeaderLine, fontWeight: 700 }}>
        <View style={{ display: 'flex', flexDirection: 'row', }}>
          <Text>{job.job_title} | </Text>
          <Text style={{ fontFamily: "Times-Italic" }} >{job.employer}</Text>
        </View>
        {job.is_current ? (
          <Text>{job.start_date} - Present</Text>
        ) : (
          <Text>{job.start_date} - {job.end_date}</Text>
        )}
      </View >
      <View style={styles.workHeaderLine}>
        <Text>{job.city}, {job.country}</Text>
      </View>

      <View style={commonStyles.normalTextLine}>
        <Text>{job.experience_description}</Text>
      </View>
    </>
  );
}

function PdfWork({ work_experience }) {
  if (!work_experience || work_experience.length === 0) {
    return null; // If there are no languages, don't render anything
  }
  const workItems = work_experience.map((work, index) => (
    <WorkItem work={work} key={index} />
  ));

  return (
    <View>
      <View style={commonStyles.heading}><Text>PROFESSIONAL EXPERIENCE</Text></View>
      {work_experience.map((job) => (
        <WorkItem job={job} key={job.experience_id} />
      ))}
    </View>
  );
}

export default PdfWork;
