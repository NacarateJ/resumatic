import prisma from '@/utils/prisma';

export default function Profile({ user, resumes, err }) {
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
      <h1>Welcome, {user.first_name}!</h1>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: 3, // Use the user's ID or some other identifier here
      },
    });

    const resumes = await prisma.resumes.findMany({
      where: {
        user: {
          user_id: user.user_id,
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
        user,
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
