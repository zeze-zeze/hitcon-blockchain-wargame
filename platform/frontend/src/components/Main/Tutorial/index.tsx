import { FC } from 'react';
import { Grid, Container } from '@mui/material';
import MainWrapper from 'components/Main';
import {
    HeaderWrapper,
    HeaderTypography,
    SubtitleTypography,
    SubHeaderTypography,
    BodyTypography,
    PaperComponentWrapper
} from 'components/Main';
import { useWeb3React } from "@web3-react/core";
import useEagerConnect from "components/Connector/EagerConnection";

const Tutorial: FC = () => {
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
}

export default Tutorial;
