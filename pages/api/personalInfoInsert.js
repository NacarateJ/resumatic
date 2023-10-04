import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { dataType, data } = req.body;

      switch (dataType) {
        case 'resume':
          const {
            resumeId,
            resumeTitle,
            resumeDescription,
            fullName,
            jobTitle,
            email,
            profileDescription,
            phoneNumber,
            address,
            websiteLink,
            linkedinLink,
            githubLink,
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
              resume_title: resumeTitle,
              resume_description: resumeDescription,
              full_name: fullName,
              job_title: jobTitle,
              email,
              profile_description: profileDescription,
              phone_number: phoneNumber,
              address,
              website_link: websiteLink,
              linkedin_link: linkedinLink,
              github_link: githubLink,
            },
          });

          res.status(200).json({ resumeId: updatedResume.resume_id });
          break;

        // Handle other data types similarly if needed

        default:
          res.status(400).json({ error: 'Invalid data type' });
          break;
      }
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
