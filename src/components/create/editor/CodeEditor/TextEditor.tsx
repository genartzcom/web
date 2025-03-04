import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import './theme.css';

const TextEditor = ({ content, setContent }) => {
  const customTheme = EditorView.theme({
    '&': {
      fontSize: '14px',
      fontFamily: 'JetBrains Mono, Menlo, Monaco, "Courier New", monospace',
    },
    '.cm-content': {
      padding: '8px 0',
    },
    '.cm-line': {
      padding: '0 8px 0 4px',
      lineHeight: '1.6',
    },
    '.cm-activeLine': {
      backgroundColor: 'rgba(66, 66, 66, 0.4)',
    },
    '.cm-gutters': {
      backgroundColor: '#242424',
      color: '#ddd',
      border: 'none',
    },
    '.cm-cursor': {
      borderLeft: '2px solid #fff',
    },
    '.cm-selectionBackground': {
      backgroundColor: 'rgba(75, 125, 255, 0.3)',
    },
  });

  return (
    <div className="relative flex h-full max-h-[calc(100vh-128px)] flex-col overflow-hidden">
      <CodeMirror
        value={content}
        height="100%"
        onChange={setContent}
        extensions={[javascript({ jsx: false }), customTheme]}
        theme="dark"
        placeholder="// Write your p5.js code here..."
        autoFocus={true}
      />
    </div>
  );
};

export default TextEditor;
