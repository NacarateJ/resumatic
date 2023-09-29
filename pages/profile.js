import React, { useState } from 'react';
import prisma from '@/utils/prisma';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CardHeader,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import ShareIcon from '@mui/icons-material/Share';
import { formatDistanceToNow } from 'date-fns';


export default function Profile({ user, resumes, err }) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);

  const handleMenuOpen = (event, resume) => {
    setMenuOpen(event.currentTarget);
    setSelectedResume(resume);
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
  };

  const handleMakeCopy = (resume) => {
    // TO DO: Implement logic to make a copy of the resume
    console.log('Make a copy clicked for resume:', resume);
    handleMenuClose();
  };

  const handleDownload = (resume) => {
    // TO DO: Implement logic to download the resume
    console.log('Download clicked for resume:', resume);
    handleMenuClose();
  };

  const handleShare = (resume) => {
    // TO DO: Implement logic to share the resume
    console.log('Share clicked for resume:', resume);
    handleMenuClose();
  };

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

      <Grid
        container
        spacing={2}
        mt={6}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {resumes.map((resume) => (
          <Grid item xs={12} sm={6} md={4} key={resume.resume_id}>
            <Card style={{ width: '300px', height: '300px' }}>
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
                  <MenuItem onClick={() => handleMakeCopy(selectedResume)}>
                    <ListItemIcon>
                      <FileCopyIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Make a copy' />
                  </MenuItem>

                  <MenuItem onClick={() => handleDownload(selectedResume)}>
                    <ListItemIcon>
                      <SimCardDownloadIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary='Download' />
                  </MenuItem>

                  <MenuItem onClick={() => handleShare(selectedResume)}>
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
            </Card>
          </Grid>
        ))}
      </Grid>
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
