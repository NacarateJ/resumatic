import React, { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Box } from '@mui/material';


export default function TextEditor({ generatedSummary }) {
  const initialState = [
    {
      type: 'paragraph',
      children: [{ text: generatedSummary }],
    },
  ];
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        padding: '16px',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '5px',
      }}
    >
      <Slate editor={editor} initialValue={initialState}>
        <Editable style={{ outline: 'none' }} />
      </Slate>
    </Box>
  );
}
