import { FC, useContext } from 'react';
import { Typography, Avatar, Grid, Box, Button, Paper, useMediaQuery, Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Dashboard from '../Dashboard';
import { SidebarToggledContext, MainComponentWrapper } from '../../App';
import { Helmet } from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars-2';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const HeaderWrapper: FC = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    })
);

const HeaderTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h1" sx={{ margin: theme.spacing(1, 0) }}>
        { children }
        </Typography>
    )
};

const SubtitleTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="subtitle1" sx={{ margin: theme.spacing(1, 0) }}>
        { children }
        </Typography>
    )
};

const SubHeaderTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h2" sx={{ margin: theme.spacing(3, 0) }}>
        { children }
        </Typography>
    )
};

const BodyTypography: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography variant="h6" component="p" sx={{ margin: theme.spacing(2, 0) }}>
        { children }
        </Typography>
    )
};

const PaperComponentWrapper: FC = styled(Paper)(
    ({ theme }) => ({
        padding: theme.spacing(3),
    })
);

const Home: FC = () => {
    const user = {
        name: 'Doge',
        avatar: '/static/images/avatars/1.jpg'
    };
    const theme = useTheme();
    const { sidebarToggled, toggleSidebar, lgUp } = useContext(SidebarToggledContext);

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Dashboard />
            <MainComponentWrapper sx={{
                left: sidebarToggled && lgUp ? theme.sidebar.width : 0,
                width: sidebarToggled && lgUp ? `calc(100% - ${theme.sidebar.width})` : '100%',
            }}>
                <Scrollbars autoHide>
                    <Container>
                        <Grid container>
                            <Grid item xs={12}>
                                <HeaderWrapper>
                                    <HeaderTypography>
                                        The Ethernaut
                                    </HeaderTypography>
                                    <SubtitleTypography>
                                        The Ethernaut is a Web3/Solidity based wargame inspired on overthewire.org, played in the Ethereum Virtual Machine. Each level is a smart contract that needs to be 'hacked'.
                                    </SubtitleTypography>
                                    <SubtitleTypography>
The game is 100% open source and all levels are contributions made by other players. Do you have an interesting idea? PRs are welcome at github.com/OpenZeppelin/ethernaut.
                                    </SubtitleTypography>
                                    <SubtitleTypography>
Are you interested in smart contract development or security? Does securing the world’s blockchain infrastructure sound exciting to you? We are hiring!
                                    </SubtitleTypography>
                                    <SubtitleTypography>
You like the game but your language is not available? Contribute a translation!
                                    </SubtitleTypography>
                                    <Button variant="contained" color="success" sx={{ marginTop: theme.spacing(4) }}>
                                        Get started!
                                    </Button>
                                </HeaderWrapper>
                            </Grid>
                        </Grid>
                    </Container>
                </Scrollbars>
            </MainComponentWrapper>
        </>
    );
}

export default Home;
