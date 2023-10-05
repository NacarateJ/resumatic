import prisma from '@/prisma/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const {
        resumeId,
        degree,
        school,
        country,
        city,
        gpa,
        educationDescription,
        startDate,
        endDate,
      } = data;

      //Check if the degree already exists for the provided resumeId
      const existingDegree = await prisma.educations.findFirst({
        where: {
          resume_id: resumeId,
          degree: degree,
          school_name: school,
          country: country,
          city: city,
        },
      });

      if (existingDegree) {
        res
          .status(200)
          .json({ message: 'Degree already exists', degree: existingDegree });
      } else {
        // Degree doesn't exist, create new one
        const newDegree = await prisma.educations.create({
          data: {
            resume_id: resumeId,
            school_name: school,
            city: city,
            country: country,
            degree: degree,
            education_description: educationDescription,
            start_date: startDate,
            end_date: endDate,
            gpa: gpa,
          },
        });

        res
          .status(201)
          .json({ message: 'Degree added successfully', degree: newDegree });
      }
    } catch (error) {
      console.error('Error inserting education data:', error);
      res.status(500).json({ error: `Internal Server Error` });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
