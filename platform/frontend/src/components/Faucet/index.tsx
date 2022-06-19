import {
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { FC, useState } from "react";

const ConnectButton: FC = () => {
  const { account, active } = useWeb3React();
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(0);

  const requestETH = async () => {
    setShowBackDrop(true);
    await axios
      .post(process.env.REACT_APP_BASE_API_URL + "/faucet", {
        address: account,
      })
      .then((response) => {
        // console.log(response);
        setShowSnackBar(1);
      })
      .catch((error) => {
        // console.log(error);
        setShowSnackBar(2);
      });
    setShowBackDrop(false);
  };

  const handleClose = () => {
    setShowSnackBar(0);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={showSnackBar != 0}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={showSnackBar == 1 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {showSnackBar == 1 ? "Request ETH Success" : "ERROR! Request failed"}
        </Alert>
      </Snackbar>

      <Button variant="contained" disabled={!active} onClick={requestETH}>
        Request ETH
      </Button>
    </>
  );
};

export default ConnectButton;
