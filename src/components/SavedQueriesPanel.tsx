import React, { useState } from 'react';
import { Book, Trash, ChevronDown, ChevronUp } from 'lucide-react';
import { StoredQueryData } from '../types';

interface SavedQueriesPanelProps {
  savedQueries: StoredQueryData[];
  onLoad: (query: StoredQueryData) => void;
  onDelete: (timestamp: number) => void;
}

const SavedQueriesPanel: React.FC<SavedQueriesPanelProps> = ({
  savedQueries,
  onLoad,
  onDelete
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (savedQueries.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="font-medium">Saved Queries ({savedQueries.length})</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-3 max-h-72 overflow-y-auto bg-white dark:bg-gray-900">
          <div className="space-y-2">
            {savedQueries.map((query) => (
              <div
                key={query.timestamp}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => onLoad(query)}
                  className="flex items-center text-left truncate flex-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Book className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <div className="truncate">
                    <span className="font-medium">
                      {query.name || new Date(query.timestamp).toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{query.query}</p>
                  </div>
                </button>
                <button
                  onClick={() => onDelete(query.timestamp)}
                  className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  aria-label="Delete saved query"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedQueriesPanel;