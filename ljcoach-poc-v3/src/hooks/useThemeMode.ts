// src/hooks/useThemeMode.ts
import { useEffect } from 'react';
import useStore from '../store';

export const useThemeMode = () => {
  const { themeMode, setThemeMode } = useStore();

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
    if (savedMode) {
      setThemeMode(savedMode);
    }
  }, []);

  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  return { themeMode, toggleThemeMode };
};