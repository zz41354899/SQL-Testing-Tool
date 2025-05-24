import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import QueryEditor from './QueryEditor';
import ControlPanel from './ControlPanel';
import ResultsViewer from './ResultsViewer';
import SavedQueriesPanel from './SavedQueriesPanel';
import { executeEqlQuery } from '../lib/eqlParser';
import { QueryResult, StoredQueryData } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleQueries, sampleProcessData } from '../data/sampleData';

const EqlQueryTool: React.FC = () => {
  const [eqlQuery, setEqlQuery] = useState(sampleQueries.process);
  const [jsonData, setJsonData] = useState(sampleProcessData);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [eqlError, setEqlError] = useState<string | undefined>(undefined);
  const [jsonError, setJsonError] = useState<string | undefined>(undefined);
  const [savedQueries, setSavedQueries] = useLocalStorage<StoredQueryData[]>('eql-saved-queries', []);

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    setEqlError(undefined);
    setJsonError(undefined);

    try {
      // Validate JSON data first
      try {
        JSON.parse(jsonData);
      } catch (e) {
        setJsonError(`Invalid JSON: ${(e as Error).message}`);
        setIsExecuting(false);
        return;
      }

      // Execute the query
      const result = executeEqlQuery(eqlQuery, jsonData);
      setQueryResult(result);
      
      if (result.error) {
        setEqlError(result.error);
      }
    } catch (error) {
      setQueryResult({
        data: [],
        error: `Unexpected error: ${(error as Error).message}`
      });
      setEqlError(`${(error as Error).message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleClear = () => {
    setEqlQuery('');
    setJsonData('');
    setQueryResult(null);
    setEqlError(undefined);
    setJsonError(undefined);
  };

  const handleLoadSample = (query: string, data: string) => {
    setEqlQuery(query);
    setJsonData(data);
    setEqlError(undefined);
    setJsonError(undefined);
  };

  const handleSaveQuery = () => {
    const newSavedQuery: StoredQueryData = {
      query: eqlQuery,
      data: jsonData,
      timestamp: Date.now()
    };
    
    setSavedQueries([newSavedQuery, ...savedQueries]);
  };

  const handleLoadSavedQuery = (savedQuery: StoredQueryData) => {
    setEqlQuery(savedQuery.query);
    setJsonData(savedQuery.data);
    setEqlError(undefined);
    setJsonError(undefined);
  };

  const handleDeleteSavedQuery = (timestamp: number) => {
    setSavedQueries(savedQueries.filter(query => query.timestamp !== timestamp));
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <SavedQueriesPanel
        savedQueries={savedQueries}
        onLoad={handleLoadSavedQuery}
        onDelete={handleDeleteSavedQuery}
      />
      
      <div className="flex-1">
        <SplitPane
          split="vertical"
          minSize={200}
          defaultSize="33%"
          style={{ position: 'relative' }}
          paneStyle={{ overflow: 'auto' }}
        >
          <div className="h-full flex flex-col">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-medium text-gray-800 dark:text-white">EQL Query</h2>
            </div>
            <div className="flex-1">
              <QueryEditor
                value={eqlQuery}
                onChange={setEqlQuery}
                language="eql"
                error={eqlError}
              />
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-medium text-gray-800 dark:text-white">JSON Data</h2>
            </div>
            <div className="flex-1">
              <QueryEditor
                value={jsonData}
                onChange={setJsonData}
                language="json"
                error={jsonError}
              />
            </div>
          </div>
          
          <SplitPane
            split="vertical"
            minSize={100}
            defaultSize="30%"
            style={{ position: 'relative' }}
          >
            <ControlPanel
              onExecute={handleExecuteQuery}
              onClear={handleClear}
              onLoadSample={handleLoadSample}
              onSave={handleSaveQuery}
              isExecuting={isExecuting}
            />
            
            <div className="h-full flex flex-col">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-medium text-gray-800 dark:text-white">Results</h2>
              </div>
              <div className="flex-1">
                <ResultsViewer results={queryResult} />
              </div>
            </div>
          </SplitPane>
        </SplitPane>
      </div>
    </div>
  );
};

export default EqlQueryTool;