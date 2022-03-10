import { ThemeOptions } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export interface ThemeType {
  name: string;
  label: string;
  theme: ThemeOptions;
}

export const themes: ThemeType[] = [
  {
    name: 'aize',
    label: 'Aize',
    theme: {
      palette: { mode: 'light' },
      components: {
        MuiTabs: {
          variants: [
            {
              props: { variant: 'fullWidth' },
              style: {
                css: {
                  backgroundColor: green,
                },
              },
            },
          ],
          defaultProps: {
            variant: 'fullWidth',
          },
          styleOverrides: {
            root: {
              css: {
                backgroundColor: green,
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              css: {
                backgroundColor: green,
              },
            },
          },
        },
      },
    },
  },
  {
    name: 'default',
    label: 'Default',
    theme: {
      palette: { mode: 'light' },
    },
  },
  {
    name: 'dark',
    label: 'Dark',
    theme: { palette: { mode: 'dark' } },
  },
];
