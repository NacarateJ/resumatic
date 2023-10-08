import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import MyDocument from '@/components/MyDocument';

const PDFViewerComponent = dynamic(() => import('@react-pdf/renderer').then(module => module.PDFViewer), {
  loading: () => <p>Loading PDF Viewer...</p>,
  ssr: false // This ensures that the component is not loaded on the server side
});

const index = ({ resumeId }) => {
  const [resumeData, setResumeData] = useState(null);
  const router = useRouter();


  useEffect(() => {
    // Get the id parameter from the URL
    const { id } = router.query;
    if (id === undefined) {
      // Query parameters are not available yet, do nothing.
      return;
    }
    // Check if id is defined and is a valid integer
    if (id && !isNaN(parseInt(id))) {
      // Parse id into an integer
      const resumeId = parseInt(id);

      // Make a request to your API endpoint with the parsed resumeId
      fetch(`/api/resumes/${resumeId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Update state with the retrieved resume data
          setResumeData(data.resume);
        })
        .catch(error => {
          console.error('Error fetching resume data:', error);
          // Handle error, e.g., show an error message to the user or redirect to an error page
        });
    } else {
      console.error(`Invalid resume ID: ${resumeId}`);
      // Handle invalid or missing ID, e.g., redirect to an error page
    }
  }, [router.query]); // Call the async function inside useEffect

  return resumeData ? (
    <div >
      <PDFViewerComponent showToolbar={false}
        style={{
          width: "100%",
          height: "100vh"
        }}
      >
        <MyDocument resumeData={resumeData} />
      </PDFViewerComponent>
    </div>
  ) : null; // Return null if resumeData is not available yet
};

export default index;
