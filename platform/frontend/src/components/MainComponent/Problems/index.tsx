import { FC } from 'react';
import { Grid, Box, Card, Button, Container, CardContent, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { MainWrapper, HeaderWrapper, HeaderTypography, SubtitleTypography } from '..';
import EmojiFlagsTwoToneIcon from '@mui/icons-material/EmojiFlagsTwoTone';

const StatusBadge = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(0.5, 1),
        borderRadius: theme.general.borderRadiusSm,
        textAlign: 'center',
        display: 'inline-block',
        lineHeight: 1,
        fontSize: theme.typography.pxToRem(11),
    })
);

const ProblemCard: FC = styled(Card)(
    ({ theme }) => ({
        height: '240px',
        margin: theme.spacing(6),
    })
);

const ProblemWrapper: FC = styled(CardContent)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'stretch',
        padding: theme.spacing(2),
    })
);

const ProblemTitle: FC = styled(Typography)(
    ({ theme }) => ({
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })
);

const ProblemContent: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    })
);

const Problems: FC = () => {
    const theme = useTheme();

    return (
        <MainWrapper>
            <Grid container>
                <Grid item xs={4}>
                    <ProblemCard>
                        <ProblemWrapper>
                            <ProblemTitle variant="h4" noWrap>
                                <Box sx={{ marginRight: theme.spacing(0.5) }}>
                                    <EmojiFlagsTwoToneIcon />
                                </Box>
                                Problem 1
                                <Box sx={{ marginLeft: theme.spacing(0.5) }}>
                                    <EmojiFlagsTwoToneIcon />
                                </Box>
                            </ProblemTitle>
                            <ProblemContent>
                                <Typography variant="h2">
                                    Fallback
                                </Typography>
                                <StatusBadge sx={{
                                    background: theme.palette.success.main,
                                    color: theme.palette.success.contrastText,
                                }}>
                                    Solved
                                </StatusBadge>
                                <Button variant="contained" style={{ marginTop: theme.spacing(2) }}>
                                    Start Challenge
                                </Button>
                            </ProblemContent>
                        </ProblemWrapper>
                    </ProblemCard>
                </Grid>
            </Grid>
        </MainWrapper>
    );
}

export default Problems;
