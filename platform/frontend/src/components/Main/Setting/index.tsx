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
import axios from "axios";
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

const Setting: FC = () => {

    const theme = useTheme();
    const { multiLang, changeLang } = useContext(LanguageContext);
    const { active, account } = useWeb3React();

    return (
        <MainWrapper title="Faucet">
            <Grid container>
                <Grid item xs={12}>
                    <HeaderWrapper>
                        <HeaderTypography>
                            {multiLang?.setting.title}
                        </HeaderTypography>
                        <SubtitleTypography>
                            {multiLang?.setting.subtitle}
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
                                    {account}
                                </code>
                            </BodyTypography>
                            <SubHeaderTypography>
                                {multiLang?.faucet.content.amount}
                            </SubHeaderTypography>
                            <BodyTypography>
                                <kbd>0.1 ETH</kbd>
                            </BodyTypography>
                            { /*Testing sitekey*/}
                            <Box
                                sx={{
                                    padding: theme.spacing(2)
                                }}
                            >
                                <Button variant="contained" disabled={!active}>
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


export default Setting;
