import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useTheme(): [boolean, () => void] {
  // Get the user's preference from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    'eql-dark-mode',
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    // Apply the theme to the document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleTheme];
}