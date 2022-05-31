import { Box, Button, Card, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
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
)

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
        justifyContent: 'center',
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
                            <LandingHeaderTypography component="h1" variant="h1">
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
                                <Button
                                    component={Link}
                                    to="/login"
                                    variant="contained"
                                    color="success"
                                    style={{ margin: theme.spacing(1) }}
                                >
                                    Login
                                </Button>
                                <Button
                                    component={Link}
                                    to="/register"
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: theme.spacing(1) }}
                                >
                                    Register
                                </Button>
                            </LandingButtonsWrapper>
                        </Grid>
                    </Grid>
                </LandingCard>
            </LandingWrapper>
        </HelmetProvider>
    );
}

export default Landing;
