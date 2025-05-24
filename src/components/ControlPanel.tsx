import React from 'react';
import { Play, Trash2, Save, Book, Download } from 'lucide-react';
import { sampleQueries, sampleProcessData, sampleFileData, sampleNetworkData } from '../data/sampleData';

interface ControlPanelProps {
  onExecute: () => void;
  onClear: () => void;
  onLoadSample: (query: string, data: string) => void;
  onSave: () => void;
  isExecuting: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onExecute,
  onClear,
  onLoadSample,
  onSave,
  isExecuting
}) => {
  const sampleDataMap = {
    'process': sampleProcessData,
    'processWithPid': sampleProcessData,
    'file': sampleFileData,
    'network': sampleNetworkData
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gray-100 dark:bg-gray-800 border-r border-l border-gray-200 dark:border-gray-700">
      <button
        onClick={onExecute}
        disabled={isExecuting}
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
      >
        <Play className="h-4 w-4" />
        <span>Execute Query</span>
      </button>
      
      <button
        onClick={onClear}
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
        <span>Clear</span>
      </button>
      
      <button
        onClick={onSave}
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        <Save className="h-4 w-4" />
        <span>Save Query</span>
      </button>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Load Sample Queries</h3>
        
        <div className="space-y-2">
          {Object.entries(sampleQueries).map(([key, query]) => (
            <button
              key={key}
              onClick={() => onLoadSample(query, sampleDataMap[key as keyof typeof sampleDataMap])}
              className="flex items-center w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Book className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
              <span className="truncate">
                {key === 'process' ? 'Process Query' : 
                 key === 'processWithPid' ? 'Process with PID' : 
                 key === 'file' ? 'File Path Query' : 
                 'Network Protocol Query'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;