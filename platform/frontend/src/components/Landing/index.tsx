import { ChangeEvent, FC, useCallback, useContext, useState } from 'react';
import {
    Box,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { styled, useTheme } from '@mui/material/styles';
import LanguageContext from 'contexts/LanguageContext';
import WaitEffect from 'components/WaitEffect';
import WaitEffectContext from "contexts/WaitEffectContext";
import axios, { AxiosError, AxiosResponse } from "axios";

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

    const [tokenDialogOpen, setTokenDialogOpen] = useState<boolean>(false);
    const [anonymDialogOpen, setAnonymDialogOpen] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const { lang, changeLang, multiLang } = useContext(LanguageContext);
    const theme = useTheme();
    const minWidthUp = useMediaQuery("(min-width:1100px)");
    const navigate = useNavigate();
    const { setShowBackDrop, setShowSnackBar, setErrorMessage, setSuccessMessage } = useContext(WaitEffectContext);

    const handleLogin = useCallback(async (anonym: boolean) => {
        if (anonym) {
            setAnonymDialogOpen(false);
        } else {
            setTokenDialogOpen(false);
        }
        setShowBackDrop(true);
        try {
            if (anonym) {
                await axios
                .post(process.env.REACT_APP_BASE_API_URL + "/login", {
                    type: "anonymous",
                }, {
                    withCredentials: true
                });
            } else {
                await axios
                .post(process.env.REACT_APP_BASE_API_URL + "/login", {
                    type: "token",
                    token: token,
                }, {
                    withCredentials: true
                });
            }
            setSuccessMessage(multiLang?.success.login);
            setShowSnackBar(1);
            setTimeout(() => {
                setShowBackDrop(false);
                setShowSnackBar(0);
                navigate("/home");
            }, 2000);
            
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.code === "ERR_BAD_REQUEST") {
                    const response: AxiosResponse = err.response as AxiosResponse;
                    if (!response.data.ok) {
                        const errMessage = response.data.message
                        if (errMessage === "Invalid Token") {
                            setErrorMessage(multiLang?.error.invalidToken);
                        } else if (errMessage === "Permission denied") {
                            setErrorMessage(multiLang?.error.loginPermissionDenied);
                        } else if (errMessage === "Invalid login type") {
                            setErrorMessage(multiLang?.error.invalidLoginType);
                        } else {
                            setErrorMessage(multiLang?.error.serverError);
                        }
                    }
                } else {
                    setErrorMessage(multiLang?.error.serverError);
                }
                
            } else {
                setErrorMessage(multiLang?.error.unexpectedError);
            }
            setShowSnackBar(2);
            setShowBackDrop(false);
        }
    }, [token, multiLang]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Hitcon Wargame</title>
            </Helmet>
            <WaitEffect />
            { /* login with token dialog */ }
            <Dialog
                open={tokenDialogOpen}
                onClose={() => setTokenDialogOpen(false)}
            >
                <DialogTitle id="dialog-title">
                    {multiLang?.landing.dialogs[0].title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-content">
                        {multiLang?.landing.dialogs[0].content}
                    </DialogContentText>
                    <Box>
                        <TextField
                            required
                            id="jwt"
                            placeholder="eyJhbGci..."
                            value={token}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setToken(event.target.value)}
                            fullWidth
                            sx={{
                                mt: theme.spacing(2)
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTokenDialogOpen(false)}>
                        {multiLang?.landing.dialogs[0].buttons.cancel}
                    </Button>
                    <Button onClick={() => handleLogin(false)}>
                        {multiLang?.landing.dialogs[0].buttons.submit}
                    </Button>
                </DialogActions>
            </Dialog>
            { /* login anonymously dialog */ }
            <Dialog
                open={anonymDialogOpen}
                onClose={() => setAnonymDialogOpen(false)}
            >
                <DialogTitle id="dialog-title">
                    {multiLang?.landing.dialogs[1].title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-content">
                        {multiLang?.landing.dialogs[1].content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAnonymDialogOpen(false)}>
                        {multiLang?.landing.dialogs[1].buttons.cancel}
                    </Button>
                    <Button onClick={() => handleLogin(true)}>
                        {multiLang?.landing.dialogs[1].buttons.submit}
                    </Button>
                </DialogActions>
            </Dialog>
            <LandingWrapper sx={{ width: minWidthUp ? '50%' : '550px' }}>
                <LandingCard>
                    <Grid spacing={10} container>
                        <Grid item mx="auto">
                            <LandingHeaderTypography variant="h1">
                                {multiLang?.landing.title}
                            </LandingHeaderTypography>
                            <LandingSubLandingHeaderTypography
                                sx={{ lineHeight: 1.5, pb: 4 }}
                                variant="h4"
                                color="text.secondary"
                                fontWeight="normal"
                            >
                                {multiLang?.landing.subtitle}
                            </LandingSubLandingHeaderTypography>
                            <FormControl fullWidth>
                                <InputLabel id="lang-label">{multiLang?.landing.lang}</InputLabel>
                                <Select
                                    labelId="lang-label"
                                    id="lang-select"
                                    value={lang}
                                    label="Lang"
                                    onChange={(event: SelectChangeEvent) => {
                                        const appointedLang: string = event.target.value;
                                        changeLang(appointedLang);
                                    }}
                                >
                                    <MenuItem value="en-US">English</MenuItem>
                                    <MenuItem value="zh-TW">繁體中文</MenuItem>
                                </Select>
                            </FormControl>
                            <LandingButtonsWrapper>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => {
                                        setTokenDialogOpen(true);
                                    }}
                                    sx={{ margin: theme.spacing(3) }}
                                >
                                    {multiLang?.landing.buttons[0].text}
                                </Button>
                                <Button
                                    color="error"
                                    variant="contained"
                                    size="large"
                                    onClick={() => {
                                        setAnonymDialogOpen(true);
                                    }}
                                    sx={{ margin: theme.spacing(3) }}
                                >
                                    {multiLang?.landing.buttons[1].text}
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