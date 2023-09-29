"use client";
// Import necessary components and styles from external files and libraries
import { Image, Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import commonStyles from "./commonStyles"; // Importing common styles from a separate file
import githubIcon from "../../assets/link-icons/github.png"; // Importing GitHub icon image
import linkedinIcon from "../../assets/link-icons/linkedin.png"; // Importing LinkedIn icon image
import mailIcon from "../../assets/link-icons/envelope-regular.png"; // Importing Mail icon image
import webIcon from "../../assets/link-icons/laptop-solid.png"; // Importing Web icon image



// Define styles for the components using StyleSheet.create() method
const styles = StyleSheet.create({
  // Styles for the header component
  header: {
    borderBottom: '0.5 solid #000', // Bottom border style
    paddingBottom: 3, // Spacing at the bottom
  },
  name: {
    fontSize: 24, // Font size for the name
    // fontFamily: 'Garamond', // Font family for the name
    fontWeight: 700, // Font weight for the name (bold)
  },
  title: {
    fontSize: '12px', // Font size for the title
  },
  // Styles for the links component
  links: {
    display: 'flex', // Display as a flex container
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'flex-start', // Align items to the start of the flex container
    gap: 20, // Spacing between items
    fontSize: '12px', // Font size for the links
  },
  // Styles for individual link items
  linksItem: {
    display: 'flex', // Display as a flex container
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items to the center vertically
    gap: 2, // Spacing between items
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
    <div>
      <View style={styles.links}>
        {email !== '' &&
          // Render email link with mail icon and email address
          <Link src={'mailto:' + email} style={styles.linksItem}>
            {/* <Image src={mailIcon} style={styles.icons} /> */}
            <Text style={commonStyles.link}>{email}</Text>
          </Link>}
        {website_link !== '' &&
          // Render web link with web icon and text
          <Link src={website_link} style={styles.linksItem}>
            {/* <Image src={webIcon} style={styles.icons} /> */}
            <Text style={commonStyles.link}>Portfolio</Text>
          </Link>}
        {linkedin_link !== '' &&
          // Render LinkedIn link with LinkedIn icon and text
          <Link src={linkedin_link} style={styles.linksItem}>
            {/* <Image src={linkedinIcon} style={styles.icons} /> */}
            <Text style={commonStyles.link}>LinkedIn</Text>
          </Link>}
        {github_link !== '' &&
          // Render GitHub link with GitHub icon and text
          <Link src={github_link} style={styles.linksItem}>
            {/* <Image src={githubIcon} style={styles.icons} /> */}
            <Text style={commonStyles.link}>Github</Text>
          </Link>}
      </View>
    </div>
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
  console.log("Header Component - resumeData:", resumeData);

  const isSecondLine = resumeData !== '' || resumeData.address !== '';
  console.log("Header Component - isSecondLine:", isSecondLine);

  const {
    resume_id,
    resume_title,
    resume_description,
    full_name,
    job_title,
    email,
    phone_number,
    address,
    website_link,
    linkedin_link,
    github_link
  } = resumeData;

  console.log("Header Component - full_name:", full_name);
  console.log("Header Component - address:", address);

  return (
    <View style={styles.header}>
      <View>
        {/* Display name and title */}
        <Text style={styles.name}>{full_name}</Text>
        <Text style={styles.title}>{job_title}</Text>
      </View>
      {isSecondLine && <HeaderSecondLine phone={phone_number} address={address} />}
      <Links email={email} website_link={website_link} linkedin_link={linkedin_link} github_link={github_link} />
    </View>
  );
}

// Export the Header component as the default export of this module
export default Header;
