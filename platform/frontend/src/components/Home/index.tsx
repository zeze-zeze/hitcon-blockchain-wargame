import { FC, useContext } from 'react';
import { Typography, Avatar, Grid, Box, Button, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Dashboard from '../Dashboard';
import { SidebarToggledContext, MainComponentWrapper } from '../../App';
import { Helmet } from 'react-helmet';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const Home: FC = () => {
    const user = {
        name: 'Doge',
        avatar: '/static/images/avatars/1.jpg'
    };
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { sidebarToggled, toggleSidebar } = useContext(SidebarToggledContext);

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Dashboard />
            <MainComponentWrapper sx={{ left: sidebarToggled && lgUp ? theme.sidebar.width : 0 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h3" component="h3" gutterBottom>
                            Welcome, Stranger
                        </Typography>
                        <Typography variant="subtitle2">
                            Please login first.
                        </Typography>
                    </Grid>
                </Grid>
            </MainComponentWrapper>
        </>
    );
}

export default Home;
