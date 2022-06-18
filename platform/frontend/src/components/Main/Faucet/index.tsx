import { FC } from 'react';
import { Grid, Box, Container, Card, Button, Paper, CardContent, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MainWrapper from 'components/Main';
import { useWeb3React } from "@web3-react/core";
import ReCAPTCHA from "react-google-recaptcha";
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    BodyTypography,
    PaperCenteredComponentWrapper,
} from 'components/Main';
import FaucetButton from 'components/Faucet';

const FaucetContentWrapper: FC = styled(Container)(
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
                <Grid container justifyContent="center" xs={12}>
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
                            <BodyTypography>
                                <ReCAPTCHA
                                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                    onChange={() => {}}
                                />
                            </BodyTypography>
                            <BodyTypography>
                                <FaucetButton />
                            </BodyTypography>
                        </FaucetContentWrapper>
                    </PaperCenteredComponentWrapper>
                </Grid>
            </Grid>
        </MainWrapper>
    );
};


export default Faucet;
