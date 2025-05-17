import { Button, CssBaseline, Typography, Box } from '@mui/material';
import { useThemeContext } from './Theme/CustomThemeProvider';
import PageContainer from './Components/PageContainer';
import LgBox from './Components/LgBox';
import AppRoutes from './Routes/AppRoutes';

function App() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <>
      <CssBaseline />
      <AppRoutes />
    </ >
  );
}

export default App;
