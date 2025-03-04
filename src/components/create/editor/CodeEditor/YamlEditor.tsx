import CodeMirror from '@uiw/react-codemirror';
import {yamlLanguage} from "@codemirror/lang-yaml";
import './theme.css';

// @ts-ignore
const YamlEditor = ({ content, setContent }) => {
  return (
    <div className="relative flex h-full max-h-[calc(100vh-128px)] flex-col overflow-scroll pt-8">
      <CodeMirror
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
        extensions={[yamlLanguage]}
        theme="dark"
      />
    </div>
  );
};

export default YamlEditor;
