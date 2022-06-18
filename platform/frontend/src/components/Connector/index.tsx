import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
//import useAuth from "./useAuth";
//import useEagerConnect from "./EagerConnection";
import { injected } from './InjectedConnector';
import { setupNetwork } from './walletNetwork';

/*
const ConnectButton: FC = () => {
  const { active, account } = useWeb3React();
  const { login, logout } = useAuth();

  const WalletAddress = () => {
    return account
      ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      : "";
  };

  useEagerConnect();

  return (
    <>
      {active ? (
        <Button variant="contained" onClick={logout}>
          {WalletAddress()}
        </Button>
      ) : (
        <Button variant="contained" onClick={login}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};
*/

const ConnectButton: FC = () => {

    const { active, activate, connector, deactivate } = useWeb3React();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);

    const handleConnectWallet = () => {
        if (active && connector === injected) {
            localStorage.setItem("_hitcon_wargame_", "Injected");
        }

        if (active) {
            navigate('/');
        } else {
            activate(injected, async (error: Error) => {
                if (error instanceof UnsupportedChainIdError) {
                    const hasSetup = await setupNetwork();
                    if (hasSetup) {
                        activate(injected);
                    } else {
                        deactivate();
                    }
                } else {
                    setOpenErrorSnackbar(true);
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
        }
    };

    return (
        <>
            <Button variant="contained" size="large" onClick={handleConnectWallet}>
            {
                active ? 'Start Playing' : 'Connect Wallet'
            }
            </Button>
            <Snackbar
                open={openErrorSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                    setOpenErrorSnackbar(false);
                }}
            >
                <MuiAlert severity="error" elevation={6} variant="filled">
                { errorMessage }
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default ConnectButton;
