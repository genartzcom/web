import CodeMirror from '@uiw/react-codemirror';
import { solidity } from '@replit/codemirror-lang-solidity';
import './theme.css';

// @ts-ignore
const SolanaEditor = ({ content, setContent }) => {
  return (
    <div className="relative flex h-full max-h-[calc(100vh-128px)] flex-col overflow-scroll pt-8">
      <CodeMirror
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
        extensions={[solidity]}
        theme="dark"
      />
    </div>
  );
};

export default SolanaEditor;
