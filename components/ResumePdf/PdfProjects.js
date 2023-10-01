import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";
import Bullet from "./Bullet";

const styles = StyleSheet.create({
  projectHeader: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 700,
  },
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

function Project({ project }) {
  // const bullets = project.bullets.map((bullet) => (<Bullet bullet={bullet} key={bullet.id} />));

  return (
    <>

      <View style={{ ...commonStyles.workHeaderLine, fontWeight: 700 }}>
        <View>
          <Text style={styles.projectTitle}>{project.project_title} </Text>
          <Text>- {project.project_subtitle}</Text>
        </View>
        {project.is_current ? (
          <Text>{project.start_date} - Present</Text>
        ) : (
          <Text>{project.start_date} - {project.end_date}</Text>
        )}
      </View>
      {project.project_description !== '' && <View style={styles.summary}><Text>{project.project_description}</Text></View>}
      {/* <View style={commonStyles.bulletBlock}>{bullets}</View> */}
      <View style={styles.linksLine}>
        <View style={styles.linkItem}>
          <Text>Code: </Text>
          <Link src={project.project_link}><Text style={commonStyles.link}>{project.project_title}</Text></Link>
        </View>
      </View>
    </>
  );
}

function PdfProjects({ projects }) {
  const projectsRenderer = projects.map((project, index) => (<Project project={project} key={index} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>PROJECTS</Text></View>
      {projectsRenderer}
    </View>
  );
}

export default PdfProjects;
