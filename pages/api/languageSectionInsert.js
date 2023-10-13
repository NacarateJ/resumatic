import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const { resumeId, langName, selectedLevel } = data;

      const existingLang = await prisma.languages.findFirst({
        where: {
          resume_id: resumeId,
          language_name: langName,
          language_level: selectedLevel,
        }
      });

      if (existingLang) {
        res.status(200).json({ message: 'Skill already exists', skill: existingLang });
      } else {
        const newLang = await prisma.languages.create({
          data: {
            resume_id: resumeId,
            language_name: langName,
            language_level: selectedLevel,
          },
        });

        res.status(200).json({ message: 'Language added successfully', skill: newLang });
      }
    } catch (error) {
      console.error('Error inserting resume data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}