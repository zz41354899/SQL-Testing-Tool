import React from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { useThemeContext } from '../context/ThemeContext';

interface QueryEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'eql' | 'json';
  height?: string;
  error?: string;
}

const QueryEditor: React.FC<QueryEditorProps> = ({
  value,
  onChange,
  language,
  height = '100%',
  error
}) => {
  const { isDarkMode } = useThemeContext();
  const editorTheme = isDarkMode ? 'vs-dark' : 'vs';

  // Configure Monaco editor on mount
  const handleEditorDidMount = (monaco: Monaco) => {
    if (!monaco.languages.getLanguages().some(lang => lang.id === 'eql')) {
      // Register a new EQL language
      monaco.languages.register({ id: 'eql' });
      
      // Define syntax highlighting for EQL
      monaco.languages.setMonarchTokensProvider('eql', {
        tokenizer: {
          root: [
            [/\b(process|file|network|registry|dns|event)\b/, 'keyword'],
            [/\b(where|and|or|not|in|contains|startswith|endswith)\b/, 'keyword.operator'],
            [/(".*?"|'.*?')/, 'string'],
            [/\b([0-9]+)\b/, 'number'],
            [/\b(true|false|null)\b/, 'keyword.constant'],
            [/[=<>!]=?/, 'operator'],
          ]
        }
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Editor
        height={height}
        language={language === 'eql' ? 'eql' : 'json'}
        value={value}
        theme={editorTheme}
        onChange={(value) => onChange(value || '')}
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily: '"Fira Code", Menlo, Monaco, "Courier New", monospace',
          wordWrap: 'on'
        }}
        beforeMount={handleEditorDidMount}
      />
      {error && (
        <div className="mt-1 p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default QueryEditor;