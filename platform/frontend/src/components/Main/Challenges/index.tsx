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
import chal1 from './chal1.sol';
import info1 from './info1.json';
import chal2 from './chal2.sol';
import info2 from './info2.json';
import chal3 from './chal3.sol';
import info3 from './info3.json';
import chal4 from './chal4.sol';
import info4 from './info4.json';
import chal5 from './chal5.sol';
import info5 from './info5.json';
import useSolvedProblems from 'hooks/useSolvedProblems';
import WaitEffect from 'components/WaitEffect';
import { useWeb3React } from '@web3-react/core';
import NotificationContext from "contexts/NotificationContext";
import WaitEffectContext from "contexts/WaitEffectContext";
import LanguageContext from "contexts/LanguageContext";

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

type MessageType = {
    idx: number,
    date: number,
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

    const [chal, setChal] = useState<string>("");
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
    const { addNotification } = useContext(NotificationContext);
    const { setShowSnackBar, setShowBackDrop, setErrorMessage, setSuccessMessage } = useContext(WaitEffectContext);
    const { getSolvedProblems, setSolvedProblems } = useSolvedProblems();

    const clickConnect = useCallback(async () => {
        setShowBackDrop(true);
        if (!active || !account) {
            setErrorMessage(multiLang?.error.connectFirst);
            setShowSnackBar(2);
            return;
        }
        const web3 = new Web3(Web3.givenProvider);
        window.web3 = web3;
        const contract = new web3.eth.Contract(info.abi, info.address);
        window.contract = contract;
        setContract(contract);
        window.help();
        setConnectButtonText(multiLang?.problems.contract.connected);
        setSubmitDisabled(false);
        setShowBackDrop(false);
    }, [active, account, info, contract]);

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
        if (id === '1') {
            setChal(chal1);
            setInfo(info1);
        } else if (id === '2') {
            setChal(chal2);
            setInfo(info2);
        } else if (id === '3') {
            setChal(chal3);
            setInfo(info3);
        } else if (id === '4') {
            setChal(chal4);
            setInfo(info4);
        } else if (id === '5') {
            setChal(chal5);
            setInfo(info5);
        } else {
            setChal(chalExample);
            setInfo(infoExample);
        }
        fetch(chal)
            .then(r => r.text())
            .then(text => {
                setVuln(text);
            });
    }, [chalExample, infoExample, chal, vuln]);

    useEffect(() => {
        if (account) {
            window.player = account;
        }
    }, [account]);

    useEffect(() => {
        if (contract) {
            if (contract.events.hadSolved) {
                contract.events.hadSolved({
                    filter: {
                        _solver: window.player
                    }
                })
                    .on("data", () => {
                        setErrorMessage(multiLang?.error.alreadySolved);
                        setShowSnackBar(2);
                    })
                    .on("error", (error: Error) => {
                        setErrorMessage(error.message);
                        setShowSnackBar(2);
                    });
            }
            if (contract.events.newSolved) {
                contract.events.newSolved({
                    filter: {
                        _solver: window.player
                    }
                })
                    .on("data", () => {
                        setSuccessMessage(multiLang?.success.challengeSolved);
                        setShowSnackBar(1);
                        addNotification({
                            idx: problemId.current - 1,
                            date: Date.now(),
                        });
                    })
                    .on("error", (error: Error) => {
                        setErrorMessage(error.message);
                        setShowSnackBar(2);
                    });
            }
        }
        return () => {
            /* remove event handler when unmount */
            if (contract) {
                if (contract.events.hadSolved) {
                    contract.events.hadSolved().off();
                }
                if (contract.events.newSolved) {
                    contract.events.newSolved().off();
                }
            }
        };
    }, [contract]);

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
                                        <SubHeaderTypography>
                                            <Button
                                                variant="contained"
                                                onClick={clickConnect}
                                            >
                                                {connectButtonText}
                                            </Button>
                                        </SubHeaderTypography>
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
