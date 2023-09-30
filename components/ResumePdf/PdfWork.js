import { View, Text } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

function WorkItem({ job }) {
  console.log("Rendering job:", job); // Log the work object when rendering WorkItem component

  const bullets = Array.isArray(job.bullets)
    ? job.experience_description.bullets.map((bullet) => <Bullet bullet={bullet} key={bullet.id} />)
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
      <View style={{ ...commonStyles.workHeaderLine, fontStyle: 'italic' }}>
        <Text>{job.job_title}</Text>
        <Text>{job.city}, {job.country}</Text>
      </View>
      <View style={commonStyles.bulletBlock}>{bullets}</View>
    </>
  );
}

function PdfWork({ work_experience }) {
  console.log("Rendering PdfWork with work_experience:", work_experience); // Log the work_experience object when rendering PdfWork component

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
