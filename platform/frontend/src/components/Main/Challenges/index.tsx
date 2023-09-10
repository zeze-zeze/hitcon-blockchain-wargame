import { FC, useState, useEffect, useCallback, useContext, useMemo, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { styled, useTheme } from "@mui/material/styles";
import { CopyBlock, dracula } from "react-code-blocks";
import { Button, Container, Grid } from "@mui/material";
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    SubSubHeaderTypography,
    PaperComponentWrapper
} from 'components/Main';
import MainWrapper from 'components/Main';
import Error404 from 'components/Error/_404';
import { useWeb3React } from '@web3-react/core';
import EffectContext from "contexts/EffectContext";
import LanguageContext from "contexts/LanguageContext";
import info from "share/contracts.json";
import Web3Context from "contexts/Web3Context";

/* Typescript declaration merging */
/* https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript */
declare global {
    interface Window {
        ethereum?: any;
        web3?: Web3;
        player?: string;
        contract?: Contract;
        instance?: string;
        abi?: Array<any>;
        help?: () => void;
    }
}

type TutorialType = {
    type: string;
    data: string;
    to: string;
};

const CopyBlockWrapper = styled(Container)(
    ({ theme }) => ({
        "&.MuiContainer-root": {
            fontFamily: "monospace",
            fontSize: "16px",
            div: {
                padding: theme.spacing(2, 4),
            },
            span: {
                padding: "0!important",
                code: {
                    backgroundColor: "transparent",
                    color: "white",
                    paddingLeft: "0 !important",
                }
            },
        }
    })
);

const Challenge: FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { multiLang } = useContext(LanguageContext);
    const [contract, setContract] = useState<Contract>();
    const [vuln, setVuln] = useState<string>("");
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    const { id } = useParams<string>();
    const challengeId = useMemo(() => Number(id), [id]);
    const { active, account } = useWeb3React();
    const { setShowSnackBar, setShowBackDrop, setErrorMessage } = useContext(EffectContext);
    const { solved } = useContext(Web3Context);

    const handleSubmit = useCallback(async () => {
        var style = 'color: tomato; background:#eee; -webkit-text-stroke: 1px black; font-size:30px;';
        console.log('%cCheck solved or not ...', style);

        if (!active || !account || !contract) {
            setErrorMessage(multiLang?.error.connectFirst);
            setShowSnackBar(2);
            return;
        }
        try {
            setShowBackDrop(true);
            await contract.methods.win().send({ from: account });
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(multiLang?.error.notSolved);
                setShowSnackBar(2);
            }
        }
        setShowBackDrop(false);
    }, [multiLang, active, account, contract]);

    const handleAlreadySolved = useCallback(() => {
        if (!active || !account || !contract) {
            setErrorMessage(multiLang?.error.connectFirst);
            setShowSnackBar(2);
            return;
        }
        setErrorMessage(multiLang?.error.alreadySolved);
        setShowSnackBar(2);
    }, [multiLang, active, account, contract])

    useEffect(() => {
        (async () => {
            const chalPath = await import(`challenges/chal${challengeId}.sol`);
            const chalFile = await fetch(chalPath.default);
            const chalSource = await chalFile.text();
            setVuln(chalSource);
        })();
    }, [challengeId]);

    useEffect(() => {
        if (account) {
            setTimeout(() => {
                window.console.clear();
                var style = 'color: tomato; background:#eee; -webkit-text-stroke: 1px black; font-size:30px;';
                console.log('%cWelcome to HITCON Wargame!', style);
                var style = 'color: blue; background:#eee; -webkit-text-stroke: 1px black; font-size:10px;';
                console.log('%cYour address: %s', style, account);
                console.log('%cContract address: %s', style, info[challengeId].addr);
                window.player = account;
                const web3 = new Web3(Web3.givenProvider);
                window.web3 = web3;
                window.instance = info[challengeId].addr;
                window.abi = info[challengeId].abi;
                const contract = new web3.eth.Contract(window.abi, window.instance);
                window.contract = contract;
                window.help = () => {
                    const menu = {
                        "player": "current player address",
                        "web3": "web3 object",
                        "contract": "current level contract instance",
                        "instance": "challenge contract address",
                        "abi": "abi of challenge contract",
                        "help()": "Show this table"
                    };
                    console.table(menu);
                }
                window.help();

                setContract(contract);
                setSubmitDisabled(false);
            }, 100);
        }
        return () => {
            delete window.web3;
            delete window.player;
            delete window.contract;
            delete window.instance;
            delete window.abi;
            delete window.help;
            console.clear();
        }
    }, [account, challengeId, multiLang]);

    return (
        <>
            {
                (
                    Number.isInteger(challengeId)
                    && challengeId >= 0
                    && challengeId < Number(process.env.REACT_APP_CHALLENGE_NUM)
                ) ? (
                    <MainWrapper title="Challenge">
                        <Grid container>
                            <Grid item xs={12}>
                                <HeaderWrapper>
                                    <HeaderTypography>
                                        {multiLang?.challenges.list[challengeId].title}
                                    </HeaderTypography>
                                    <SubtitleTypography>
                                        {multiLang?.challenges.list[challengeId].description}
                                    </SubtitleTypography>
                                </HeaderWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <PaperComponentWrapper>
                                    <Container>
                                        {
                                            multiLang?.challenges.list[challengeId].tutorial
                                                .map((statement: TutorialType[], cidx: number) => ((
                                                    <SubSubHeaderTypography key={cidx}>
                                                        {
                                                            statement.map((component: TutorialType, sidx) => {
                                                                if (component.type === "text") return (
                                                                    <Fragment key={sidx}>
                                                                        {
                                                                            component.data
                                                                        }
                                                                    </Fragment>
                                                                );
                                                                else if (component.type === "code") return (
                                                                    <code key={sidx}>{component.data}</code>
                                                                );
                                                                else if (component.type === "link") return (
                                                                    <a target="_blank" href={component.to}>{component.data}</a>
                                                                )
                                                            })
                                                        }
                                                    </SubSubHeaderTypography>
                                                )))
                                        }
                                        <CopyBlockWrapper>
                                            <CopyBlock
                                                text={vuln}
                                                theme={dracula}
                                                language="javascript"
                                            />
                                        </CopyBlockWrapper>
                                        <SubSubHeaderTypography>
                                            {multiLang?.challenges.contract.submitText}
                                        </SubSubHeaderTypography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => { navigate("/challenges")}}
                                            sx={{ margin: theme.spacing(1) }}
                                        >
                                            {multiLang?.challenges.contract.backToChallengeList}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            disabled={submitDisabled || solved[challengeId]}
                                            onClick={handleSubmit}
                                            sx={{ margin: theme.spacing(1) }}
                                        >
                                            {
                                                multiLang?.challenges.contract.submitButtonText
                                            }
                                        </Button>
                                    </Container>
                                </PaperComponentWrapper>
                            </Grid>
                        </Grid>
                    </MainWrapper>
                ) : (
                    <Error404 />
                )
            }
        </>
    )
}

export default Challenge;
