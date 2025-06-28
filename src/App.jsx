import { ThemeProvider, useTheme } from './theme/ThemeContext';
import PeriodicTableFull from './components/PeriodicTableFull';
import GlobalBgScene from './components/GlobalBgScene';
import GlobalLiquidScene from './components/GlobalLiquidScene';
import { useState, useEffect } from 'react';
import GlobalSolidScene from './components/GlobalSolidScene';

function ThemedApp() {
  const { theme } = useTheme();
  const cardBG_Left = theme.background;
  const cardBG_Right = theme.cellBG_5;
  const cardBG_Center = theme.cellBG_8;

  const [elementState, setElementState] = useState('gas');

  // Function to request landscape orientation
  const requestLandscape = async () => {
    try {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape');
      }
    } catch (error) {
      console.log('Orientation lock not supported or failed:', error);
    }
  };

  // Request landscape on component mount
  useEffect(() => {
    requestLandscape();

    // Optional: Listen for orientation changes
    const handleOrientationChange = () => {
      console.log('Orientation changed to:', screen.orientation?.angle);
    };

    if (screen.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange);

      return () => {
        screen.orientation.removeEventListener(
          'change',
          handleOrientationChange,
        );
      };
    }
  }, []);

  return (
    <>
      {/* Rotation message for mobile portrait mode */}
      <div className="rotate-message">
        <div className="text-2xl mb-4">📱</div>
        <div className="text-lg mb-2">Please rotate your device</div>
        <div className="text-sm opacity-75">
          This app works best in landscape mode
        </div>
      </div>

      {/* Main content */}
      <div
        className="main-content"
        style={{
          background: `linear-gradient(90deg,  ${cardBG_Left} 100%)`,
          transition: 'background 5s ease',
        }}
      >
        <div className="flex justify-center overflow-auto lg:overflow-hidden  items-center backdrop-blur-2xl w-screen h-screen">
          <div className="h-screen w-screen ">
            {elementState === 'liquid' && <GlobalLiquidScene />}
            {elementState === 'gas' && <GlobalBgScene theme={theme} />}
            {elementState === 'solid' && <GlobalSolidScene />}
          </div>
          <div className="h-screen w-screen ">
            <PeriodicTableFull setElementState={setElementState} />
          </div>
        </div>
      </div>
    </>
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
