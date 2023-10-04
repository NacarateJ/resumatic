import prisma from '@/utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Request Body:', req.body);
      const { enhancedSummary } = req.body;

       const resume = await prisma.resumes.findUnique({
         where: {
           
         },
       });
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
