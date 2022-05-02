import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';

import ThemeProvider from './theme/ThemeProvider';
import routes from './router/Routes';

const App: FC = () => {
    /* Use javascript object (rather than <Routes>) to define routes */
    const router = useRoutes(routes);

    return (
        <ThemeProvider>
            <CssBaseline />
            {router}
        </ThemeProvider>
    );
};

export default App;
