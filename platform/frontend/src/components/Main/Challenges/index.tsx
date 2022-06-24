import { FC } from 'react';
import { useParams} from "react-router-dom";
import { Button, Grid, Container } from '@mui/material';
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    BodyTypography,
    PaperComponentWrapper
} from '..';
import MainWrapper from '..';
import Error404 from '../../Error/_404.tsx';
import Web3 from 'web3';
import { useState } from "react";
import { CodeBlock } from "react-code-blocks";
import chalExample from './chalExample.sol';
import infoExample from './infoExample.json';
import { useEffect } from 'react';

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
    }

    // TODO: Add more function and have a better style.
    window.help = () => {
        console.log('player: current player address\n',
            'web3: web3 object\n',
            'contract: current level contract instance (if connected)');
    }
    
    const [chal, setChal] = useState("");
    const [info, setInfo] = useState([]);
    const [vuln, setVuln] = useState("");
    const { id } = useParams();
    const problemId = Number(id);
    const problemNum = Number(process.env.REACT_APP_PROBLEM_NUM);

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
    
    // TODO: better style for code block
    if (Number.isInteger(problemId) && problemId >= 0 && problemId <= problemNum) {
        if (problemId === 0){
            return (
                <MainWrapper>
                    <Grid container>
                        <Grid item xs={12}>
                            <HeaderWrapper>
                                <HeaderTypography>
                                    Hello Ethernaut
                                </HeaderTypography>
                                <SubtitleTypography>
                                    This level walks you through the very basics of how to play the game.
                                </SubtitleTypography>
                            </HeaderWrapper>
                        </Grid>
                        <Grid item xs={12}>
                            <PaperComponentWrapper>
                                <Container>
                                    <SubHeaderTypography>
                                        1. Set up MetaMask
                                    </SubHeaderTypography>
                                    <BodyTypography>
                                        If you don't have it already, install the <a href="https://metamask.io/">MetaMask browser extension</a> (in Chrome, Firefox, Brave or Opera on your desktop machine). Set up the extension's wallet and use the network selector to point to the 'Rinkeby test network' in the top left of the extension's interface.
                                    </BodyTypography>
                                    <SubHeaderTypography>
                                        2. Open the browser's console
                                    </SubHeaderTypography>
                                    <BodyTypography>
                                        Open your browser's console: <code>Tools &gt; Developer Tools</code>.
                                    </BodyTypography>
                                    <BodyTypography>
                                        You should see a few messages from the game. One of them should state your player's address. This will be important during the game! You can always see your player address by entering the following command:
                                    </BodyTypography>
                                    <BodyTypography>
                                        <code>player</code>
                                    </BodyTypography>
                                    <BodyTypography>
                                        Keep an eye out for warnings and errors, since they could provide important information during gameplay.
                                    </BodyTypography>
                                    <SubHeaderTypography>
                                        3. Use the console helpers
                                    </SubHeaderTypography>
                                    <BodyTypography>
                                        You can also see your current ether balance by typing:
                                    </BodyTypography>
                                    <BodyTypography>
                                        <code>getBalance(player)</code>
                                    </BodyTypography>
                                    <BodyTypography>
                                        NOTE: Expand the promise to see the actual value, even if it reads "pending". If you're using Chrome v62, you can use await getBalance(player) for a cleaner console experience.
            Great! To see what other utility functions you have in the console type:
                                    </BodyTypography>
                                    <BodyTypography>
                                        <code>help()</code>
                                    </BodyTypography>
                                    <BodyTypography>
                                        These will be super handy during gameplay.
                                    </BodyTypography>
                                    <SubHeaderTypography>
                                        4. The ethernaut contract
                                    </SubHeaderTypography>
                                    <BodyTypography>
                                        Enter the following command in the console:
                                    </BodyTypography>
                                    <BodyTypography>
                                        <code>ethernaut</code>
                                    </BodyTypography>
                                    <BodyTypography>
                                        This is the game's main smart contract. You don't need to interact with it directly through the console (as this app will do that for you) but you can if you want to. Playing around with this object now is a great way to learn how to interact with the other smart contracts of the game.
                                    </BodyTypography>
                                    <BodyTypography>
                                        Go ahead and expand the ethernaut object to see what's inside.
                                    </BodyTypography>
                                </Container>
                            </PaperComponentWrapper>
                        </Grid>
                    </Grid>
                </MainWrapper>
            );
        } else if (problemId > 0) {
            return (
                <MainWrapper>
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
                                    </SubHeaderTypography>
                                    <Button variant="contained" onClick={clickConnect}>
                                        Connect contract.
                                    </Button>
                                    <BodyTypography>
                                        {info.tutorial}
                                    </BodyTypography>
                                    <BodyTypography>
                                        <CodeBlock text={vuln}/> 
                                    </BodyTypography>
                                </Container>
                            </PaperComponentWrapper>
                        </Grid>
                    </Grid>
                </MainWrapper>
            );
        }
    }else {
        return (
            <Error404 />
        );
    }
}

export default Challenge;
