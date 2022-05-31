import { FC } from 'react';
import { Grid, Box, Card, Button, CardContent, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import MainWrapper from '..';
import EmojiFlagsTwoToneIcon from '@mui/icons-material/EmojiFlagsTwoTone';

const StatusBadge = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(0.75, 1.5),
        borderRadius: theme.general.borderRadiusSm,
        textAlign: 'center',
        display: 'inline-block',
        lineHeight: 1,
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(11),
    })
);

const ProblemCard: FC = styled(Card)(
    ({ theme }) => ({
        height: '240px',
        minWidth: '240px',
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

const Problem: FC = ({ index, title, solved }) => {
    const theme = useTheme();
    return (
        <ProblemCard>
            <ProblemWrapper>
                <ProblemTitle variant="h4" noWrap>
                    <Box sx={{ marginRight: theme.spacing(0.5) }}>
                        <EmojiFlagsTwoToneIcon />
                    </Box>
                    Problem {index}
                    <Box sx={{ marginLeft: theme.spacing(0.5) }}>
                        <EmojiFlagsTwoToneIcon />
                    </Box>
                </ProblemTitle>
                <ProblemContent>
                    <Typography variant="h2">
                        {title}
                    </Typography>
                    <StatusBadge sx={{
                        background: solved ? theme.palette.success.main : theme.palette.error.main,
                        color: theme.colors.alpha.white[100],
                    }}>
                        Solved
                    </StatusBadge>
                    <Button variant="contained" style={{ marginTop: theme.spacing(2) }}>
                        Start Challenge
                    </Button>
                </ProblemContent>
            </ProblemWrapper>
        </ProblemCard>
    );
};

const Problems: FC = () => {
    const problems = [
        {
            "title": "Fallback",
        },
        {
            "title": "Fallout",
        },
        {
            "title": "Coin Flip",
        },
        {
            "title": "Telephone",
        },
        {
            "title": "Token",
        },
        {
            "title": "Delegation",
        },
    ];

    return (
        <MainWrapper>
            <Grid container justifyContent="center">
                {
                    problems.map(({ title }, index) => {
                        return (
                            <Problem
                                key={index}
                                index={index + 1}
                                title={title}
                                solved={true}
                            />
                        );
                    })
                }
            </Grid>
        </MainWrapper>
    );
}

export default Problems;
