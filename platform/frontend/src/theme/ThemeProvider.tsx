import { FC, ReactNode } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import MainTheme from './MainTheme';

interface ThemeProviderProps {
    children?: ReactNode;
}

/* Overwrite default Material UI style */
const ThemeProviderWrapper: FC<ThemeProviderProps> = (props) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={MainTheme}>
                {props.children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default ThemeProviderWrapper;
