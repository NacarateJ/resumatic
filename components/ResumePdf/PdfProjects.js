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
  projectHeaderLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,

    // fontFamily: "Times-Roman"
  },
  normalTextLine: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
});

function Project({ project }) {
  return (
    <>
      <View style={styles.projectHeaderLine}>
        <View>
          <Link src={project.project_link}><Text style={commonStyles.link}>{project.project_title}</Text></Link>
          {project.project_subtitle && <Text style={{ fontFamily: 'Times-Italic' }}>- {project.project_subtitle}</Text>}
        </View>
        {!project.end_date ? (
          <Text style={{ fontFamily: "Times-BoldItalic" }} >{project.start_date} - Present</Text>
        ) : (
          <Text style={{ fontFamily: "Times-BoldItalic" }} >{project.start_date} - {project.end_date}</Text>
        )}
      </View >
      {project.project_description !== '' && <View style={styles.normalTextLine}><Text>{project.project_description}</Text></View>}
      {/* < View style={commonStyles.normalTextLine} >
        <View style={styles.linkItem}>
          <Text>Code: </Text>
          <Link src={project.project_link}><Text style={commonStyles.link}>{project.project_title}</Text></Link>
        </View>
      </View > */}
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
