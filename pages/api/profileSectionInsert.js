import prisma from '@/prisma/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const { resumeId, enhancedSummary } = data;

      // Check if the provided resumeId exists in the Resumes table
      const existingResume = await prisma.resumes.findUnique({
        where: {
          resume_id: resumeId,
        },
      });

      if (!existingResume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      // Update the existing resume with the provided data
          const updatedResume = await prisma.resumes.update({
            where: {
              resume_id: resumeId,
            },
            data: {
              profile_description: enhancedSummary,
            }
          });

          res.status(200).json({ resumeId: updatedResume.resume_id });
          
    } catch (err) {
      console.log('Error fetching resumes:', err);
      // Internal server error
      res.status(500).json({ error: 'Internal Server Error' }).end();
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Not a get request
    res.status(405).json({ error: 'Method Not Allowed' }).end();
  }
}
