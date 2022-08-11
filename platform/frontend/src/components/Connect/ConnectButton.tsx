import { FC, useContext, useCallback } from 'react';
import { Button } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { injected } from './InjectedConnector';
import { setupNetwork } from './walletNetwork';
import EffectContext from 'contexts/EffectContext';
import LanguageContext from 'contexts/LanguageContext';

const ConnectButton: FC = () => {

    const { activate, deactivate } = useWeb3React();
    const theme = useTheme();
    const { setShowBackDrop, setShowSnackBar, setErrorMessage } = useContext(EffectContext);
    const { multiLang } = useContext(LanguageContext);

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
                    setErrorMessage(multiLang?.error.noProvider);
                } else if (error instanceof UserRejectedRequestErrorInjected) {
                    setErrorMessage(multiLang?.error.authorizeError);
                } else {
                    setErrorMessage(multiLang?.error.unexpectedError);
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
                { multiLang?.dashboard.header.userMenu.connectWallet }
            </Button>
        </>
    );
};

export default ConnectButton;
