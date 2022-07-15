import { useState, FC, useEffect } from 'react';
import { Button, Snackbar } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { injected } from './InjectedConnector';
import { setupNetwork } from './walletNetwork';
import WaitEffect from 'components/WaitEffect';
import { useNavigate } from 'react-router';
import useInactiveListener from 'hooks/useInactiveListener';

const ConnectButton: FC = () => {

    const { active, activate, connector, deactivate } = useWeb3React();
    const theme = useTheme();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showSnackBar, setShowSnackBar] = useState<number>(0);
    const [showBackDrop, setShowBackDrop] = useState<boolean>(false);

    useEffect(() => {
        if (active) {
            localStorage.setItem("_hitcon_wargame_", "Injected");
        }
    }, [active]);

    const handleConnectWallet = async () => {
        setShowBackDrop(true);
        await activate(injected, async (error: Error) => {
            if (error instanceof UnsupportedChainIdError) {
                const hasSetup = await setupNetwork();
                if (hasSetup) {
                    activate(injected);
                } else {
                    deactivate();
                }
            } else {
                setShowSnackBar(2);
                if (error instanceof NoEthereumProviderError) {
                    setErrorMessage("Provider Error: No provider was found");
                } else if (error instanceof UserRejectedRequestErrorInjected) {
                    setErrorMessage("Authorization Error: Please authorize to access your account");
                } else {
                    setErrorMessage(`${error.name ?? 'Unknown Error'}: ${error.message}`);
                }
                deactivate();
            }
        }).catch(() => {
            deactivate();
        });
        setShowBackDrop(false);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleConnectWallet}
                size="large"
                sx={{
                    margin: theme.spacing(2),
                }}
            >
                Connect Wallet
            </Button>
            <WaitEffect
                showBackDrop={showBackDrop}
                showSnackBar={showSnackBar}
                setShowSnackBar={setShowSnackBar}
                error={errorMessage}
                success="Login Success! Redirecting..."
            />
        </>
    );
};

export default ConnectButton;