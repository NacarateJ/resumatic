import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const resumeId = parseInt(req.query.id);

    const resumeData = await prisma.resumes.findUnique({
      where: {
        resume_id: resumeId,
      },
      include: {
        projects: true,
        education: true,
        skills: true,
        work_experience: true,
        languages: true,
      },
    });

    if (!resumeData) {
      res.status(404).json({ error: 'Resume not found' });
    } else {
      res.status(200).json({ resume: resumeData });
    }
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};