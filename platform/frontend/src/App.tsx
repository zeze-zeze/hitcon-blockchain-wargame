import { FC, useState, createContext } from 'react';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';

import ThemeProvider from './theme/ThemeProvider';
import routes from './router/Routes';

const MainComponentWrapper: FC = styled(Box)(
    ({ theme }) => ({
        position: 'absolute',
        justifyContent: 'center',
        top: theme.header.height,
    })
);

const SidebarToggledContext = createContext<any>();

const App: FC = () => {
    /* Use javascript object (rather than <Routes>) to define routes */
    const router = useRoutes(routes);

    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const [sidebarToggled, setSidebarToggled] = useState<boolean>(lgUp);
    const toggleSidebar = () => setSidebarToggled(!sidebarToggled);

    return (
        <ThemeProvider>
            <SidebarToggledContext.Provider value={{ sidebarToggled, toggleSidebar, lgUp }}>
                <CssBaseline />
                {router}
            </SidebarToggledContext.Provider>
        </ThemeProvider>
    );
};

export { SidebarToggledContext, MainComponentWrapper };
export default App;
