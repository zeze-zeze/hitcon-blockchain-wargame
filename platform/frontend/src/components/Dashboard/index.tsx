import { FC, useState } from 'react';
import { Box, Hidden } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardWrapper: FC = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        height: '100%',
    })
);

const Dashboard: FC = () => {
    const theme = useTheme();

    return (
        <DashboardWrapper>
            <Sidebar />
            <Header />
        </DashboardWrapper>
    );
};

export default Dashboard;
