import { FC, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { styled } from '@mui/material/styles';
import { CopyBlock, dracula } from "react-code-blocks";
import { Button, Container, Grid } from '@mui/material';
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
import useNotification from 'hooks/useNotification';
import WaitEffect from 'components/WaitEffect';
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
    const [message, setMessage] = useState<string>('');
    const { id } = useParams<string>();
    const { active, account } = useWeb3React();
    const { getSolvedProblems, setSolvedProblems } = useSolvedProblems();
    const { addNotification } = useNotification();

    const solvedProblems = getSolvedProblems();
    const problemId = Number(id);
    const problemNum = Number(process.env.REACT_APP_PROBLEM_NUM);

    const handleClose = () => {
        setShowSnackBar(0);
    };

    const clickConnect = async () => {
        if (!active || account === undefined || account === null) {
            setMessage("Please login first");
            setShowSnackBar(2);
            return;
        }
        window.player = account;
        const web3 = new Web3(Web3.givenProvider);
        window.web3 = web3;
        const contract = new web3.eth.Contract(info.abi, info.address);
        window.contract = contract;
        if (contract.events.hadSolved) {
            contract.events.hadSolved({
                filter: {
                    _solver: window.player
                }
            })
            .on('data', () => {
                setMessage("ERROR! You have already solved the problem!");
                setShowSnackBar(2);
            })
            .on('error', (error: Error) => {
                setMessage(error.message);
                setShowSnackBar(2);
            });
        }
        if (contract.events.newSolved) {
            contract.events.newSolved({
                filter: {
                    _solver: window.player
                }
            })
            .on('data', () => {
                setMessage(`Congratulation! You solved problem ${id}.`);
                setShowSnackBar(1);
                setSolvedProblems(problemId); // no need to minus one!
                addNotification({
                    title: `Horray! You solve Problem ${id}.`,
                    content: 'You won NFT1.',
                    date: new Date(),
                });
            })
            .on('error', (error: Error) => {
                setMessage(error.message);
                setShowSnackBar(2);
            });
        }
        window.help();
        setConnectButtonText("Connected!");
        setSubmitDisabled(false);
    }

    const handleSubmit = async () => {
        try {
            setShowBackDrop(true);
            await window.contract.methods.win().send({ from: window.player });
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                setMessage("Transaction failed!! Make sure that you REALLY solved the challenge");
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
    
    useEffect(() => {
        if (account !== undefined && account !== null) {
            window.player = account;
        }
    }, [account]);
    return (
        <>
            {
                (Number.isInteger(problemId) && problemId >= 1 && problemId <= problemNum) ? (
                    <MainWrapper title="Challenge">
                        <WaitEffect
                            showBackDrop={showBackDrop}
                            showSnackBar={showSnackBar}
                            setShowSnackBar={setShowSnackBar}
                            success={message}
                            error={message}
                        />
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
