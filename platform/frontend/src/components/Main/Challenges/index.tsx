import { FC, useRef, useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { styled } from "@mui/material/styles";
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
import WaitEffectContext from "contexts/WaitEffectContext";
import LanguageContext from "contexts/LanguageContext";
import Web3Context from "contexts/Web3Context";
import info from "challenges/contracts.json";

/* https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript */
declare global {
    interface Window {
        ethereum: any;
        web3: Web3;
        player: string;
        contract: Contract;
        instance: string;
        abi: Array<any>;
        help: () => void;
    }
}

type InfoType = {
    title: string;
    description: string;
    tutorial: string;
    address: string;
    abi: Array<any>;
};

const CopyBlockWrapper = styled(Container)(
    () => ({
        "&.MuiContainer-root": {
            fontFamily: "monospace",
            fontSize: "16px",
            span: {
                code: {
                    backgroundColor: "transparent",
                    color: "white",
                }
            }
        }
    })
);

const Challenge: FC = () => {
    window.help = () => {
        const menu = {
            "player" : "current player address",
            "web3" : "web3 object",
            "contract" : "current level contract instance",
            "instance" : "challenge contract address",
            "abi" : "abi of challenge contract",
            "help()" : "Show this table"
        };

        console.table(menu);
    }

    const { multiLang } = useContext(LanguageContext);
    const [contract, setContract] = useState<Contract>();
    const [vuln, setVuln] = useState<string>("");
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    const { id } = useParams<string>();
    const problemId = useRef<number>(Number(id));
    const { active, account } = useWeb3React();
    const { setShowSnackBar, setShowBackDrop, setErrorMessage } = useContext(WaitEffectContext);
    const { contracts, solved } = useContext(Web3Context);

    const handleSubmit = useCallback(async () => {
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
    }, [active, account, contract]);

    useEffect(() => {
        const fetchChal = async () => {
            const chalPath = await import(`challenges/chal${problemId.current}.sol`);
            const chalFile = await fetch(chalPath.default);
            const chalSource = await chalFile.text();
            setVuln(chalSource);
        };
        fetchChal();
    }, [problemId]);

    useEffect(() => {
        if (account) {
            setTimeout(() => {
                window.console.clear();
                var style = 'color: tomato; background:#eee; -webkit-text-stroke: 1px black; font-size:30px;';
                console.log('%cWelcome to HITCON Wargame!', style);
                var style = 'color: blue; background:#eee; -webkit-text-stroke: 1px black; font-size:10px;';
                console.log('%cYour address: %s', style, account);
                console.log('%cContract address: %s', style, info[problemId.current].addr);
                window.player = account;
                const web3 = new Web3(Web3.givenProvider);
                window.web3 = web3;
                const contract = contracts[problemId.current];
                window.contract = contract;
                window.instance = info[problemId.current].addr;
                window.abi = info[problemId.current].abi; 
                window.help();

                setContract(contract);
                setSubmitDisabled(false);
            }, 100);
        }
    }, [account, problemId, multiLang]);


    return (
        <>
            {
                (
                    Number.isInteger(problemId.current)
                    && problemId.current >= 0
                    && problemId.current < Number(process.env.REACT_APP_PROBLEM_NUM)
                ) ? (
                    <MainWrapper title="Challenge">
                        <Grid container>
                            <Grid item xs={12}>
                                <HeaderWrapper>
                                    <HeaderTypography>
                                        {multiLang?.problems.challenges[problemId.current].title}
                                    </HeaderTypography>
                                    <SubtitleTypography>
                                        {multiLang?.problems.challenges[problemId.current].description}
                                    </SubtitleTypography>
                                </HeaderWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <PaperComponentWrapper>
                                    <Container>
                                        <SubSubHeaderTypography>
                                            {multiLang?.problems.challenges[problemId.current].tutorial}
                                        </SubSubHeaderTypography>
                                        <CopyBlockWrapper>
                                            <CopyBlock
                                                text={vuln}
                                                theme={dracula}
                                                language="javascript"
                                                showLineNumbers
                                            />
                                        </CopyBlockWrapper>
                                        <SubSubHeaderTypography>
                                        {multiLang?.problems.contract.submitText}
                                        </SubSubHeaderTypography>
                                        <SubHeaderTypography>
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                disabled={submitDisabled}
                                                onClick={handleSubmit}
                                            >
                                                {multiLang?.problems.contract.submitButtonText}
                                            </Button>
                                        </SubHeaderTypography>
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
