import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../MyDocument';
import ShareResume from '../ShareResume';

export default function PdfDownload({ resumeData }) {
  const [open, setOpen] = useState(false);
  const domain =
    typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? window.location.hostname
      : 'resumatic.com';
  const divStyle = {
    border: 'none',
    padding: 3,
    display: 'grid',
    gridTemplateColumns: '1fr 4fr 50px 50px 2fr',
    gridTemplateAreas: `'. . shareButton downloadSection .'`,
  };

  const buttonStyle = {
    color: 'black',
    borderColor: 'black',
  };
  let resumeTitle = resumeData.resume_title;

  const handleClickShare = () => {
    setOpen(true);
  };

  return (
    <div style={divStyle}>
      <Button
        onClick={handleClickShare}
        style={{
          color: 'black',
          borderColor: 'black',
          gridArea: 'shareButton',
        }}
      >
        <ShareIcon />
      </Button>
      <ShareResume
        open={open}
        onClose={() => setOpen(false)}
        linkProp={`https://${domain}/resumes/${resumeData.resume_id}`}
      />
      <PDFDownloadLink
        document={<MyDocument resumeData={resumeData} />}
        fileName={`${resumeTitle}`}
        style={{ gridArea: 'downloadSection' }}
      >
        <Button style={buttonStyle} className='px-4'>
          <DownloadIcon />
        </Button>
      </PDFDownloadLink>
    </div>
  );
}
