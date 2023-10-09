import * as React from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useRouter } from 'next/router';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../MyDocument';
import ShareResume from '../ShareResume';
import { useState } from 'react';

export default function PdfMenu({ resumeData }) {
  const [open, setOpen] = useState(false);
  const domain =
    typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? window.location.hostname
      : 'resumatic.com';
  const router = useRouter();
  const divStyle = {
    border: 'none',
    paddingBottom: 3,
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const buttonStyle = {
    color: 'black',
    borderColor: 'black',
  };
  let resumeTitle = resumeData.resume_title;

  const handleClickPdf = () => {
    router.push(`/resumes/${resumeData.resume_id}`);
  };
  const handleClickShare = () => {
    setOpen(true);
  };
  const handleClickDownload = () => {};

  return (
    <div style={divStyle}>
      <Button onClick={handleClickPdf} style={buttonStyle}>
        <PictureAsPdfIcon />
      </Button>
      <Button onClick={handleClickShare} style={buttonStyle}>
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
      >
        <Button style={buttonStyle} className='px-4'>
          <DownloadIcon />
        </Button>
      </PDFDownloadLink>
    </div>
  );
}
