// Import necessary components and styles from external files and libraries
import { Image, Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles"; // Importing common styles from a separate file

// Define styles for the components using StyleSheet.create() method
const styles = StyleSheet.create({
  // Styles for the header component
  header: {
    borderBottom: '1 solid #000', // Bottom border style
    paddingBottom: 3, // Spacing at the bottom
  },
  name: {
    fontSize: 24, // Font size for the name
    fontWeight: 700, // Font weight for the name (bold)
    paddingBottom: 1,
  },
  title: {
    fontSize: 12, // Font size for the title
    paddingBottom: 1,
  },
  // Styles for the links component
  links: {
    display: 'flex', // Display as a flex container
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'flex-start', // Align items to the start of the flex container
    gap: 20, // Spacing between items
    fontSize: 12, // Font size for the links
    paddingBottom: 2,
    fontFamily: "Times-Roman",
  },
  // Styles for individual link items
  linksItem: {
    display: 'flex', // Display as a flex container
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items to the center vertically
    gap: 4, // Spacing between items
    fontFamily: "Times-Roman",
  },
  // Styles for icons used in links
  icons: {
    color: '#0a52cf', // Icon color
    height: 10, // Icon height
    width: 10, // Icon width

  }
});

// Links component that displays email and social media links
function Links({ email, website_link, linkedin_link, github_link }) {

  return (
    <View>

      <View style={styles.links}>
        {email && email !== '' &&
          // Render email link with mail icon and email address
          <Link src={'mailto:' + email} style={styles.linksItem}>
            <Image src='/images/envelope-regular.png' style={styles.icons} />
            <Text style={commonStyles.link}>{email}</Text>
          </Link>
        }
        {website_link && website_link !== '' &&
          // Render web link with web icon and text
          <Link src={website_link} style={styles.linksItem}>
            <Image src='/images/laptop-solid.png' style={styles.icons} />
            <Text style={commonStyles.link}>Portfolio</Text>
          </Link>}
        {linkedin_link && linkedin_link !== '' &&
          // Render LinkedIn link with LinkedIn icon and text
          <Link src={linkedin_link} style={styles.linksItem}>
            <Image src='/images/linkedin.png' style={styles.icons} />
            <Text style={commonStyles.link}>LinkedIn</Text>
          </Link>}
        {github_link && github_link !== '' &&
          // Render GitHub link with GitHub icon and text
          <Link src={github_link} style={styles.linksItem}>
            <Image src='/images/github.png' style={styles.icons} />
            <Text style={commonStyles.link}>Github</Text>
          </Link>}
      </View>
    </View>
  );
}

// Component for the second line of the header displaying phone number and address
function HeaderSecondLine({ phone_number, address }) {
  return (
    <View style={styles.links}>
      <Text>{phone_number}</Text>
      <Text>{address}</Text>
    </View>
  );
}

// Header component that displays personal information and links
function Header({ resumeData }) {
  if (!resumeData || !resumeData.resume_title && !resumeData.full_name) {
    return null; // If there are no languages, don't render anything
  }

  const isSecondLine = resumeData !== '' || resumeData.address !== '';
  const {
    full_name,
    job_title,
    email,
    phone_number,
    address,
    website_link,
    linkedin_link,
    github_link
  } = resumeData;
  return (
    <View style={styles.header}>
      <View>
        {/* Display name and title */}
        <Text style={styles.name}>{full_name}</Text>
        <Text style={styles.title}>{job_title}</Text>
      </View>
      {isSecondLine && <HeaderSecondLine phone_number={phone_number} address={address} />}
      <Links email={email} website_link={website_link} linkedin_link={linkedin_link} github_link={github_link} />
    </View>
  );
}

// Export the Header component as the default export of this module
export default Header;
