import React from 'react';
import Header from './components/Header';
import EqlQueryTool from './components/EqlQueryTool';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-1 overflow-hidden">
          <EqlQueryTool />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;