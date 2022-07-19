import { FC, useContext } from 'react';
import { Box, Card, Button, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import EmojiFlagsTwoToneIcon from '@mui/icons-material/EmojiFlagsTwoTone';
import LanguageContext from 'contexts/LanguageContext';

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
    const { multiLang } = useContext(LanguageContext);

    return (
        <ProblemCard>
            <ProblemWrapper>
                <ProblemTitle variant="h4" noWrap>
                    <Box sx={{ marginRight: theme.spacing(0.5) }}>
                        <EmojiFlagsTwoToneIcon />
                    </Box>
                    { multiLang?.problems.challenge } {index}
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
                        {solved ? multiLang?.problems.solved : multiLang?.problems.notSolved }
                    </StatusBadge>
                    <Button
                        variant="contained"
                        style={{ marginTop: theme.spacing(2) }}
                        onClick={() => {
                            navigate(`/problems/${index}`);
                        }}
                    >
                        { multiLang?.problems.buttonText }
                    </Button>
                </ProblemContent>
            </ProblemWrapper>
        </ProblemCard>
    );
};

export default Problem;