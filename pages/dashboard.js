import React, { useState, useRef } from 'react';
import prisma from '@/prisma/prisma';
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
  cardActionArea,
  CardActionArea,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import ShareIcon from '@mui/icons-material/Share';
import { formatDistanceToNow } from 'date-fns';

const user_Id = 3;
export default function Dashboard({ user, resumes, err }) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const menuRef = useRef(null);

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
  }; const handleCreateResume = async () => {
    try {
      // Prepare the request body with hardcoded user data

      const requestBody = {
        user: {
          userId: user_Id, // Use user_Id here, not userId
        },
      };


      // Make a POST request to the API endpoint to create a new blank resume
      const response = await fetch('/api/create-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Parse the response JSON to get the new resume ID
        const { resumeId } = await response.json();

        // Redirect to the resume-new page with the new resume ID as a query parameter
        router.push(`/${resumeId}`);
      } else {
        // Handle error responses from the API
        console.error('Error creating resume:', response.statusText);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error('Error creating resume:', error);
      // Handle network errors or other exceptions
      // Optionally, show an error message to the user
    }
  };



  const handleCardClick = (resumeId, event) => {
    if (menuRef.current && menuRef.current.contains(event.target)) {
      // Click occurred inside the Menu or its children
      return;
    }

    router.push(`/${resumeId}`);
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
        onClick={handleCreateResume}
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
            <Card
              style={{ width: '300px', height: '300px' }}
              onClick={(e) => handleCardClick(resume.resume_id, e)}
            >
              <CardHeader
                title={resume.resume_title}

                action={
                  <IconButton
                    aria-label='menu'
                    aria-controls={`kebab-menu-${resume.resume_id}`}
                    aria-haspopup='true'
                    onClick={(event) => handleMenuOpen(event, resume)}
                    ref={menuRef}
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
                  ref={menuRef}
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
                <CardActionArea

                >


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
                </CardActionArea>
              </CardContent>

            </Card>
          </div>
        ))}
      </div>
    </div >
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
