import { FC } from 'react';
import { useParams} from "react-router-dom";
import { Alert, Button, Grid, Container, Snackbar } from '@mui/material';
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    SubSubHeaderTypography,
    PaperComponentWrapper
} from '..';
import MainWrapper from '..';
import Error404 from 'components/Error/_404';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import chalExample from './chalExample.sol';
//import infoExample from './infoExample.json';
import infoExample from './testExample.json';
import { useEffect } from 'react';
import useSolvedProblems from 'hooks/useSolvedProblems';

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
    ({ theme }) => ({
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
                    setShowSnackBar(true);
                })
                .on('error', (error: Error) => {
                    setErrorMessage(error.message);
                    setShowSnackBar(true);
                });
            } else if (contract.events.newSolved) {
                contract.events.newSolved()
                .on('data', () => {

                })
                .on('error', (error: Error) => {
                    setErrorMessage(error.message);
                    setShowSnackBar(true);
                });
            }
        }
        window.help();
    }

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
    const [vuln, setVuln] = useState<string>("");
    const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { id } = useParams();
    const problemId = Number(id);
    const problemNum = Number(process.env.REACT_APP_PROBLEM_NUM);
    const handleClose = () => {
        setShowSnackBar(false);
    };

    useEffect(() => {
        if (problemId === 0) {

        } else {
            setChal(chalExample);
            setInfo(infoExample);
        }
        fetch(chal)
        .then(r=>r.text())
        .then(text=>{
            setVuln(text);
        });
    });

    const solvedProblems = useSolvedProblems();
    console.log(solvedProblems);
    
    // TODO: better style for code block
    return (
        <>
            {
                (Number.isInteger(problemId) && problemId >= 0 && problemId <= problemNum) ? (
                    <MainWrapper title="Challenge">
                        <Snackbar
                            open={showSnackBar}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <Alert
                                onClose={handleClose}
                                severity="error"
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
                                            <Button variant="contained" onClick={clickConnect}>
                                                Connect contract
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
