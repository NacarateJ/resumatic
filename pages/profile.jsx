import prisma from '@/utils/prisma';

export default function Profile({resumes, err}) {
  if (err || !resumes.length) {
    console.log(resumes, err);
    return (
      <div>
        <h1> User not found</h1>
      </div>
    );
  }
  console.log(resumes)
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const resumes = await prisma.resume.findMany({
      where: {
        user: {
          user_id: 1, // change it later when we have user  autho working
        },
      },
      // Include other related data like projects, education, skills, etc.
      include: {
        projects: true,
        education: true,
        skills: true,
        work_experience: true,
        languages: true,
      },
    });

    return {
      props: {
        resumes: JSON.parse(JSON.stringify(resumes))
      }
    }
  } catch (err) {
    console.log('Error fetching resumes:', err);
    return {
      props: {
        err: JSON.parse(JSON.stringify(err))
      }
    }
    
  } finally {
    await prisma.$disconnect();
  }
}
