import './App.css';
import SimpleStat from './components/cards/simple-stat';
import CssBaseline from '@mui/material/CssBaseline';
import StatContainer from './components/stats/stat-container';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container } from '@mui/system';

export const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
    },
    secondary: {
      main: '#ff9100',
    },
  },
};

const theme = createTheme(themeOptions);


function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box sx={{
          backgroundColor: 'background.default',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}>
          <Paper elevation={4} sx={{
            margin: '4rem',
            padding: '2rem',
          }}>
            <StatContainer />
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
