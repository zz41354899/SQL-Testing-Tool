import React, { useState } from 'react';
import { Table, List, Code, AlertTriangle } from 'lucide-react';
import { QueryResult, ViewMode } from '../types';

interface ResultsViewerProps {
  results: QueryResult | null;
}

const ResultsViewer: React.FC<ResultsViewerProps> = ({ results }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('json');
  
  if (!results) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <Code className="h-12 w-12 mx-auto mb-3" />
          <p>Execute a query to see results</p>
        </div>
      </div>
    );
  }

  if (results.error) {
    return (
      <div className="h-full overflow-auto p-4">
        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-300">Error</h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-200 whitespace-pre-wrap">{results.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('json')}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === 'json'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            } transition-colors`}
          >
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-1" />
              <span>JSON</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1 text-sm rounded-md ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            } transition-colors`}
          >
            <div className="flex items-center">
              <Table className="h-4 w-4 mr-1" />
              <span>Table</span>
            </div>
          </button>
        </div>
        
        {results.queryTime && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {results.data.length} results in {results.queryTime.toFixed(2)}ms
          </span>
        )}
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {viewMode === 'json' ? (
          <pre className="text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 p-4 rounded-md overflow-auto">
            {JSON.stringify(results.data, null, 2)}
          </pre>
        ) : (
          <ResultsTable data={results.data} />
        )}
      </div>
    </div>
  );
};

interface ResultsTableProps {
  data: any[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  if (!data.length) {
    return <p className="text-gray-500 dark:text-gray-400">No results to display</p>;
  }

  // Get all unique keys from all objects to create columns
  const allKeys = new Set<string>();
  const flattenObject = (obj: any, prefix = ''): void => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], prefix + key + '.');
      } else {
        allKeys.add(prefix + key);
      }
    }
  };

  // Flatten the first level of each object to get common fields
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (typeof item[key] === 'object' && item[key] !== null && !Array.isArray(item[key])) {
        flattenObject(item[key], key + '.');
      } else {
        allKeys.add(key);
      }
    });
  });

  // Convert to array and sort
  const columns = Array.from(allKeys).sort();

  // Get a nested value from an object using dot notation
  const getNestedValue = (obj: any, path: string): any => {
    const keys = path.split('.');
    return keys.reduce((o, key) => (o && o[key] !== undefined ? o[key] : undefined), obj);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {columns.map(column => (
              <th
                key={column}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {columns.map(column => {
                const value = getNestedValue(row, column);
                return (
                  <td
                    key={column}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {value === undefined
                      ? '-'
                      : typeof value === 'object'
                      ? JSON.stringify(value)
                      : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsViewer;