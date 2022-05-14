import { useEffect, FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

/* TODO: nprogress is not successfully loaded. */
import NProgress from 'nprogress';

const SuspenseComponentWrapper: FC = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })
);

const SuspenseComponent: FC = () => {
    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, []);
    return (
        <SuspenseComponentWrapper>
            <CircularProgress />
        </SuspenseComponentWrapper>
    );
};

export default SuspenseComponent;
