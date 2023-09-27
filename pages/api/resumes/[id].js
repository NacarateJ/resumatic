import prisma from "../../../prisma/prisma";

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const resumeId = req.query.id; // Retrieve the resumeId from the query parameters

    // Use Prisma queries to fetch specific fields from the resume based on resumeId
    const resumeData = await prisma.resumes.findUnique({
      where: {
        resume_id: parseInt(resumeId), // Correctly use resumeId by converting it to an integer
      },
      select: {
        // Select specific fields from the resume table
        resume_id: true,
        resume_title: true,
        resume_description: true,
        full_name: true,
        job_title: true,
        email: true,
        profile_description: true,
        phone_number: true,
        address: true,
        website_link: true,
        linkedin_link: true,
        github_link: true,
        created_at: true,
        last_modified_at: true,
        // Select associated projects data
        projects: {
          select: {
            project_id: true,
            project_title: true,
            project_subtitle: true,
            project_description: true,
            start_date: true,
            end_date: true,
            project_link: true,
            is_current: true,
            last_modified_at: true,
          },
        },
        // Select associated education data
        education: {
          select: {
            education_id: true,
            school_name: true,
            city: true,
            country: true,
            degree: true,
            education_description: true,
            start_date: true,
            end_date: true,
            gpa: true,
            is_current: true,
            last_modified_at: true,
          },
        },
        // Select associated skills data
        skills: {
          select: {
            skill_id: true,
            skill_name: true,
            skill_description: true,
            last_modified_at: true,
          },
        },
        // Select associated work experience data
        work_experience: {
          select: {
            experience_id: true,
            job_title: true,
            employer: true,
            city: true,
            country: true,
            start_date: true,
            end_date: true,
            is_current: true,
            experience_description: true,
            last_modified_at: true,
          },
        },
        // Select associated languages data
        languages: {
          select: {
            language_id: true,
            language_name: true,
            language_level: true,
            last_modified_at: true,
          },
        },
      },
    });


    if (!resumeData) {
      res.status(404).json({ error: 'Resume not found' }); // Respond with a 404 status code if the resume is not found
    } else {
      res.status(200).json({ resume: resumeData }); // Respond with a 200 status code and the retrieved resume data
    }
  } catch (error) {
    console.error('Error fetching data from the database:', error); // Log any errors that occur during data fetching
    res.status(500).json({ error: 'Internal server error' }); // Respond with a 500 status code for internal server errors
  } finally {
    await prisma.$disconnect(); // Ensure that the Prisma client is properly disconnected after the request
  }
};
