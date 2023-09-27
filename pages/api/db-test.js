import prisma from "../../prisma/prisma";

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // Use Prisma queries to fetch specific fields from Users and their associated data
    const usersWithAssociatedData = await prisma.users.findMany({
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        resumes: {
          select: {
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
            skills: {
              select: {
                skill_id: true,
                skill_name: true,
                skill_description: true,
                last_modified_at: true,
              },
            },
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
            languages: {
              select: {
                language_id: true,
                language_name: true,
                language_level: true,
                last_modified_at: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({ users: usersWithAssociatedData });
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};
