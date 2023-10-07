import prisma from '@/prisma/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const {
        resume_id,
        education_id,
        degree,
        school_name,
        country,
        city,
        gpa,
        education_description,
        start_date,
        end_date,
      } = data;

      //Check if the degree already exists for the provided resumeId
      const existingDegree = await prisma.educations.findUnique({
        where: {
          education_id: education_id ? education_id : -1,
        },
      });

      if (existingDegree) {
        res.status(500).json({
          message: 'Degree already exists',
          degree: existingDegree,
        });
      } else {
        // Degree doesn't exist, create new one
        const newDegree = await prisma.educations.create({
          data: {
            resume_id: resume_id,
            school_name: school_name,
            city: city,
            country: country,
            degree: degree,
            education_description: education_description,
            start_date: start_date,
            end_date: end_date,
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
