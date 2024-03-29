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
import EffectContext from "contexts/EffectContext";

const FaucetContentWrapper = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Faucet: FC = () => {
  const theme = useTheme();
  const { multiLang } = useContext(LanguageContext);
  const { active, account } = useWeb3React();
  const {
    setShowBackDrop,
    setShowSnackBar,
    setSuccessMessage,
    setErrorMessage,
  } = useContext(EffectContext);

  const requestETH = useCallback(async () => {
    let apiURL;
    switch (process.env.NODE_ENV) {
      case "development":
        apiURL = process.env.REACT_APP_BASE_API_URL_DEV as string;
        break;
      case "test":
        apiURL = process.env.REACT_APP_BASE_API_URL_TEST as string;
        break;
      case "production":
        apiURL = process.env.REACT_APP_BASE_API_URL_PROD as string;
        break;
      default:
        apiURL = process.env.REACT_APP_BASE_API_URL_DEV as string;
        break;
    }

    setShowBackDrop(true);
    try {
      await axios.post(
        apiURL + "/faucet",
        {
          address: account,
        },
        {
          withCredentials: true,
        }
      );
      setSuccessMessage(multiLang?.success.requestETH);
      setShowSnackBar(1);
      setShowBackDrop(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.code === "ERR_BAD_REQUEST") {
          const response: AxiosResponse = err.response as AxiosResponse;
          if (!response.data.ok) {
            const errMessage = response.data.message;
            if (errMessage === "Missing address or amount") {
              setErrorMessage(multiLang?.error.walletNotLogin);
            } else if (errMessage === "User unauthorized") {
              setErrorMessage(multiLang?.error.userUnauthorized);
            } else if (errMessage === "Already requested Ether") {
              setErrorMessage(multiLang?.error.alreadyRequested);
            } else if (errMessage === "Incorrect wallet address") {
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
            <HeaderTypography>{multiLang?.faucet.title}</HeaderTypography>
            <SubtitleTypography>
              {multiLang?.faucet.subtitle}
            </SubtitleTypography>
          </HeaderWrapper>
        </Grid>
        <Grid container justifyContent="center">
          <PaperCenteredComponentWrapper sx={{ width: "75%" }}>
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
                <kbd>0.2 ETH</kbd>
              </BodyTypography>
              <Box
                sx={{
                  padding: theme.spacing(2),
                }}
              >
                <Button
                  variant="contained"
                  disabled={!active}
                  onClick={requestETH}
                >
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
                  padding: theme.spacing(2),
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
