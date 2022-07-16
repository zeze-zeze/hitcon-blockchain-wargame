import { FC, useState, useCallback, useContext } from 'react';
import {
    Box,
    Button,
    Card,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { styled, useTheme } from '@mui/material/styles';
import LanguageContext from 'contexts/LanguageContext';

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
    const { lang, setLang, multiLang } = useContext(LanguageContext);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));
    const navigate = useNavigate();
    
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
                                        setLang(appointedLang);
                                        localStorage.setItem("_lang_", appointedLang);
                                    }}
                                >
                                    <MenuItem value="en-US">English</MenuItem>
                                    <MenuItem value="zh-TW">繁體中文</MenuItem>
                                </Select>
                            </FormControl>
                            <LandingButtonsWrapper>
                                <Grid item xs={6} mx="auto">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => {
                                            window.location.href = 'https://hitcon.org/2022/';
                                        }}
                                        sx={{ margin: theme.spacing(3) }}
                                    >
                                        {multiLang?.landing.buttons[0].text}
                                    </Button>
                                </Grid>
                                <Grid item xs={6} mx="auto">
                                    <Button
                                        color="error"
                                        variant="contained"
                                        size="large"
                                        onClick={() => {
                                            navigate('/home');
                                        }}
                                        sx={{ margin: theme.spacing(3) }}
                                    >
                                        {multiLang?.landing.buttons[1].text}
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