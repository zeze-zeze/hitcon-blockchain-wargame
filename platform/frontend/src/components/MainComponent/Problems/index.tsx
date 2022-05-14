import { FC } from 'react';
import { Grid, Box, Card, Button, Container, CardContent, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { MainWrapper, HeaderWrapper, HeaderTypography, SubtitleTypography } from '..';

const ProblemsComponentWrapper: FC = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-around',
        alignItem: 'center',
    })
);

const ProblemsCard: FC = styled(Card)(
    ({ theme }) => ({
        width: '324px',
        height: '200px',
    })
);

const Problems: FC = () => {
    const theme = useTheme();

    return (
        <MainWrapper>
            <Container>
                <ProblemsCard>
                    <CardContent>
                        <Typography variant="h5" noWrap>
                            Problem 1
                        </Typography>
                    </CardContent>
                </ProblemsCard>
                <ProblemsCard>
                    <CardContent>
                        <Typography variant="h5" noWrap>
                            Problem 2
                        </Typography>
                    </CardContent>
                </ProblemsCard>
                <ProblemsCard>
                    <CardContent>
                        <Typography variant="h5" noWrap>
                            Problem 3
                        </Typography>
                    </CardContent>
                </ProblemsCard>
                <ProblemsCard>
                    <CardContent>
                        <Typography variant="h5" noWrap>
                            Problem 4
                        </Typography>
                    </CardContent>
                </ProblemsCard>
                <ProblemsCard>
                    <CardContent>
                        <Typography variant="h5" noWrap>
                            Problem 5
                        </Typography>
                    </CardContent>
                </ProblemsCard>
            </Container>
        </MainWrapper>
    );
}

export default Problems;
