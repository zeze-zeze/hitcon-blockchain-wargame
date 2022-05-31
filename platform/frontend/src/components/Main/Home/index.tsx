import { FC } from 'react';
import { Grid, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainWrapper, { HeaderWrapper, HeaderTypography, SubtitleTypography } from '..';

const Home: FC = () => {
    const theme = useTheme();
    return (
        <MainWrapper title="Home">
            <Grid container>
                <Grid item xs={12}>
                    <HeaderWrapper>
                        <HeaderTypography>
                            The Ethernaut
                        </HeaderTypography>
                        <SubtitleTypography>
                            The Ethernaut is a Web3/Solidity based wargame inspired on overthewire.org, played in the Ethereum Virtual Machine. Each level is a smart contract that needs to be 'hacked'.
                        </SubtitleTypography>
                        <SubtitleTypography>
    The game is 100% open source and all levels are contributions made by other players. Do you have an interesting idea? PRs are welcome at github.com/OpenZeppelin/ethernaut.
                        </SubtitleTypography>
                        <SubtitleTypography>
    Are you interested in smart contract development or security? Does securing the world’s blockchain infrastructure sound exciting to you? We are hiring!
                        </SubtitleTypography>
                        <SubtitleTypography>
    You like the game but your language is not available? Contribute a translation!
                        </SubtitleTypography>
                        <Button variant="contained" color="success" sx={{ marginTop: theme.spacing(4) }}>
                            Get started!
                        </Button>
                    </HeaderWrapper>
                </Grid>
            </Grid>
        </MainWrapper>
    );
}

export default Home;
