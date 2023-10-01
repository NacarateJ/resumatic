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
        resume_title: 'Software Engineer Resume (John Doe)',
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
        resume_title: 'Frontend Developer Resume (Liz Erd)',
        resume_description: 'Passionate frontend developer with expertise in UI/UX design.',
        full_name: 'Liz Erd',
        email: 'liz@example.com',
        job_title: 'Frontend Developer',
        phone_number: '987-654-3210',
        address: '456 Elm St, Another City, Another Country',
        website_link: 'https://www.example.com/liz_erd',
        linkedin_link: 'https://www.linkedin.com/in/lizerd',
        github_link: 'https://github.com/lizerd',
        profile_description: 'Experienced software engineer with a passion for coding.',
        user_id: 3, // Use the ID of the corresponding user
      },
      {
        resume_title: 'Data Scientist Resume (Liz Erd)',
        resume_description: 'Data scientist specializing in machine learning and data analysis.',
        full_name: 'Liz Erd',
        email: 'liz@example.com',
        job_title: 'Data Scientist',
        phone_number: '555-123-4567',
        address: '789 Oak St, Yet Another City, Yet Another Country',
        website_link: 'https://www.example.com/liz_erd',
        linkedin_link: 'https://www.linkedin.com/in/lizerd',
        github_link: 'https://github.com/lizerd',
        profile_description: 'Experienced software engineer with a passion for coding.',
        user_id: 3, // Use the ID of the corresponding user
      },
    ];

    const projectsData = [
      {
        project_title: 'Web Application Development',
        project_subtitle: 'E-commerce Platform',
        project_description: 'Developed a full-fledged e-commerce platform using React and Node.js.',
        start_date: new Date('2022-01-01'),
        end_date: new Date('2022-06-30'),
        project_link: 'https://www.example.com/project1',
        is_current: false,
        resume_id: 1,
      },
      {
        project_title: 'Responsive Web Design',
        project_subtitle: 'Portfolio Website',
        project_description: 'Designed and built a responsive portfolio website using HTML and CSS.',
        start_date: new Date('2022-03-15'),
        end_date: new Date('2022-08-31'),
        project_link: 'https://www.example.com/project2',
        is_current: false,
        resume_id: 2,
      },
      {
        project_title: 'Predictive Analytics',
        project_subtitle: 'Customer Churn Prediction',
        project_description: 'Developed a machine learning model to predict customer churn in a telecom company.',
        start_date: new Date('2022-02-10'),
        end_date: new Date('2022-07-15'),
        project_link: 'https://www.example.com/project3',
        is_current: false,
        resume_id: 3,
      },
    ];
    const educationData = [
      {
        school_name: 'University of Example',
        city: 'Example City',
        country: 'Example Country',
        degree: 'Bachelor of Science in Computer Science',
        education_description: 'Graduated with honors.',
        start_date: new Date('2018-09-01'),
        end_date: new Date('2022-05-31'),
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
        start_date: new Date('2022-09-01'),
        end_date: new Date('2023-05-31'),
        gpa: 4.0,
        is_current: false,
        resume_id: 2,
      },
      {
        school_name: 'Data Science Institute',
        city: 'Data Science City',
        country: 'Data Science Country',
        degree: 'Ph.D. in Machine Learning',
        education_description: 'Published several research papers.',
        start_date: new Date('2023-09-01'),
        end_date: new Date('2027-05-31'),
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
        skill_name: 'Python',
        resume_id: 3,
      },
    ];
    const workExperienceData = [
      {
        job_title: 'Software Engineer Intern',
        employer: 'Tech Company',
        city: 'Tech City',
        country: 'Tech Country',
        start_date: new Date('2021-06-01'),
        end_date: new Date('2021-12-31'),
        is_current: false,
        experience_description: 'Worked on various software development projects.',
        resume_id: 1,
      },
      {
        job_title: 'Frontend Developer Intern',
        employer: 'Web Design Studio',
        city: 'Design City',
        country: 'Design Country',
        start_date: new Date('2022-01-01'),
        end_date: new Date('2022-06-30'),
        is_current: false,
        experience_description: 'Designed and implemented responsive web designs.',
        resume_id: 2,
      },
      {
        job_title: 'Data Analyst',
        employer: 'Data Analytics Inc.',
        city: 'Analytics City',
        country: 'Analytics Country',
        start_date: new Date('2021-03-01'),
        end_date: new Date('2021-12-31'),
        is_current: false,
        experience_description: 'Analyzed data and generated insights for clients.',
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
        language_level: 'Advanced',
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