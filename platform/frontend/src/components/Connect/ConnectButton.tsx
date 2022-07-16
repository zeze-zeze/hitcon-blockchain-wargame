import { useState, FC, useEffect, useContext, useCallback } from 'react';
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
import WaitEffectContext from 'contexts/WaitEffectContext';

const ConnectButton: FC = () => {

    const { activate, deactivate } = useWeb3React();
    const theme = useTheme();
    const { setShowBackDrop, setShowSnackBar, setErrorMessage } = useContext(WaitEffectContext);

    const handleConnectWallet = useCallback(async () => {
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
    }, []);

    return (
        <>
            <Button
                variant="contained"
                onClick={handleConnectWallet}
                sx={{
                    margin: theme.spacing(2),
                }}
            >
                Connect Wallet
            </Button>
        </>
    );
};

export default ConnectButton;
