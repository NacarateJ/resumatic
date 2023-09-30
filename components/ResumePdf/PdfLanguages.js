import { Text, View, StyleSheet } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";


const styles = StyleSheet.create({
  skillBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  },
  heading: {
    fontSize: 12,
    fontFamily: 'Garamond',
    fontWeight: 700,
    borderBottom: '0.5 solid #000',
    marginBottom: 5,
  },
  skillLine: {
    display: 'flex',
    flexDirection: 'row',
  },
  subheading: {
    fontSize: 12,
    fontWeight: 700,
  },
  skills: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row'
  },
  simpleSkills: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});

function Language({ language }) {
  return (
    <View>
      <View style={styles.skillLine}>
        <Text style={styles.subheading}>{language.language_name}</Text>
        <Text style={styles.skills}>: {language.language_level}</Text>
      </View>
    </View>
  );
}

function PdfLang({ languages }) {
  const languageMap = languages.map((language, index) => (<Language language={language} key={index} />));

  return (
    <View>
      <View style={commonStyles.heading}><Text>LANGUAGES</Text></View>
      {languageMap}
    </View>
  );
}


export default PdfLang;