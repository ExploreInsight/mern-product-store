import { useState, useEffect } from 'react';

const useDarkMode = () => {
  // Detect system preference for dark mode
  const getSystemPreference = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setIsDarkMode] = useState(getSystemPreference());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listener to detect changes in system theme preference
    const handleSystemThemeChange = (e) => {
      setIsDarkMode(e.matches);
      document.body.classList.toggle('dark-mode', e.matches);
    };

    // Apply initial system preference
    document.body.classList.toggle('dark-mode', isDarkMode);

    // Add listener to detect future changes
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Clean up listener on unmount
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
