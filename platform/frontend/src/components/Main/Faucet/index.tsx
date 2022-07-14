import { FC } from 'react';
import { Box, Container, Grid, Link } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MainWrapper from 'components/Main';
import { useWeb3React } from "@web3-react/core";
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    BodyTypography,
    PaperCenteredComponentWrapper,
} from 'components/Main';
import FaucetButton from 'components/Faucet';

const FaucetContentWrapper = styled(Container)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    })
);

const Faucet: FC = () => {

    const theme = useTheme();
    const { account } = useWeb3React();

    return (
        <MainWrapper title="Faucet">
            <Grid container>
                <Grid item xs={12}>
                    <HeaderWrapper>
                        <HeaderTypography>
                            Faucet
                        </HeaderTypography>
                        <SubtitleTypography>
                            Get some Rinkeby ETH
                        </SubtitleTypography>
                    </HeaderWrapper>
                </Grid>
                <Grid container justifyContent="center">
                    <PaperCenteredComponentWrapper sx={{ 'width': '75%' }}>
                        <FaucetContentWrapper>
                            <SubHeaderTypography>
                                Wallet Address
                            </SubHeaderTypography>
                            <BodyTypography>
                                <code>
                                { account }
                                </code>
                            </BodyTypography>
                            <SubHeaderTypography>
                                Request Amount
                            </SubHeaderTypography>
                            <BodyTypography>
                                <kbd>0.1 ETH</kbd>
                            </BodyTypography>
                            { /*Testing sitekey*/ }
                            <Box
                                sx={{
                                    padding: theme.spacing(2)
                                }}
                            >
                                <FaucetButton />
                            </Box>
                            <SubHeaderTypography>
                                Need more ETH?
                            </SubHeaderTypography>
                            <Grid
                                container
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    padding: theme.spacing(2)
                                }}
                            >
                                <Link href="https://rinkebyfaucet.com/ " underline="hover">
                                    Rinkeby FAUCET
                                </Link>
                                <Link href="https://faucets.chain.link/rinkeby" underline="hover">
                                    Chainlink Faucet
                                </Link>
                                <Link href="https://faucet.rinkeby.io/" underline="hover">
                                    Rinkeby Authenticated Faucet
                                </Link>
                            </Grid>
                        </FaucetContentWrapper>
                    </PaperCenteredComponentWrapper>
                </Grid>
            </Grid>
        </MainWrapper>
    );
};


export default Faucet;
