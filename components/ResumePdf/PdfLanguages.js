import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import commonStyles from './commonStyles';

const styles = StyleSheet.create({
  skillBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  },
  heading: {
    fontSize: 12,
    fontFamily: 'Times-BoldItalic',
    fontWeight: 700,
    borderBottom: '0.5 solid #000',
    marginBottom: 5,
  },
  skillLine: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 700,
  },
  subheading: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
  },
  skills: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
  },
});

function Language({ language }) {
  return (
    <View>
      <View style={styles.skillLine}>
        <Text style={styles.subheading}>{language.language_name}: </Text>
        <Text style={styles.skills}>{language.language_level}</Text>
      </View>
    </View>
  );
}

function PdfLang({ languages }) {
  if (!languages || languages.length === 0) {
    return null; // If there are no languages, don't render anything
  }

  const languageMap = languages.map((language, index) => <Language language={language} key={index} />);

  return (
    <View>
      <View style={commonStyles.heading}>
        <Text>LANGUAGES</Text>
      </View>
      {languageMap}
    </View>
  );
}

export default PdfLang;
