import { Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles";

function SkillItem({ skill }) {
  return (
    <View style={commonStyles.normalTextLine}>
      <Text style={commonStyles.boldText}>{skill.skill_name}: </Text>
      <Text>{skill.skill_description}</Text>
    </View>
  );
}

function PdfSkills({ skills }) {
  const SkillsMap = skills.map((skill, index) => (
    <SkillItem skill={skill} key={index} />
  ));
  return (
    <View>
      <View style={{ ...commonStyles.heading, display: 'flex', flexDirection: 'row' }}>
        <Text>TECHNICAL SKILLS</Text>
      </View>
      {SkillsMap}
    </View>
  );
}

export default PdfSkills;
