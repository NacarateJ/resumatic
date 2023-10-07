import * as React from 'react';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useRouter } from 'next/router';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../MyDocument';


export default function PdfMenu({ resumeData }) {
  const router = useRouter();
  const divStyle = {
    border: "none",
    paddingBottom: 3,
    display: "flex",
    justifyContent: "flex-end"
  };

  const buttonStyle = {
    color: "black",
    borderColor: "black"
  };
  let resumeTitle = resumeData.resume_title;

  console.log("Resume Title:", resumeTitle);

  const handleClickPdf = () => {
    router.push(`/resumes/${resumeData.resume_id}`);
  };
  const handleClickShare = () => {

  };
  const handleClickDownload = () => {

  };


  return (
    <div style={divStyle}>
      <Button onClick={handleClickPdf} style={buttonStyle}><PictureAsPdfIcon /></Button>
      <Button style={buttonStyle}><ShareIcon /></Button>
      <PDFDownloadLink document={<MyDocument resumeData={resumeData} />}
        fileName={`${resumeTitle}`}>
        <Button style={buttonStyle} className="px-4">
          <DownloadIcon />
        </Button>
      </PDFDownloadLink>
    </div>
  );
} 