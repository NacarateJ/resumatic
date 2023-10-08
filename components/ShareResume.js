import React, { useRef } from 'react';
import SectionContainer from './SectionContainer';
import {
  Box,
  Grid,
  Button,
  Typography,
  Modal,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileCopyIcon from '@mui/icons-material/FileCopy';

export default function ShareResume({ open, onClose, linkProp }) {
  const linkRef = useRef(null);

  const handleCopyToClipboard = () => {
    const text = linkRef.current.textContent;
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text copied to clipboard');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      sx={{
        '& > .MuiBackdrop-root': {
          backdropFilter: 'blur(1px)',
          bgcolor: 'rgb(255,255,255, 0.05)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          boxShadow: 1,
          bgcolor: 'white',
          padding: 2,
          display: 'grid',
          gridTemplateColumns: '40% 40% 20%',
          gridTemplateRows: '0.5fr 1fr 1.5fr',
          'grid-template-areas': `"title title title" "description description description" "box box box"`,
        }}
      >
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id='modal-title'
          variant='h5'
          component='h2'
          sx={{ my: 1, 'grid-area': 'title' }}
        >
          Online Resume
        </Typography>
        <Typography
          id='modal-description'
          variant='body'
          sx={{ mr: 1, 'grid-area': 'description' }}
        >
          Share your resume with the world!
        </Typography>
        <Box
          sx={{
            border: 1.5,
            borderColor: 'LightGray',
            borderRadius: '15px',
            'grid-area': 'box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'WhiteSmoke',
          }}
        >
          <Typography ref={linkRef} sx={{ m: '10px', pr: '10px' }}>
            {linkProp}
          </Typography>

          <Button
            variant='outlined'
            onClick={handleCopyToClipboard}
            sx={{
              borderRadius: '15px',
              mr: '5px',
              border: 'none',
              boxShadow: 2,
            }}
            style={{
              backgroundColor: '#FF6D00',
              color: 'white',
            }}
          >
            <FileCopyIcon />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
