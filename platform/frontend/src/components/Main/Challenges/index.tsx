import { FC, useState, useEffect, useCallback, useContext } from 'react';
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
import WaitEffect from 'components/WaitEffect';
import { useWeb3React } from '@web3-react/core';
import NotificationContext from "contexts/NotificationContext";

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
    title: string,
    content: string,
    date: number,
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
    const [contract, setContract] = useState<Contract>();
    const [vuln, setVuln] = useState<string>('');
    const [connectButtonText, setConnectButtonText] = useState<string>("Connect contract");
    const [showSnackBar, setShowSnackBar] = useState<number>(0);
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const { id } = useParams<string>();
    const { active, account } = useWeb3React();
    const { addNotification } = useContext(NotificationContext);
    const { getSolvedProblems, setSolvedProblems } = useSolvedProblems();

    const clickConnect = useCallback(async () => {
        if (!active || !account) {
            setMessage("Please login first");
            setShowSnackBar(2);
            return;
        }
        const web3 = new Web3(Web3.givenProvider);
        window.web3 = web3;
        const contract = new web3.eth.Contract(info.abi, info.address);
        window.contract = contract;
        setContract(contract);
        window.help();
        setConnectButtonText("Connected!");
        setSubmitDisabled(false);
    }, [active, account, info, contract]);

    const handleSubmit = useCallback(async () => {
        if (!active || !account || !contract) {
            setMessage("Please login first");
            setShowSnackBar(2);
            return;
        }
        try {
            setShowBackDrop(true);
            await contract.methods.win().send({ from: account });
        } catch (error) {
            if (error instanceof Error) {
                setMessage("Transaction failed!! Make sure that you REALLY solved the challenge");
                setShowSnackBar(2);
            }
        }
        setShowBackDrop(false);
    }, [active, account, contract]);

    useEffect(() => {
        setChal(chalExample);
        setInfo(infoExample);
        fetch(chal)
            .then(r => r.text())
            .then(text => {
                setVuln(text);
            });
    }, [chalExample, infoExample, chal]);

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
                        addNotification({
                            title: `Horray! You solve Problem ${id}.`,
                            content: 'You won NFT1.',
                            date: Date.now(),
                        });
                    })
                    .on('error', (error: Error) => {
                        setMessage(error.message);
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
                    Number.isInteger(Number(id))
                    && Number(id) >= 1
                    && Number(id) <= Number(process.env.REACT_APP_PROBLEM_NUM)
                ) ? (
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