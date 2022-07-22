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
import chalExample from './chalExample.sol';
import infoExample from './infoExample.json';
import useSolvedProblems from 'hooks/useSolvedProblems';
import { useWeb3React } from '@web3-react/core';
import WaitEffectContext from "contexts/WaitEffectContext";
import LanguageContext from "contexts/LanguageContext";
import Web3Context from "contexts/Web3Context";

/* https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript */
declare global {
    interface Window {
        ethereum: any;
        web3: Web3;
        player: string;
        contract: Contract;
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

    // TODO: Add more function and have a better style.
    window.help = () => {
        console.log(" player: current player address\n",
            "web3: web3 object\n",
            "contract: current level contract instance (if connected)");
    }

    const [info, setInfo] = useState<InfoType>({
        title: "",
        description: "",
        tutorial: "",
        address: "",
        abi: [],
    });
    const { multiLang } = useContext(LanguageContext);
    const [contract, setContract] = useState<Contract>();
    const [vuln, setVuln] = useState<string>("");
    const [connectButtonText, setConnectButtonText] = useState<string>(multiLang?.problems.contract.connect);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    const { id } = useParams<string>();
    const problemId = useRef<number>(Number(id));
    const { active, account } = useWeb3React();
    const { setShowSnackBar, setShowBackDrop, setErrorMessage, setSuccessMessage } = useContext(WaitEffectContext);
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
            const chalPath = await import(`challenges/chal${problemId.current}/chal.sol`);
            const chalFile = await fetch(chalPath.default);
            const chalSource = await chalFile.text();
            setVuln(chalSource);
            const chalInfo = await import(`challenges/chal${problemId.current}/info.json`);
            setInfo(chalInfo.default);
        };
        fetchChal();
    }, [problemId]);

    useEffect(() => {
        if (account) {
            window.player = account;
            const web3 = new Web3(Web3.givenProvider);
            window.web3 = web3;
            const contract = contracts[problemId.current - 1];
            window.contract = contract;
            window.help();

            setContract(contract);
            setConnectButtonText(multiLang?.problems.contract.connected);
            setSubmitDisabled(false);
        }
    }, [account, problemId, multiLang]);


    return (
        <>
            {
                (
                    Number.isInteger(problemId.current)
                    && problemId.current >= 1
                    && problemId.current <= Number(process.env.REACT_APP_PROBLEM_NUM)
                ) ? (
                    <MainWrapper title="Challenge">
                        <Grid container>
                            <Grid item xs={12}>
                                <HeaderWrapper>
                                    <HeaderTypography>
                                        {multiLang?.problems.challenges[problemId.current - 1].title}
                                    </HeaderTypography>
                                    <SubtitleTypography>
                                        {multiLang?.problems.challenges[problemId.current - 1].description}
                                    </SubtitleTypography>
                                </HeaderWrapper>
                            </Grid>
                            <Grid item xs={12}>
                                <PaperComponentWrapper>
                                    <Container>
                                        <SubSubHeaderTypography>
                                            {multiLang?.problems.challenges[problemId.current - 1].tutorial}
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
