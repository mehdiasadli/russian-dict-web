import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { usePreferences } from '../store/usePreferences';

const theme: MantineThemeOverride = {
  defaultRadius: 'lg',
  primaryColor: 'teal',
};

const Mantine = ({ children }: { children: React.ReactNode }) => {
  const { scheme } = usePreferences();

  return (
    <MantineProvider theme={{ ...theme, colorScheme: scheme }} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
};

export default Mantine;
