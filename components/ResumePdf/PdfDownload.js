import * as React from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { useRouter } from 'next/router';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../MyDocument';


export default function PdfDownload({ resumeData }) {
  const router = useRouter();
  const divStyle = {
    border: "none",
    padding: 3,
    display: "flex",
    justifyContent: "flex-end",
    gap: 3,

  };

  const buttonStyle = {
    color: "black",
    borderColor: "black",
  };
  let resumeTitle = resumeData.resume_title;



  const handleClickShare = () => {

  };
  const handleClickDownload = () => {

  };


  return (
    <div style={divStyle}>
      <Button variant="contained" style={{ backgroundColor: '#00B4D8' }} startIcon={<ShareIcon />}>
        Share
      </Button>
      <PDFDownloadLink document={<MyDocument resumeData={resumeData} />}
        fileName={`${resumeTitle}`}>
        <Button variant="contained" style={{ backgroundColor: '#00B4D8' }} startIcon={<DownloadIcon />}>
          Download
        </Button>
      </PDFDownloadLink>
    </div>
  );
}
