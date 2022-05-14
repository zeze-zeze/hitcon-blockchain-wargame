import { FC, useContext } from 'react';
import { Typography, Avatar, Grid, Card, CardContent, Box, Button, useMediaQuery, Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Dashboard from '../Dashboard';
import { SidebarToggledContext, MainComponentWrapper } from '../../App';
import { Helmet } from 'react-helmet';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const ProblemsComponentWrapper: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-around',
        alignItem: 'center',
    })
);

const ProblemsCard: FC = styled(Card)(
    ({ theme }) => ({
        width: '324px',
        height: '200px',
    })
);

const Problems: FC = () => {
    const user = {
        name: 'Doge',
        avatar: '/static/images/avatars/1.jpg'
    };
    const theme = useTheme();
    const { sidebarToggled, toggleSidebar, lgUp } = useContext(SidebarToggledContext);

    return (
        <>
            <Helmet>
                <title>Problems</title>
            </Helmet>
            <Dashboard />
            <MainComponentWrapper sx={{
                left: sidebarToggled && lgUp ? theme.sidebar.width : 0,
                width: sidebarToggled && lgUp ? `calc(100% - ${theme.sidebar.width})` : '100%',
            }}>
                <Container>
                    <ProblemsCard>
                        <CardContent>
                            <Typography variant="h5" noWrap>
                                Problem 1
                            </Typography>
                        </CardContent>
                    </ProblemsCard>
                    <ProblemsCard>
                        <CardContent>
                            <Typography variant="h5" noWrap>
                                Problem 2
                            </Typography>
                        </CardContent>
                    </ProblemsCard>
                    <ProblemsCard>
                        <CardContent>
                            <Typography variant="h5" noWrap>
                                Problem 3
                            </Typography>
                        </CardContent>
                    </ProblemsCard>
                    <ProblemsCard>
                        <CardContent>
                            <Typography variant="h5" noWrap>
                                Problem 4
                            </Typography>
                        </CardContent>
                    </ProblemsCard>
                    <ProblemsCard>
                        <CardContent>
                            <Typography variant="h5" noWrap>
                                Problem 5
                            </Typography>
                        </CardContent>
                    </ProblemsCard>
                </Container>
            </MainComponentWrapper>
        </>
    );
}

export default Problems;
