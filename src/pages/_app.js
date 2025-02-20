import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  );
}

export default MyApp; 