import { ThemeProvider, useTheme } from './theme/ThemeContext';
import PeriodicTableFull from './components/PeriodicTableFull';
import GlobalBgScene from './components/GlobalBgScene';
import GlobalLiquidScene from './components/GlobalLiquidScene';
import { useState } from 'react';
import GlobalSolidScene from './components/GlobalSolidScene';

function ThemedApp() {
  const { theme } = useTheme();
  const cardBG_Left = theme.background;
  const cardBG_Right = theme.cellBG_5;
  const cardBG_Center = theme.cellBG_8;

  const [elementState, setElementState] = useState('gas');

  return (
    <div
      style={{
        background: `linear-gradient(90deg,  ${cardBG_Left} 100%)`,
        transition: 'background 5s ease',
      }}
      className="flex justify-center items-center backdrop-blur-2xl h-screen"
    >
      <div className=" ">
        {elementState === 'liquid' && <GlobalLiquidScene />}
        {elementState === 'gas' && <GlobalBgScene theme={theme} />}
        {elementState === 'solid' && <GlobalSolidScene />}
      </div>
      <div>
        <PeriodicTableFull setElementState={setElementState} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
