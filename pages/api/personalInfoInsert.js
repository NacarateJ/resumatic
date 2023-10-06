import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const {
        fullName,
        jobTitle,
        phoneNumber,
        email,
        address,
        website,
        linkedin,
        github,
        resumeId,
      } = data;

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
          full_name: fullName,
          job_title: jobTitle,
          phone_number: phoneNumber,
          email,
          address,
          website_link: website,
          linkedin_link: linkedin,
          github_link: github,
        },
      });

      console.log('updated resume:', updatedResume);
      res.status(200).json({ resumeId: updatedResume.resume_id });
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
