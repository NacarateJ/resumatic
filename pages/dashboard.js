import React, { useState } from 'react';
import prisma from '@/utils/prisma';
import { useRouter } from 'next/router';
import {
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CardHeader,
  // CardActionArea,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import ShareIcon from '@mui/icons-material/Share';
import { formatDistanceToNow } from 'date-fns';


export default function Dashboard({ user, resumes, err }) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);

  const handleMenuOpen = (event, resume) => {
    event.stopPropagation(); // Prevent card click when kebab menu is clicked
    setMenuOpen(event.currentTarget);
    setSelectedResume(resume);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  const handleMakeCopy = (event, resume) => {
    // TO DO: Implement logic to make a copy of the resume
    // event.stopPropagation();
    console.log('Make a copy clicked for resume:', resume);
    handleMenuClose();
  };

  const handleDownload = (event, resume) => {
    // TO DO: Implement logic to download the resume
    // event.stopPropagation();
    console.log('Download clicked for resume:', resume);
    handleMenuClose();
  };

  const handleShare = (event, resume) => {
    // TO DO: Implement logic to share the resume
    // event.stopPropagation();
    console.log('Share clicked for resume:', resume);
    handleMenuClose();
  };

  // TO DO: uncomment function and cardActionArea
  // const handleCardClick = (resumeId) => {
  // router.push(`/resumes/${resumeId}`);
  // };

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant='h5' style={{ fontSize: '2rem', margin: '2rem' }}>
        Welcome, {user.first_name}!
      </Typography>

      <Button
        variant='contained'
        style={{
          backgroundColor: '#00B4D8',
          fontSize: '1.2rem',
          marginTop: '1rem',
          width: '30%',
        }}
        onClick={() => router.push('/resume-new')}
      >
        Create New Resume
      </Button>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: '50px',
        }}
      >
        {resumes.map((resume) => (
          <div key={resume.resume_id} style={{ margin: '10px' }}>
            <Card style={{ width: '300px', height: '300px' }}>
              {/* <CardActionArea onClick={() => handleCardClick(resume.resume_id)}> */}
              <CardHeader
                title={resume.resume_title}
                action={
                  <IconButton
                    aria-label='menu'
                    aria-controls={`kebab-menu-${resume.resume_id}`}
                    aria-haspopup='true'
                    onClick={(event) => handleMenuOpen(event, resume)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Menu
                  id='kebab-menu'
                  anchorEl={menuOpen}
                  keepMounted
                  open={Boolean(menuOpen)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={(event) => handleMakeCopy(event, selectedResume)}
                  >
                    <ListItemIcon>
                      <FileCopyIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Make a copy' />
                  </MenuItem>

                  <MenuItem
                    onClick={(event) => handleDownload(event, selectedResume)}
                  >
                    <ListItemIcon>
                      <SimCardDownloadIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Download' />
                  </MenuItem>

                  <MenuItem
                    onClick={(event) => handleShare(event, selectedResume)}
                  >
                    <ListItemIcon>
                      <ShareIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Share' />
                  </MenuItem>
                </Menu>

                <Paper
                  elevation={10}
                  style={{
                    padding: '16px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    marginBottom: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '230px',
                    minHeight: '125px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Typography gutterBottom variant='h6'>
                    {resume.job_title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {resume.resume_description}
                  </Typography>
                </Paper>

                <Typography variant='body2'>
                  Edited{' '}
                  {formatDistanceToNow(new Date(resume.last_modified_at), {
                    addSuffix: true,
                  }).replace('about ', '')}
                </Typography>
              </CardContent>
              {/* </CardActionArea> */}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: 3, // Change it later to be dynamic when we have user  autho working
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
        error: null,
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
