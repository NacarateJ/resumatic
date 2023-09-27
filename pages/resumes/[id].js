import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function ResumePage() {
  // Initialize the Next.js router
  const router = useRouter();
  // Extract the 'id' from the router query parameters
  const { id } = router.query;

  // Initialize state variables to manage resume data, loading state, and errors
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the useEffect hook to fetch resume data when the 'id' changes
  useEffect(() => {
    if (id) {
      // Fetch resume data from the API endpoint based on the 'id'
      fetch(`/api/resumes/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch resume data');
          }
          return response.json();
        })
        .then((data) => {
          // Set the retrieved resume data in the state
          setResumeData(data.resume);
          // Update the loading state to indicate that data loading is complete
          setLoading(false);
        })
        .catch((err) => {
          // Handle any errors that occur during data fetching
          setError(err.message);
          // Update the loading state to indicate that data loading is complete
          setLoading(false);
        });
    }
  }, [id]);

  // If data is still loading, display a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If there is an error, display an error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  // If no resume data is found, display a message indicating it was not found
  if (!resumeData) {
    return <p>Resume not found</p>;
  }

  // Destructure resumeData object to access its properties
  const {
    resume_title,
    resume_description,
    full_name,
    job_title,
    email,
    profile_description,
    phone_number,
    address,
    website_link,
    linkedin_link,
    github_link,
    projects,
    education,
    skills,
    work_experience,
    languages,
  } = resumeData;

  return (
    <div>
      <h1>{resume_title}</h1>
      <p>{resume_description}</p>

      <h2>Personal Information</h2>
      <p>Name: {full_name}</p>
      <p>Job Title: {job_title}</p>
      <p>Email: {email}</p>
      <p>Phone Number: {phone_number}</p>
      <p>Address: {address}</p>
      <p>
        Website: <a href={website_link}>{website_link}</a>
      </p>
      <p>
        LinkedIn: <a href={linkedin_link}>{linkedin_link}</a>
      </p>
      <p>
        GitHub: <a href={github_link}>{github_link}</a>
      </p>

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.project_id}>
            <h3>{project.project_title}</h3>
            <p>{project.project_description}</p>
          </li>
        ))}
      </ul>

      <h2>Education</h2>
      <ul>
        {education.map((edu) => (
          <li key={edu.education_id}>
            <h3>{edu.school_name}</h3>
            <p>{edu.degree}</p>
            <p>City: {edu.city}</p>
            <p>Country: {edu.country}</p>
            {/* Include other education fields as needed */}
          </li>
        ))}
      </ul>

      <h2>Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.skill_id}>
            <h3>{skill.skill_name}</h3>
            {/* Include skill_description or additional information if available */}
          </li>
        ))}
      </ul>

      <h2>Work Experience</h2>
      <ul>
        {work_experience.map((exp) => (
          <li key={exp.experience_id}>
            <h3>{exp.job_title}</h3>
            <p>{exp.employer}</p>
            <p>City: {exp.city}</p>
            <p>Country: {exp.country}</p>
            {/* Include other work experience fields as needed */}
          </li>
        ))}
      </ul>

      <h2>Languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang.language_id}>
            <h3>{lang.language_name}</h3>
            <p>Level: {lang.language_level}</p>
            {/* Include other language fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResumePage;
