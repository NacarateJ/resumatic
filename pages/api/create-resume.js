import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      // Extract user ID from the request
      const userId = parseInt(req.body.user.userId); // Example: req.body.user.userId contains the user ID

      // Fetch user data from the database based on the user ID
      const userData = await prisma.users.findUnique({
        where: {
          user_id: userId,
        },
      });

      // Check if the user exists
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create a new resume in the database using Prisma, including the fetched user data
      const createdResume = await prisma.resumes.create({
        data: {
          user: {
            connect: { user_id: userId }, // Connect the resume to the existing user
          },
        },
      });

      // Send the ID of the created resume as a response
      res.status(201).json({ resumeId: createdResume.resume_id });
    } catch (error) {
      console.error('Error creating resume:', error);
      // Handle error and send an error response
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle other HTTP methods if necessary
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
