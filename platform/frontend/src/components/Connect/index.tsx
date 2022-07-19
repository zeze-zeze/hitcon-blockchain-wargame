import { FC, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Grid,
    Snackbar,
    Typography,
    useMediaQuery
} from '@mui/material';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import axios from 'axios';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled, useTheme } from '@mui/material/styles';
import urlJoin from 'url-join';
import WaitEffect from 'components/WaitEffect';
import ConnectButton from './ConnectButton';

type LoginResponse = {
    auth: boolean;
    errText?: string; 
};

const LoginAvatar = styled(Avatar)(
    ({ theme }) => ({
        backgroundColor: theme.colors.error.light,
        width: '128px',
        height: '128px',
        margin: 'auto',
    })
);

const LandingWrapper = styled(Container)(
    () => ({
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
    () => ({
        display: 'flex',
        justifyContent: 'space-evenly',
    })
);

const Landing: FC = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);
    const [showSnackBar, setShowSnackBar] = useState<number>(0);

    const handleLogin = async () => {
        setShowBackDrop(true);
        const url: string | undefined = process.env.REACT_APP_BASE_API_URL;
        if (url === undefined) {
            return;
        }
        const loginUrl: string = urlJoin(url, 'login');
        axios.post<LoginResponse>(loginUrl, {
            
        });
        setShowBackDrop(false);
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Hitcon Wargame</title>
            </Helmet>
            <WaitEffect
                showBackDrop={showBackDrop}
                showSnackBar={showSnackBar}
                setShowSnackBar={setShowSnackBar}
            />
            <LandingWrapper sx={{ width: mdUp ? '50%' : '450px' }}>
                <LandingCard>
                    <Grid spacing={10} container>
                        <Grid item md={10} lg={8} mx="auto">
                            <LoginAvatar>
                                <AccountBalanceWalletIcon sx={{ fontSize: '72px' }} />
                            </LoginAvatar>
                            <LandingHeaderTypography variant="h1">
                                Connect Wallet
                            </LandingHeaderTypography>
                            <LandingSubLandingHeaderTypography
                                sx={{ lineHeight: 1.5, pb: 4 }}
                                variant="h4"
                                color="text.secondary"
                                fontWeight="normal"
                            >
                                Before you start playing Hitcon Wargame, please connect your wallet first.
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
