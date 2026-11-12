import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppRoutes from './routes/AppRoutes';
import LoadingScreen from './components/common/LoadingScreen';
import { FavoritesProvider } from './hooks/useFavorites';
import { ToastProvider } from './hooks/useToast';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a855f7' },
    secondary: { main: '#22d3ee' },
    background: { default: '#05060f', paper: '#0a0f24' },
  },
  typography: { fontFamily: "'Inter', system-ui, sans-serif", button: { textTransform: 'none', fontWeight: 600 } },
  shape: { borderRadius: 12 },
  components: {
    MuiTooltip: { styleOverrides: { tooltip: { backgroundColor: '#1e1b4b', fontSize: 12 } } },
    MuiRating: { styleOverrides: { iconFilled: { color: '#fcd34d' }, iconEmpty: { color: 'rgba(255,255,255,0.2)' } } },
  },
});

export default function App() {
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setBooting(false), 1100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* reducedMotion="user": honour the OS "reduce motion" setting for all Framer animations */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <FavoritesProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </FavoritesProvider>
        </BrowserRouter>
        <AnimatePresence>{booting && <LoadingScreen key="boot" />}</AnimatePresence>
      </MotionConfig>
    </ThemeProvider>
  );
}
