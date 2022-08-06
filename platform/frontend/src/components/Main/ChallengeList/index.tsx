import { FC, useContext, useRef } from 'react';
import { Grid } from '@mui/material';
import MainWrapper from 'components/Main';

import Challenge from './Challenge';
import LanguageContext from 'contexts/LanguageContext';
import Web3Context from 'contexts/Web3Context';

type ChallengeType = {
    title: string;
    description: string;
    tutorial: string;
};

const Challenges: FC = () => {
    const { solved } = useContext(Web3Context);
    const { multiLang } = useContext(LanguageContext);
    const challengesRef = useRef<ChallengeType[]>(multiLang?.challenges.list);

    return (
        <MainWrapper title="Challenges">
            <Grid container justifyContent="center">
                {
                    challengesRef.current &&
                    challengesRef.current.map(({ title }, idx) => {
                        return (
                            <Challenge
                                key={idx}
                                index={idx}
                                title={title}
                                solved={solved[idx]}
                            />
                        );
                    })
                }
            </Grid>
        </MainWrapper>
    );
}

export default Challenges;
