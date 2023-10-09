import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Box, Toolbar, IconButton } from '@mui/material';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
// import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
// import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import CustomEditor from '@/utils/CustomEditor';
import Leaf from '@/utils/Leaf';
import DefaultElement from '@/utils/DefaultElement';
import CodeElement from '@/utils/CodeElement';


export default function TextEditor({ editorContent, useEnhancedSummary }) {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));

  let initialState = useMemo(() => {
    return useEnhancedSummary
      ? [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ]
      : [
          {
            type: 'paragraph',
            children: [{ text: editorContent }],
          },
        ];
  }, [useEnhancedSummary, editorContent]);

  // Use useEffect to update the editor's content based on the props
  useEffect(() => {
    // Set the editor's content
    editor.children = initialState;
    editor.selection = null;
    editor.onChange();
  }, [editor, useEnhancedSummary, editorContent, initialState]);

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  // const toggleBold = () => {
  //   CustomEditor.toggleBoldMark(editor);
  // };

  // const toggleItalic = () => {
  //   CustomEditor.toggleItalicMark(editor);
  // };

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
      {/* <Toolbar>
        <IconButton>
          <FormatListBulletedIcon />
        </IconButton>

        <IconButton onClick={toggleBold}>
          <FormatBoldIcon />
        </IconButton>

        <IconButton>
          <FormatIndentDecreaseIcon />
        </IconButton>

        <IconButton>
          <FormatIndentIncreaseIcon />
        </IconButton>

        <IconButton onClick={toggleItalic}>
          <FormatItalicIcon />
        </IconButton>

        <IconButton>
          <FormatAlignJustifyIcon />
        </IconButton>

        <IconButton>
          <FormatAlignCenterIcon />
        </IconButton>

        <IconButton>
          <FormatAlignLeftIcon />
        </IconButton>

        <IconButton>
          <FormatAlignRightIcon />
        </IconButton>
      </Toolbar> */}
      <Slate editor={editor} initialValue={initialState}>
        <Editable
          style={{ outline: 'none' }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </Box>
  );
}


