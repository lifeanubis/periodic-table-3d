import React, { createContext, useContext, useState } from 'react';
import { colorsBlue, colorsGreen, colorsGold } from '../utils/colorConstants';

const themes = {
  blue: colorsBlue,
  green: colorsGreen,
  gold: colorsGold,
};

const ThemeContext = createContext({
  theme: themes.blue,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('blue');
  const setTheme = (name) => setThemeName(name);
  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
