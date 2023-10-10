const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedDatabase = async () => {
  try {
    const usersData = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'hashed_password1',
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        password: 'hashed_password2',
      },
      {
        first_name: 'Liz',
        last_name: 'Erd',
        email: 'liz@example.com',
        password: 'hashed_password3',
      },
      {
        first_name: 'Peter',
        last_name: 'Yew',
        email: 'peter@example.com',
        password: 'hashed_password4',
      },
    ];

    const resumesData = [
      {
        resume_title: 'Software Engineer Resume',
        resume_description: 'Experienced software engineer with a strong background in web development.',
        full_name: 'John Doe',
        email: 'john@example.com',
        job_title: 'Software Engineer',
        phone_number: '123-456-7890',
        address: '123 Main St, City, Country',
        website_link: 'https://www.example.com/john_doe',
        linkedin_link: 'https://www.linkedin.com/in/johndoe',
        github_link: 'https://github.com/johndoe',
        profile_description: 'Experienced software engineer with a passion for coding.',
        user_id: 1, // Use the ID of the corresponding user
      },
      {
        resume_title: 'Shopify Application',
        resume_description: 'Back End Web Developer.',
        full_name: 'Liz Erd',
        email: 'liz@google.com',
        job_title: 'Data Scientist',
        phone_number: '987-654-3210',
        address: 'Toronto, Onatio',
        website_link: 'https://www.example.com/liz_erd',
        linkedin_link: 'https://www.linkedin.com/in/lizerd',
        github_link: 'https://github.com/lizerd',
        profile_description: 'I am a versatile professional with a passion for both data science and web development. As a data scientist, I have a strong background in machine learning algorithms and statistical analysis, enabling me to extract meaningful insights from complex data sets. On the web development front, I am proficient in HTML, CSS, JavaScript, and various web frameworks. I have a keen eye for design and usability, allowing me to create visually appealing and user-friendly websites.',
        user_id: 3, // Use the ID of the corresponding user
      },
      {
        resume_title: 'Google Application',
        resume_description: 'Front End Web Developer',
        full_name: 'Liz Erd',
        email: 'liz.erd@google.com',
        job_title: 'Data Scientist and Web Developer',
        phone_number: '555-123-4567',
        address: 'Toronto, Ontario',
        website_link: 'https://www.lizerd-data.com',
        linkedin_link: 'https://www.linkedin.com/in/lizerd',
        github_link: 'https://github.com/lizerd',
        profile_description: 'I am a versatile professional with a passion for both data science and web development. As a data scientist, I have a strong background in machine learning algorithms and statistical analysis, enabling me to extract meaningful insights from complex data sets. On the web development front, I am proficient in HTML, CSS, JavaScript, and various web frameworks. I have a keen eye for design and usability, allowing me to create visually appealing and user-friendly websites.',
        user_id: 3, // Use the ID of the corresponding user
      },
      {
        resume_title: 'Netflix Application',
        resume_description: 'Full-Stack Web Developer.',
        full_name: 'Liz Erd',
        email: 'liz@google.com',
        job_title: 'Full Stack Web Developer',
        phone_number: '987-654-3210',
        address: 'Toronto, Onatio',
        website_link: 'https://www.example.com/liz_erd',
        linkedin_link: 'https://www.linkedin.com/in/lizerd',
        github_link: 'https://github.com/lizerd',
        profile_description: 'I am a versatile professional with a passion for both data science and web development. As a data scientist, I have a strong background in machine learning algorithms and statistical analysis, enabling me to extract meaningful insights from complex data sets. On the web development front, I am proficient in HTML, CSS, JavaScript, and various web frameworks. I have a keen eye for design and usability, allowing me to create visually appealing and user-friendly websites.',
        user_id: 3, // Use the ID of the corresponding user
      },
    ];

    const projectsData = [
      {
        project_title: 'Web Application Development',
        project_description: 'Developed a full-fledged e-commerce platform using React and Node.js.',
        start_date: 'February, 2020',
        end_date: 'February, 2020',
        project_link: 'https://www.example.com/project1',
        is_current: false,
        resume_id: 1,
      },
      {
        project_title: 'Responsive Web Design',
        project_description: 'Designed and built a responsive portfolio website using HTML and CSS.',
        start_date: 'February, 2020',
        end_date: 'February, 2020',
        project_link: 'https://www.example.com/project2',
        is_current: false,
        resume_id: 2,
      },
      {
        project_title: 'Predictive Analytics',
        project_description: '- Conducted in-depth exploratory data analysis to identify key factors influencing customer churn.\n- Engineered customer behavior metrics, enabling the model to capture nuanced patterns in user interactions.\n- Implemented A/B testing strategies based on model predictions, leading to a 15% increase in customer engagement during promotional campaigns.',
        start_date: 'September, 2018',
        end_date: 'February, 2020',
        project_link: 'https://www.example.com/project3',
        is_current: false,
        resume_id: 3,
      },
      {
        project_title: 'Web Scraper',
        project_description: '- Developed a custom web scraping algorithm that efficiently collected lawyer profiles from various websites.\n- Implemented a real-time data validation system to ensure accuracy in lawyer information.\n- Utilized sentiment analysis to assess lawyer reviews and ratings, enhancing the quality of recommendations in the legal directory.',
        start_date: 'June, 2011',
        end_date: 'January, 2015',
        project_link: 'https://www.example.com/project2',
        is_current: false,
        resume_id: 3,
      }
    ];
    const educationData = [
      {
        school_name: 'University of Example',
        city: 'Example City',
        country: 'Example Country',
        degree: 'Bachelor of Science in Computer Science',
        education_description: 'Graduated with honors.',
        start_date: 'February, 2020',
        end_date: 'February, 2020',
        gpa: 3.8,
        is_current: false,
        resume_id: 1,
      },
      {
        school_name: 'Tech University',
        city: 'Tech City',
        country: 'Tech Country',
        degree: 'Master of Science in Web Development',
        education_description: 'Specialized in front-end development.',
        start_date: 'February, 2020',
        end_date: 'February, 2020',
        gpa: 4.0,
        is_current: false,
        resume_id: 2,
      },
      {
        school_name: 'LightHouse Labs',
        city: 'Toronto',
        country: 'Canada',
        degree: 'Diploma',
        start_date: 'March, 2023',
        end_date: 'October, 2023',
        gpa: 4.0,
        is_current: false,
        resume_id: 3,
      },
    ];

    const skillsData = [
      {
        skill_name: 'JavaScript',
        resume_id: 1,
      },
      {
        skill_name: 'React',
        resume_id: 1,
      },
      {
        skill_name: 'HTML/CSS',
        resume_id: 2,
      },
      {
        skill_name: 'Python, Javascript, Ruby',
        skill_description: "Programming Languages",
        resume_id: 3,
      },
      {
        skill_name: 'Express, React, PostgreSQL',
        skill_description: "Frameworks, Libraries & Databases Description",
        resume_id: 3,
      },
      {
        skill_name: 'Github, Sublime Text, Figma',
        skill_description: "Tools & Other Technologies",
        resume_id: 3,
      },
    ];
    const workExperienceData = [
      {
        job_title: 'Software Engineer Intern',
        employer: 'Google Inc.',
        city: 'Toronto',
        country: 'Canada',
        start_date: 'February, 2018',
        end_date: 'February, 2020',
        is_current: false,
        experience_description: 'Worked on various software development projects.',
        resume_id: 1,
      },
      {
        job_title: 'Frontend Developer Intern',
        employer: 'Web Design Studio',
        city: 'Design City',
        country: 'Design Country',
        start_date: 'February, 2020',
        end_date: 'February, 2020',
        is_current: false,
        experience_description: 'Designed and implemented responsive web designs.',
        resume_id: 2,
      },
      {
        job_title: 'Data Analyst',
        employer: 'Lululemon',
        city: 'Vancouver',
        country: 'Canada',
        start_date: 'February, 2020',
        end_date: 'February, 2020',
        is_current: false,
        experience_description: '- Analyzed data at Data Analytics Inc., identifying trends and patterns in large datasets using statistical methods.\n- Created interactive dashboards with Tableau for clear data visualization and presented findings to diverse stakeholders.',
        resume_id: 3,
      },
      {
        job_title: "Machine Learning Engineer",
        employer: "AI Innovations Co.",
        city: "Toronto",
        country: "Canada",
        start_date: "March, 2021",
        end_date: "June, 2023",
        is_current: false,
        experience_description: "- Developed and implemented machine learning algorithms for predictive analytics, resulting in a 20% improvement in customer engagement.\n- Collaborated with cross-functional teams to integrate AI solutions into existing products and services.\n- Conducted A/B testing and fine-tuned models for optimal performance, leading to a 15% increase in conversion rates.",
        resume_id: 3,
      },
    ];


    const languagesData = [
      {
        language_name: 'English',
        language_level: 'Fluent',
        resume_id: 1,
      },
      {
        language_name: 'Spanish',
        language_level: 'Intermediate',
        resume_id: 2,
      },
      {
        language_name: 'French',
        language_level: 'Professional',
        resume_id: 3,
      },
      {
        language_name: 'Spanish',
        language_level: 'Elementary',
        resume_id: 3,
      },
      {
        language_name: 'English',
        language_level: 'Elementary',
        resume_id: 3,
      },
    ];

    console.log('Education Data:', educationData);

    await prisma.users.createMany({ data: usersData });

    await Promise.all(resumesData.map(async (resume) => {
      const createdResume = await prisma.resumes.create({
        data: {
          ...resume,
          projects: {
            createMany: {
              data: projectsData.filter(project => project.resume_id === resume.user_id).map(({ resume_id, ...rest }) => rest)
            }
          },
          education: {
            createMany: {
              data: educationData.filter(education => education.resume_id === resume.user_id).map(({ resume_id, ...rest }) => rest)
            }
          },
          skills: {
            createMany: {
              data: skillsData.filter(skill => skill.resume_id === resume.user_id).map(({ resume_id, ...rest }) => rest)
            }
          },
          work_experience: {
            createMany: {
              data: workExperienceData.filter(experience => experience.resume_id === resume.user_id).map(({ resume_id, ...rest }) => rest)
            }
          },
          languages: {
            createMany: {
              data: languagesData.filter(language => language.resume_id === resume.user_id).map(({ resume_id, ...rest }) => rest)
            }
          },
        },
      });
      return createdResume;
    }));

    console.log('Data seeded successfully for users, resumes, projects, education, skills, work experience, and languages.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase()
  .catch((error) => {
    console.error('An unhandled error occurred:', error);
  });