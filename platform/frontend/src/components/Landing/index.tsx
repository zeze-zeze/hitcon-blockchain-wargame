import { FC } from 'react';
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { styled, useTheme } from '@mui/material/styles';

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
);

const LandingHeaderTypography = styled(Typography)(
    ({ theme }) => ({
        fontSize: theme.typography.pxToRem(50),
        textAlign: 'center',
        paddingBottom: theme.spacing(5),
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
        width: '100%',
    })
);

const Landing: FC = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const navigate = useNavigate();

    const loginOAuth = () => {
        window.location.href = 'https://hitcon.org/2022/';
    };

    const loginAnonym = () => {
        navigate('/home');
    };

    return (
        <HelmetProvider>
            <Helmet>
                <title>Hitcon Wargame</title>
            </Helmet>
            <LandingWrapper sx={{ width: mdUp ? '50%' : '450px' }}>
                <LandingCard>
                    <Grid spacing={10} container>
                        <Grid item md={10} lg={8} mx="auto">
                            <LandingHeaderTypography variant="h1">
                                Hitcon Wargame
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
                                <Grid item xs={6} mx="auto">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={loginOAuth}
                                        sx={{
                                            margin: theme.spacing(0, 3),
                                        }}
                                    >
                                        Login via Onepage
                                    </Button>
                                </Grid>
                                <Grid item xs={6} mx="auto">
                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="large"
                                        onClick={loginAnonym}
                                        sx={{
                                            margin: theme.spacing(0, 3),
                                        }}
                                    >
                                        Play Anonymously
                                    </Button>
                                </Grid>
                            </LandingButtonsWrapper>
                        </Grid>
                    </Grid>
                </LandingCard>
            </LandingWrapper>
        </HelmetProvider>
    );
}

export default Landing;