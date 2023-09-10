import { FC } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardWrapper = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        height: '100%',
    })
);

const Dashboard: FC = () => {
    return (
        <DashboardWrapper>
            <Sidebar />
            <Header />
        </DashboardWrapper>
    );
};

export default Dashboard;
