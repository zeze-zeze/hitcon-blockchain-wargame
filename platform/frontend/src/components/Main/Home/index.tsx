import { FC, ReactNode, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Typography, Paper, Container, Button, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MainWrapper, { 
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    PaperCenteredComponentWrapper,
} from 'components/Main';
import LanguageContext from "contexts/LanguageContext";

type FixedSubHeaderTypographyProps = {
    children: ReactNode,
};

const FixedSubHeaderContainer = styled(Container)(
    ({ theme }) => ({
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })
);

const FixedButtonContainer = styled(Container)(
    ({ theme }) => ({
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    })
);

const FixedSubHeaderTypography: FC<FixedSubHeaderTypographyProps> = ({ children }) => {
    const theme = useTheme();
    return (
        <Typography align="center" variant="h2" component="h2">
        { children }
        </Typography>
    )
};

const Home: FC = () => {

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"));
    const { multiLang } = useContext(LanguageContext);

    return (
        <MainWrapper title="Home">
            <Grid container>
                <Grid item xs={12}>
                    <HeaderWrapper>
                        <HeaderTypography>
                            {multiLang?.home.title}
                        </HeaderTypography>
                        <SubtitleTypography>
                            {multiLang?.home.subtitle}
                        </SubtitleTypography>
                    </HeaderWrapper>
                </Grid>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={smUp ? 6 : 12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <PaperCenteredComponentWrapper sx={{
                            width: '75%',
                            height: '240px',
                            margin: theme.spacing(5),
                        }}>
                            <FixedSubHeaderContainer>
                                <FixedSubHeaderTypography>
                                    {multiLang?.home.cards[0].title}
                                </FixedSubHeaderTypography>
                            </FixedSubHeaderContainer>
                            <FixedButtonContainer>
                                <Button
                                    component={NavLink}
                                    to="/tutorial"
                                    variant="contained"
                                    size="large"
                                    color="success"
                                    sx={{ 'textAlign': 'center' }}
                                >
                                    {multiLang?.home.cards[0].buttonText}
                                </Button>
                            </FixedButtonContainer>
                        </PaperCenteredComponentWrapper>
                    </Grid>
                    <Grid item xs={smUp ? 6 : 12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <PaperCenteredComponentWrapper sx={{
                            width: '75%',
                            height: '240px',
                            margin: theme.spacing(5),
                        }}>
                            <FixedSubHeaderContainer>
                                <FixedSubHeaderTypography>
                                    {multiLang?.home.cards[1].title}
                                </FixedSubHeaderTypography>
                            </FixedSubHeaderContainer>
                            <FixedButtonContainer>
                                <Button
                                    component={NavLink}
                                    to="/problems"
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    sx={{ 'textAlign': 'center' }}
                                >
                                    {multiLang?.home.cards[1].buttonText}
                                </Button>
                            </FixedButtonContainer>
                        </PaperCenteredComponentWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </MainWrapper>
    );
}

export default Home;
