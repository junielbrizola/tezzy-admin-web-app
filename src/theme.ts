'use client';
import { createTheme } from '@mui/material/styles';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: [ '100',  '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  shape: {
    borderRadius: 15
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;