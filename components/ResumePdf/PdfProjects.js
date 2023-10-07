import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";

const styles = StyleSheet.create({
  projectHeader: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
  },
  projectTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold'
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
  return (
    <>
      <View style={{ ...commonStyles.workHeaderLine, fontFamily: "Times-BoldItalic" }}>
        <View>
          <Text style={styles.projectTitle}>{project.project_title} </Text>
          {project.project_subtitle && <Text style={{ fontFamily: 'Times-Italic' }}>- {project.project_subtitle}</Text>}
        </View>
        {project.is_current ? (
          <Text>{project.start_date} - Present</Text>
        ) : (
          <Text>{project.start_date} - {project.end_date}</Text>
        )}
      </View >
      {project.project_description !== '' && <View style={{ ...commonStyles.normalTextLine }}><Text>{project.project_description}</Text></View>}
      < View style={commonStyles.normalTextLine} >
        <View style={styles.linkItem}>
          <Text>Code: </Text>
          <Link src={project.project_link}><Text style={commonStyles.link}>{project.project_title}</Text></Link>
        </View>
      </View >
    </>
  );
}

function PdfProjects({ projects }) {
  if (!projects || projects.length === 0) {
    return null; // If there are no languages, don't render anything
  }
  const projectsRenderer = projects.map((project, index) => (<Project project={project} key={index} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>PROJECTS</Text></View>
      {projectsRenderer}
    </View>
  );
}

export default PdfProjects;
