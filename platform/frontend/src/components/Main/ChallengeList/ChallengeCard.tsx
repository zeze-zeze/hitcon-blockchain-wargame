import { FC, useContext } from 'react';
import { Box, Card, Button, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import EmojiFlagsTwoToneIcon from '@mui/icons-material/EmojiFlagsTwoTone';
import LanguageContext from 'contexts/LanguageContext';

type ChallengeProps = {
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

const ChallengeCardWrapper = styled(Card)(
    ({ theme }) => ({
        height: '240px',
        minWidth: '240px',
        margin: theme.spacing(0, 6, 12, 6),
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px',
    })
);

const ChallengeContainer = styled(CardContent)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'stretch',
        padding: theme.spacing(2),
    })
);

const ChallengeTitle = styled(Typography)(
    ({ theme }) => ({
        margin: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    })
);

const ChallengeContent = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    })
);

const ChallengeCard: FC<ChallengeProps> = ({ index, title, solved }) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { multiLang } = useContext(LanguageContext);

    return (
        <ChallengeCardWrapper>
            <ChallengeContainer>
                <ChallengeTitle variant="h4" noWrap>
                    <Box sx={{ marginRight: theme.spacing(0.5) }}>
                        <EmojiFlagsTwoToneIcon />
                    </Box>
                    { multiLang?.challenges.challenge } {index}
                    <Box sx={{ marginLeft: theme.spacing(0.5) }}>
                        <EmojiFlagsTwoToneIcon />
                    </Box>
                </ChallengeTitle>
                <ChallengeContent>
                    <Typography variant="h2">
                        {title}
                    </Typography>
                    <StatusBadge sx={{
                        background: solved ? theme.palette.success.main : theme.palette.error.main,
                    }}>
                        {solved ? multiLang?.challenges.solved : multiLang?.challenges.notSolved }
                    </StatusBadge>
                    <Button
                        variant="contained"
                        style={{ marginTop: theme.spacing(2) }}
                        onClick={() => {
                            navigate(`/challenges/${index}`);
                        }}
                    >
                        { multiLang?.challenges.buttonText }
                    </Button>
                </ChallengeContent>
            </ChallengeContainer>
        </ChallengeCardWrapper>
    );
};

export default ChallengeCard;
