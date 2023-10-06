import prisma from '@/prisma/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body.data;

      const {
        resumeId,
        city,
        country,
        employer,
        endDate,
        enhancedSummary,
        jobTitle,
        startDate,
      } = data;


      // Update the existing resume with the provided data
      const newWorkExperience = await prisma.workExperiences.create({
        data: {
          resume_id: resumeId,
          city,
          country,
          employer,
          end_date: endDate,
          experience_description: enhancedSummary,
          job_title: jobTitle,
          start_date: startDate,
        },
      });

      res.status(200).json({
        message: 'Work experience added successfully',
        workExp: newWorkExperience,
      });
    } catch (error) {
       console.error('Error inserting resume data:', error);
       res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
