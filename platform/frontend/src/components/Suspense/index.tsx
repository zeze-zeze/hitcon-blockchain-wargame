import { useEffect, FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import NProgress from 'nprogress';

const SuspenseComponent: FC = () => {
    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    });
    return (
        <Box
            sx={{
                position: 'fixed',
                display: 'block',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
            }}
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress />
        </Box>
    );
};

export default SuspenseComponent;
