import { StyleSheet } from "@react-pdf/renderer";

const commonStyles = StyleSheet.create({
  bulletBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2,
    marginBottom: 2,
  },
  heading: {
    fontSize: 12,
    borderBottom: '0.5 solid #000',
    marginBottom: 5,
  },
  workHeaderLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    fontFamily: "Times-BoldItalic"
  },
  subHeadingLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    fontFamily: "Times-Italix"
  },
  boldText: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
  },
  normalTextLine: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  link: {
    color: '#0a52cf',
  },
});

export default commonStyles;
