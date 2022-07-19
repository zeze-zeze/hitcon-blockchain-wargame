import { FC, useContext, useRef } from 'react';
import { Grid } from '@mui/material';
import MainWrapper from 'components/Main';

import Problem from './Problem';
import useSolvedProblems from 'hooks/useSolvedProblems';
import LanguageContext from 'contexts/LanguageContext';

type ChallengeType = {
    title: string;
    description: string;
    tutorial: string;
};

const Problems: FC = () => {
    const { getSolvedProblems } = useSolvedProblems();
    const solvedProblems = getSolvedProblems();
    const { multiLang } = useContext(LanguageContext);
    const challengesRef = useRef<Array<ChallengeType>>(multiLang?.problems.challenges);

    return (
        <MainWrapper title="Problems">
            <Grid container justifyContent="center">
                {
                    challengesRef.current.map(({ title }, idx) => {
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
