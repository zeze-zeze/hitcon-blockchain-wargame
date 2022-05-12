import { useEffect, FC } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import NProgress from 'nprogress';

const SuspenseComponentWrapper = styled(Box)(
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
