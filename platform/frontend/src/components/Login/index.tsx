import { Avatar, Box, Button, Card, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled, useTheme } from '@mui/material/styles';
import { useWeb3React } from "@web3-react/core";
import ConnectButton from 'components/Connector';

const LoginWrapper: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(4),
    })
);

const LoginAvatar: FC = styled(Avatar)(
    ({ theme }) => ({
        backgroundColor: theme.colors.error.light,
        width: '128px',
        height: '128px',
        margin: 'auto',
    })
);

const LandingWrapper = styled(Container)(
    ({ theme }) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    })
);

const LandingCard = styled(Card)(
    ({ theme }) => ({
        padding: theme.spacing(10),
        borderRadius: '64px',
    })
)

const LandingHeaderTypography = styled(Typography)(
    ({ theme }) => ({
        fontSize: theme.typography.pxToRem(50),
        textAlign: 'center',
        padding: theme.spacing(5, 0),
    })
);

const LandingSubLandingHeaderTypography = styled(Typography)(
    ({ theme }) => ({
        fontSize: theme.typography.pxToRem(17),
        textAlign: 'center',
        paddingBottom: theme.spacing(4),
    })
);

const LandingButtonsWrapper = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-evenly',
    })
);

const Landing = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <HelmetProvider>
            <Helmet>
                <title>Hitcon Wargame</title>
            </Helmet>
            <LandingWrapper sx={{ width: mdUp ? '50%' : '450px' }}>
                <LandingCard>
                    <Grid spacing={10} container>
                        <Grid item md={10} lg={8} mx="auto">
                            <LoginAvatar>
                                <LockOutlinedIcon sx={{ fontSize: '72px' }} />
                            </LoginAvatar>
                            <LandingHeaderTypography component="h1" variant="h1">
                                Login
                            </LandingHeaderTypography>
                            <LandingSubLandingHeaderTypography
                                sx={{ lineHeight: 1.5, pb: 4 }}
                                variant="h4"
                                color="text.secondary"
                                fontWeight="normal"
                            >
                                Welcome to the hitcon wargame.
                            </LandingSubLandingHeaderTypography>
                            <LandingButtonsWrapper>
                                <ConnectButton />
                            </LandingButtonsWrapper>
                        </Grid>
                    </Grid>
                </LandingCard>
            </LandingWrapper>
        </HelmetProvider>
    );
}

export default Landing;
