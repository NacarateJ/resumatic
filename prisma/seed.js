const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const seedDatabase = async () => {
  try {
    // Sample user data
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'hashed_password', // Replace with a real hashed password
    };

    // Create a user using Prisma
    const user = await prisma.user.create({
      data: userData,
    });

    // Sample resume data
    const resumeData = {
      resume_title: 'Software Engineer Resume',
      resume_description: "Experienced software engineer with a strong background in web development.",
      full_name: 'John Doe',
      email: 'john@example.com',
      job_title: 'Software Engineer',
      phone_number: '123-456-7890',
      address: '123 Main St, City, Country',
      website_link: 'https://www.example.com',
      linkedin_link: 'https://www.linkedin.com/in/johndoe',
      github_link: 'https://github.com/johndoe',
      profile_description: 'Experienced software engineer with a passion for coding.',
    };

    // Create a resume using Prisma and associate it with the user
    const resume = await prisma.resume.create({
      data: {
        ...resumeData,
        user: {
          connect: { user_id: user.user_id },
        },
      },
    });

    // Sample project data
    const projectData = {
      project_title: 'Project 1',
      project_subtitle: 'Subtitle 1',
      project_description: 'Description for Project 1',
      start_date: new Date('2022-01-01'),
      end_date: new Date('2022-06-30'),
      project_link: 'https://www.example.com/project1',
      is_current: false,
    };

    // Create a project using Prisma and associate it with the resume
    const project = await prisma.project.create({
      data: {
        ...projectData,
        resume: {
          connect: { resume_id: resume.resume_id },
        },
      },
    });

    // Sample education data
    const educationData = {
      school_name: 'University of Example',
      city: 'Example City',
      country: 'Example Country',
      degree: 'Bachelor of Science in Computer Science',
      education_description: 'Graduated with honors.',
      start_date: new Date('2018-09-01'),
      end_date: new Date('2022-05-31'),
      gpa: 3.8,
      is_current: false,
    };

    // Create an education entry using Prisma and associate it with the resume
    const education = await prisma.education.create({
      data: {
        ...educationData,
        resume: {
          connect: { resume_id: resume.resume_id },
        },
      },
    });

    // Sample skill data
    const skillData = {
      skill_name: 'JavaScript',
      skill_description: 'Proficient in modern JavaScript.',
    };

    // Create a skill using Prisma and associate it with the resume
    const skill = await prisma.skill.create({
      data: {
        ...skillData,
        resume: {
          connect: { resume_id: resume.resume_id },
        },
      },
    });

    // Sample work experience data
    const workExperienceData = {
      job_title: 'Software Engineer Intern',
      employer: 'Tech Company',
      city: 'Tech City',
      country: 'Tech Country',
      start_date: new Date('2021-06-01'),
      end_date: new Date('2021-12-31'),
      is_current: false,
      experience_description: 'Worked on various software development projects.',
    };

    // Create a work experience entry using Prisma and associate it with the resume
    const workExperience = await prisma.workExperience.create({
      data: {
        ...workExperienceData,
        resume: {
          connect: { resume_id: resume.resume_id },
        },
      },
    });

    // Sample language data
    const languageData = {
      language_name: 'English',
      language_level: 'Fluent',
    };

    // Create a language entry using Prisma and associate it with the resume
    const language = await prisma.language.create({
      data: {
        ...languageData,
        resume: {
          connect: { resume_id: resume.resume_id },
        },
      },
    });

    console.log('Data seeded successfully:', user, resume, project, education, skill, workExperience, language);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Call the seedDatabase function to insert the data
seedDatabase();