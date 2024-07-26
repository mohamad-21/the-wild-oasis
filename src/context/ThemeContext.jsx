import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const ThemeContext = createContext();

const systemIsDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useLocalStorageState(systemIsDarkMode ? 'dark-mode' : 'light-mode', 'theme');

  useEffect(() => {
    if (theme === 'light-mode') {
      document.documentElement.className = 'light-mode';

    } else document.documentElement.className = 'dark-mode';
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => prev === 'light-mode' ? 'dark-mode' : 'light-mode');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);