import { FC, useEffect, useState } from "react";
import { Avatar, Grid, Snackbar, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWeb3React } from "@web3-react/core";
import SuspenseComponent from "../../Suspense";
import Web3 from "web3/dist/web3.min.js";
import axios from "axios";
import info from "./info.json";

const web3 = new Web3(Web3.givenProvider);

const HeaderNFTList: FC = () => {
  const { account, active } = useWeb3React();
  const [chal1State, setChal1State] = useState(false);
  const [chal2State, setChal2State] = useState(false);
  const [chal3State, setChal3State] = useState(false);
  const [chal4State, setChal4State] = useState(false);
  const [chal5State, setChal5State] = useState(false);
  const [chal6State, setChal6State] = useState(false);

  const [showLoading, setShowLoading] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(0);

  const chal1Contract = new web3.eth.Contract(
    info["p1"]["abi"],
    info["p1"]["addr"]
  );
  const chal2Contract = new web3.eth.Contract(
    info["p2"]["abi"],
    info["p2"]["addr"]
  );
  const chal3Contract = new web3.eth.Contract(
    info["p3"]["abi"],
    info["p3"]["addr"]
  );
  const chal4Contract = new web3.eth.Contract(
    info["p4"]["abi"],
    info["p4"]["addr"]
  );
  const chal5Contract = new web3.eth.Contract(
    info["p5"]["abi"],
    info["p5"]["addr"]
  );
  const chal6Contract = new web3.eth.Contract(
    info["p5"]["abi"],
    info["p5"]["addr"]
  );

  const requestNFT = async () => {
    setShowLoading(true);
    await axios
      .post(process.env.REACT_APP_BASE_API_URL + "/api/hitcon-nft-sender", {
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
    setShowLoading(false);
  };

  const handleClose = () => {
    setShowSnackBar(0);
  };

  useEffect(() => {
    if (account !== undefined) {
      chal1Contract.methods
        .addressToSolved(account)
        .call({ from: account })
        .then((t: boolean) => setChal1State(t));
      chal2Contract.methods
        .addressToSolved(account)
        .call({ from: account })
        .then((t: boolean) => setChal2State(t));
      chal3Contract.methods
        .addressToSolved(account)
        .call({ from: account })
        .then((t: boolean) => setChal3State(t));
      chal4Contract.methods
        .addressToSolved(account)
        .call({ from: account })
        .then((t: boolean) => setChal4State(t));
      chal5Contract.methods
        .addressToSolved(account)
        .call({ from: account })
        .then((t: boolean) => setChal5State(t));
      chal6Contract.methods
        .addressToSolved(account)
        .call({ from: account })
        .then((t: boolean) => setChal6State(t));
    }
  }, [account]);

  chal1Contract.events
    .hadSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal1State(true);
    });

  chal2Contract.events
    .hadSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal2State(true);
    });

  chal3Contract.events
    .hadSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal3State(true);
    });
  chal4Contract.events
    .hadSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal4State(true);
    });
  chal5Contract.events
    .hadSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal5State(true);
    });
  chal6Contract.events
    .hadSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal6State(true);
    });

  chal1Contract.events
    .newSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal1State(true);
    });

  chal2Contract.events
    .newSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal2State(true);
    });

  chal3Contract.events
    .newSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal3State(true);
    });
  chal4Contract.events
    .newSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal4State(true);
    });
  chal5Contract.events
    .newSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal5State(true);
    });
  chal6Contract.events
    .newSolved({ filter: { _solver: account } })
    .on("data", (log: any) => {
      setChal6State(true);
    });

  const nftInfo = [
    {
      url: "https://i.imgur.com/nHHO5Q8.jpg",
      gain: chal1State,
    },
    {
      url: "https://i.imgur.com/nHHO5Q8.jpg",
      gain: chal2State,
    },
    {
      url: "https://i.imgur.com/nHHO5Q8.jpg",
      gain: chal3State,
    },
    {
      url: "https://i.imgur.com/nHHO5Q8.jpg",
      gain: chal4State,
    },
    {
      url: "https://i.imgur.com/nHHO5Q8.jpg",
      gain: chal5State,
    },
    {
      url: "https://i.imgur.com/nHHO5Q8.jpg",
      gain: chal6State,
    },
  ];

  return (
    <>
      <Snackbar
        open={showSnackBar != 0}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={showSnackBar === 1 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {showSnackBar === 1 ? "Request NFT Success" : "ERROR! Request failed"}
        </Alert>
      </Snackbar>
      <Grid container justifyContent="center" alignItems="center" spacing={8}>
        {nftInfo.map(({ url, gain }, id) => (
          <Grid item xs={1} key={id}>
            <Avatar
              variant="rounded"
              src={url}
              sx={{
                opacity: gain ? "100%" : "40%",
              }}
            />
          </Grid>
        ))}

        {chal1State &&
          chal2State &&
          chal3State &&
          chal4State &&
          chal5State &&
          chal6State && (
            <>
              <Grid item lg={3} key={7}>
                <LoadingButton
                  variant="contained"
                  onClick={requestNFT}
                  loading={showLoading}
                  loadingIndicator="Requesting..."
                >
                  Request NFT
                </LoadingButton>
              </Grid>
            </>
          )}
      </Grid>
    </>
  );
  return <></>;
};

export default HeaderNFTList;
