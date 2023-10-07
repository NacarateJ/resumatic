import { View, Text } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

function WorkItem({ job }) {
  const bullets = Array.isArray(job.bullets)
    ? job.bullets.map((bullet) => <Bullet bullet={bullet} key={bullet.id} />)
    : [];

  return (
    <>
      <View style={{ ...commonStyles.workHeaderLine, fontWeight: 700 }}>
        <Text>{job.employer}</Text>
        {job.is_current ? (
          <Text>{job.start_date} - Present</Text>
        ) : (
          <Text>{job.start_date} - {job.end_date}</Text>
        )}
      </View>
      <View style={{ ...commonStyles.workHeaderLine, fontFamily: 'Times-Italic' }}>
        <Text>{job.job_title}</Text>
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
      <View style={commonStyles.heading}><Text>WORK EXPERIENCE</Text></View>
      {work_experience.map((job) => (
        <WorkItem job={job} key={job.experience_id} />
      ))}
    </View>
  );
}

export default PdfWork;
