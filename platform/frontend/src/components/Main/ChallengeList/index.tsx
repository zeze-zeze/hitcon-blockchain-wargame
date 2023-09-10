import { FC, useContext, useRef } from 'react';
import { Grid } from '@mui/material';
import MainWrapper, { HeaderTypography, HeaderWrapper, SubtitleTypography } from 'components/Main';
import ChallengeCard from './ChallengeCard';
import LanguageContext from 'contexts/LanguageContext';
import Web3Context from 'contexts/Web3Context';
import { Container } from '@mui/system';
import { useTheme } from "@mui/material/styles";

type ChallengeType = {
    title: string;
    description: string;
    tutorial: string;
};

const ChallengeList: FC = () => {
    const theme = useTheme();
    const { solved } = useContext(Web3Context);
    const { multiLang } = useContext(LanguageContext);
    const challengesRef = useRef<ChallengeType[]>(multiLang?.challenges.list);

    return (
        <MainWrapper title="Challenges">
            <Grid item xs={12}>
                <HeaderWrapper>
                    <HeaderTypography>
                        {multiLang?.challenges.title}
                    </HeaderTypography>
                    <SubtitleTypography>
                        {multiLang?.challenges.subtitle}
                    </SubtitleTypography>
                </HeaderWrapper>
            </Grid>
            <Grid container justifyContent="center">
                {
                    challengesRef.current &&
                    challengesRef.current.map(({ title }, idx) => {
                        return (
                            <ChallengeCard
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

export default ChallengeList;
