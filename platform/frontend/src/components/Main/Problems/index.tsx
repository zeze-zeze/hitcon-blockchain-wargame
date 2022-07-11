import { FC } from 'react';
import { Grid } from '@mui/material';
import MainWrapper from 'components/Main';

import Problem from './Problem';
import useSolvedProblems from 'hooks/useSolvedProblems';


const Problems: FC = () => {
    const { getSolvedProblems } = useSolvedProblems();
    const solvedProblems = getSolvedProblems();
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
