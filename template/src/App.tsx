import Footer from './components/Footer';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/Navbar';
import { Box, ThemeProvider } from '@mui/material';
import AppRouter from './AppRouter';
import { MetamaskContextProvider } from './contexts/MetamaskContext';
import colorBackground from './assets/colors.png';
import { theme } from './theme';
import { HashconnectContextProvider } from './contexts/HashconnectContext';
import { HashConnectClient } from './services/wallets/hashconnect/hashconnectClient';
import "./App.css";
import { BladeContextProvider } from './contexts/BladeContext';
import { BladeClient } from './services/wallets/blade/bladeClient';
import { MetaMaskClient } from './services/wallets/metamask/metamaskClient';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BladeContextProvider>
        <MetamaskContextProvider>
          <HashconnectContextProvider>
            <HashConnectClient />
            <BladeClient />
            <MetaMaskClient />
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#222222',
                backgroundImage: `url(${colorBackground})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            >
              <header>
                <NavBar />
              </header>
              <Box
                flex={1}
                p={3}
              >
                <AppRouter />
              </Box>
              <Footer />
            </Box>
          </HashconnectContextProvider>
        </MetamaskContextProvider>
      </BladeContextProvider>
    </ThemeProvider>
  );
}

export default App;