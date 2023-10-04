import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { data } = req.body;
      const { resumeId, skillDescription, skill } = data;

      // Check if the skill already exists for the given resumeId and skillDescription
      const existingSkill = await prisma.skills.findFirst({
        where: {
          resume_id: resumeId,
          skill_name: skill,
          skill_description: skillDescription,
        },
      });

      if (existingSkill) {
        res.status(200).json({ message: 'Skill already exists', skill: existingSkill });
      } else {
        // Skill doesn't exist, create a new one
        const newSkill = await prisma.skills.create({
          data: {
            resume_id: resumeId,
            skill_name: skill,
            skill_description: skillDescription,
          },
        });

        res.status(200).json({ message: 'Skill added successfully', skill: newSkill });
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
