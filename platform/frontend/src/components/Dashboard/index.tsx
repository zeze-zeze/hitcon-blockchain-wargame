import { FC, useState } from 'react';
import { Box, Hidden } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardWrapper: FC = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        height: '100%',
    })
);

const Dashboard: FC = () => {
    const [sidebarToggled, setSidebarToggled] = useState<boolean>(false);
    const toggleSidebar = () => {
    };
    return (
        <Hidden lgDown>
            <DashboardWrapper>
                <Sidebar
                    sidebarToggled={sidebarToggled}
                    toggleSidebar={() => setSidebarToggled(!sidebarToggled)}
                />
                <Header />
            </DashboardWrapper>
        </Hidden>
    );
};

export default Dashboard;
