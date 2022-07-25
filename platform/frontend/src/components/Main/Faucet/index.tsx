import { FC, useContext, useCallback } from "react";
import { Box, Button, Container, Grid, Link } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MainWrapper from "components/Main";
import { useWeb3React } from "@web3-react/core";
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    BodyTypography,
    PaperCenteredComponentWrapper,
} from "components/Main";
import axios, { AxiosError, AxiosResponse } from "axios";
import LanguageContext from "contexts/LanguageContext";
import WaitEffectContext from "contexts/WaitEffectContext";

const FaucetContentWrapper = styled(Container)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    })
);

const Faucet: FC = () => {

    const theme = useTheme();
    const { multiLang } = useContext(LanguageContext);
    const { active, account } = useWeb3React();
    const { setShowBackDrop, setShowSnackBar, setSuccessMessage, setErrorMessage } = useContext(WaitEffectContext);

    const requestETH = useCallback(async () => {
        setShowBackDrop(true);
        try {
            await axios
            .post(process.env.REACT_APP_BASE_API_URL + "/faucet", {
                address: account,
            }, {
                withCredentials: true
            });
            setSuccessMessage(multiLang?.success.requestETH);
            setShowSnackBar(1);
            setShowBackDrop(false);
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.code === "ERR_BAD_REQUEST") {
                    const response: AxiosResponse = err.response as AxiosResponse;
                    if (!response.data.ok) {
                        const errMessage = response.data.message
                        if (errMessage === "Missing Address or Amount") {
                            setErrorMessage(multiLang?.error.missingAddressOrAmount);
                        } else if (errMessage === "User unauthorized") {
                            setErrorMessage(multiLang?.error.userUnauthorized);
                        } else if (errMessage === "Already requested Ether") {
                            setErrorMessage(multiLang?.error.alreadyRequested);
                        } else if (errMessage === "Incorrect Wallet Address") {
                            setErrorMessage(multiLang?.error.incorrectAddress);
                        } else {
                            setErrorMessage(multiLang?.error.faucetFailed);
                        }
                    }
                } else {
                    setErrorMessage(multiLang?.error.serverError);
                }
            } else {
                setErrorMessage(multiLang?.error.unexpectedError);
            }
            setShowSnackBar(2);
            setShowBackDrop(false);
        }
    }, [account, multiLang]);

    return (
        <MainWrapper title="Faucet">
            <Grid container>
                <Grid item xs={12}>
                    <HeaderWrapper>
                        <HeaderTypography>
                            {multiLang?.faucet.title}
                        </HeaderTypography>
                        <SubtitleTypography>
                            {multiLang?.faucet.subtitle}
                        </SubtitleTypography>
                    </HeaderWrapper>
                </Grid>
                <Grid container justifyContent="center">
                    <PaperCenteredComponentWrapper sx={{ "width": "75%" }}>
                        <FaucetContentWrapper>
                            <SubHeaderTypography>
                                {multiLang?.faucet.content.address}
                            </SubHeaderTypography>
                            <BodyTypography>
                                <code>
                                    {account ?? multiLang?.faucet.content.walletNotConnected}
                                </code>
                            </BodyTypography>
                            <SubHeaderTypography>
                                {multiLang?.faucet.content.amount}
                            </SubHeaderTypography>
                            <BodyTypography>
                                <kbd>0.1 ETH</kbd>
                            </BodyTypography>
                            <Box
                                sx={{
                                    padding: theme.spacing(2)
                                }}
                            >
                                <Button variant="contained" disabled={!active} onClick={requestETH}>
                                    {multiLang?.faucet.content.buttonText}
                                </Button>
                            </Box>
                            <SubHeaderTypography>
                                {multiLang?.faucet.content.needMore}
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
                                <Link
                                    href="https://rinkebyfaucet.com/"
                                    target="_blank"
                                    rel="noopener"
                                    underline="hover"
                                >
                                    Rinkeby FAUCET
                                </Link>
                                <Link
                                    href="https://faucets.chain.link/rinkeby"
                                    target="_blank"
                                    rel="noopener"
                                    underline="hover"
                                >
                                    Chainlink Faucet
                                </Link>
                                <Link
                                    href="https://faucet.rinkeby.io/"
                                    target="_blank"
                                    rel="noopener"
                                    underline="hover"
                                >
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
