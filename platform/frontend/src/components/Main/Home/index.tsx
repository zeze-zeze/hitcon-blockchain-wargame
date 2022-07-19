import { FC, ReactChild } from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Typography, Paper, Container, Button, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MainWrapper, { 
    HeaderWrapper,
    HeaderTypography,
    SubHeaderTypography,
    SubtitleTypography,
    PaperCenteredComponentWrapper,
} from 'components/Main';

type FixedSubHeaderTypographyProps = {
    children: ReactChild,
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

    return (
        <MainWrapper title="Home">
            <Grid container>
                <Grid item xs={12}>
                    <HeaderWrapper>
                        <HeaderTypography>
                            Hitcon Blockchain Wargame
                        </HeaderTypography>
                        <SubtitleTypography>
                            Hitcon Blockchain Wargame is a Web3/Solidity Game. Each level is a smart contract that needs to be 'hacked'
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
                                    New to blockchain?
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
                                    Start Tutorial
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
                                    Already familiar with blockchain?
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
                                    Start Playing
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
