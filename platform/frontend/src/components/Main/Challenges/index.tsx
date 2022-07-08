import { FC, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { styled } from '@mui/material/styles';
import { CopyBlock, dracula } from "react-code-blocks";
import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Grid,
    Snackbar,
} from '@mui/material';
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
        '&.MuiContainer-root': {
            fontFamily: 'monospace',
            fontSize: '16px',
            span: {
                code: {
                    backgroundColor: 'transparent',
                    color: 'white',
                }
            }
        }
    })
);

const Challenge: FC = () => {

    // TODO: Add more function and have a better style.
    window.help = () => {
        console.log(' player: current player address\n',
            'web3: web3 object\n',
            'contract: current level contract instance (if connected)');
    }
    
    const [chal, setChal] = useState<string>("");
    const [info, setInfo] = useState<InfoType>({
        title: '',
        description: '',
        tutorial: '',
        address: '',
        abi: [],
    });
    const [vuln, setVuln] = useState<string>('');
    const [connectButtonText, setConnectButtonText] = useState<string>("Connect contract");
    const [showSnackBar, setShowSnackBar] = useState<number>(0);
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { id } = useParams();
    const { solvedProblems, setSolvedProblems } = useSolvedProblems();
    const problemId = Number(id);
    const problemNum = Number(process.env.REACT_APP_PROBLEM_NUM);

    const handleClose = () => {
        setShowSnackBar(0);
    };

    const clickConnect = async () => {
        if (window?.ethereum?.isMetaMask) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const account = Web3.utils.toChecksumAddress(accounts[0]);
            window.player = account;
        }

        const web3 = new Web3(Web3.givenProvider);
        window.web3 = web3;
        const contract = new web3.eth.Contract(info.abi, info.address);
        window.contract = contract;
        if (contract.events.newSolved) {
            if (contract.events.hasSolved) {
                contract.events.hasSolved()
                .on('data', () => {
                    setErrorMessage("ERROR! You have already solved the problem!");
                    setShowSnackBar(2);
                })
                .on('error', (error: Error) => {
                    setErrorMessage(error.message);
                    setShowSnackBar(2);
                });
            } else if (contract.events.newSolved) {
                contract.events.newSolved()
                .on('data', () => {
                    setErrorMessage(`Congratulation! You solved problem ${id}.`);
                    setShowSnackBar(1);
                })
                .on('error', (error: Error) => {
                    setErrorMessage(error.message);
                    setShowSnackBar(2);
                });
            }
        }
        window.help();
        setConnectButtonText("Connected!");
        setSubmitDisabled(false);
    }

    const handleSubmit = async () => {
        try {
            setShowBackDrop(true);
            const winResult = await window.contract.methods.win().send({ from: window.player });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                setErrorMessage("Transaction failed!! Make sure that you REALLY solved the challenge");
                setShowSnackBar(2);
            }
        }
        setShowBackDrop(false);
    };

    useEffect(() => {
        setChal(chalExample);
        setInfo(infoExample);
        fetch(chal)
        .then(r=>r.text())
        .then(text=>{
            setVuln(text);
        });
    }, [chalExample, infoExample, setVuln, chal]);
    
    return (
        <>
            {
                (Number.isInteger(problemId) && problemId >= 1 && problemId <= problemNum) ? (
                    <MainWrapper title="Challenge">
                        <Backdrop
                            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={showBackDrop}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Snackbar
                            open={showSnackBar != 0}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <Alert
                                onClose={handleClose}
                                severity={showSnackBar === 1 ? "success" : "error"}
                                sx={{ width: "100%" }}
                            >
                            {errorMessage}
                            </Alert>
                        </Snackbar>
                        <Grid container>
                            <Grid item xs={12}>
                                <HeaderWrapper>
                                    <HeaderTypography>
                                        {info.title}
                                    </HeaderTypography>
                                    <SubtitleTypography>
                                        {info.description}
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
                                            {info.tutorial}
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
                                            Submit Solution
                                        </SubSubHeaderTypography>
                                        <SubHeaderTypography>
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                disabled={submitDisabled}
                                                onClick={handleSubmit}
                                            >
                                                Win
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
