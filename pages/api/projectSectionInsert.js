import prisma from '@/prisma/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const {
        resumeId,
        projectLink,
        projectTitle,
        startDate,
        endDate,
        enhancedSummary
      } = data;

      const newProject = await prisma.projects.create({
        data: {
          resume_id: resumeId,
          project_title: projectTitle,
          project_link: projectLink,
          project_description: enhancedSummary,
          start_date: startDate,
          end_date: endDate,
        },
      });

      res
        .status(200)
        .json({ message: 'Project added successfully', project: newProject });
    } catch (error) {
      console.error('Error inserting project data:', error);
      res.status(500).json({ error: `Internal Server Error` });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}