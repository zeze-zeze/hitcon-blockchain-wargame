import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import useAuth from "./useAuth";
import useEagerConnect from "./EagerConnection";

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

export default ConnectButton;
