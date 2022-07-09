import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Button, CardContent, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import MainWrapper from 'components/Main';
import EmojiFlagsTwoToneIcon from '@mui/icons-material/EmojiFlagsTwoTone';

import useSolvedProblems from 'hooks/useSolvedProblems';

type ProblemProps = {
    index: number,
    title: string,
    solved: boolean,
}

const StatusBadge = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(0.75, 1.5),
        borderRadius: theme.general.borderRadiusSm,
        textAlign: 'center',
        display: 'inline-block',
        lineHeight: 1,
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(8),
        color: theme.colors.alpha.white[100],
    })
);

const ProblemCard = styled(Card)(
    ({ theme }) => ({
        height: '240px',
        minWidth: '240px',
        margin: theme.spacing(6),
    })
);

const ProblemWrapper = styled(CardContent)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'stretch',
        padding: theme.spacing(2),
    })
);

const ProblemTitle = styled(Typography)(
    ({ theme }) => ({
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })
);

const ProblemContent = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    })
);

const Problem: FC<ProblemProps> = ({ index, title, solved }) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const handleNavigateChallenge = () => {
        navigate(`/problems/${index}`);
    };

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
                    }}>
                        { solved ? 'Solved' : 'Not solved' }
                    </StatusBadge>
                    <Button
                        variant="contained"
                        style={{ marginTop: theme.spacing(2) }}
                        onClick={ handleNavigateChallenge }
                    >
                        Start Challenge
                    </Button>
                </ProblemContent>
            </ProblemWrapper>
        </ProblemCard>
    );
};

const Problems: FC = () => {
    const { solvedProblems } = useSolvedProblems();
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
        <MainWrapper title="Problems">
            <Grid container justifyContent="center">
                {
                    problems.map(({ title }, idx) => {
                        return (
                            <Problem
                                key={idx}
                                index={idx + 1}
                                title={title}
                                solved={solvedProblems[idx]}
                            />
                        );
                    })
                }
            </Grid>
        </MainWrapper>
    );
}

export default Problems;
