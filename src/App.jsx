import { ThemeProvider, useTheme } from './theme/ThemeContext';
import PeriodicTableFull from './components/PeriodicTableFull';

function ThemedApp() {
  const { theme } = useTheme();
  const cardBG_Left = theme.background;
  const cardBG_Right = theme.cellBG_5;

  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${cardBG_Left} 0%, ${cardBG_Right} 100%)`,
        transition: 'background 5s ease',
      }}
      className="flex justify-center items-center backdrop-blur-2xl h-screen"
    >
      <PeriodicTableFull />
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
