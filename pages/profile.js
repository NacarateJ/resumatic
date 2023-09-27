import prisma from '@/utils/prisma';

export default function Profile({ resumes, err }) {
  if (err) {
    return (
      <div>
        <h1>Error: {err}</h1>
      </div>
    );
  }

   if (!resumes.length) {
     return (
       <div>
         <h1>User has no resumes yet</h1>
       </div>
     );
   }
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const resumes = await prisma.resumes.findMany({
      where: {
        user: {
          user_id: 2, // change it later when we have user  autho working
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
        resumes: JSON.parse(JSON.stringify(resumes)),
        error:null,
      },
    };
  } catch (err) {
    console.log('Error fetching resumes:', err);
    return {
      props: {
        err: JSON.parse(JSON.stringify(err)),
      },
    };
  } finally {
    await prisma.$disconnect();
  }
}
