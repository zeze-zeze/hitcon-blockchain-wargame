import { FC, useContext } from "react";
import { Avatar, Grid, Tooltip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import axios from "axios";
import useSolvedProblems from "hooks/useSolvedProblems";
import { useTheme } from "@mui/material/styles";
import LanguageContext from "contexts/LanguageContext";
import WaitEffectContext from "contexts/WaitEffectContext";

const HeaderNFTList: FC = () => {
  const { account } = useWeb3React();

  const {
    setShowBackDrop,
    setShowSnackBar,
    setSuccessMessage,
    setErrorMessage,
    showBackDrop,
  } = useContext(WaitEffectContext);

  const { getSolvedProblems } = useSolvedProblems();
  const solvedProblems = getSolvedProblems();
  const theme = useTheme();
  const { multiLang } = useContext(LanguageContext);

  const nftImgLinks = [
    "https://i.imgur.com/fSFl7io.png",
    "https://i.imgur.com/OP9jv73.png",
    "https://i.imgur.com/VRYrAZ5.png",
    "https://i.imgur.com/IFRMdTA.png",
    "https://i.imgur.com/lgGrqE6.png",
    "https://i.imgur.com/yvn5IdB.png",
  ];

  const requestNFT = async () => {
    setShowBackDrop(true);
    await axios
      .post(process.env.REACT_APP_BASE_API_URL + "/hitcon-nft-sender", {
        address: account,
      })
      .then((response) => {
        // console.log(response);
        setSuccessMessage("Request NFT Success");
        setShowSnackBar(1);
      })
      .catch((error) => {
        // console.log(error);
        setErrorMessage("ERROR! Request failed");
        setShowSnackBar(2);
      });
    setShowBackDrop(false);
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={8}>
        {solvedProblems.map((solved: boolean, idx: number) => (
          <Grid item xs={1} key={idx}>
            <Tooltip arrow title={multiLang?.problems.challenges[idx].title}>
              <Avatar
                variant="rounded"
                src={nftImgLinks[idx]}
                sx={{
                  borderWidth: "3px",
                  borderStyle: "dashed",
                  borderColor: solved
                    ? theme.colors.success.main
                    : theme.colors.error.main,
                  padding: "1px",
                }}
                imgProps={{
                  style: {
                    opacity: solved ? "100%" : "40%",
                  },
                }}
              />
            </Tooltip>
          </Grid>
        ))}

        {solvedProblems.every((v) => v === true) && (
          <>
            <Grid item lg={3} key={7}>
              <LoadingButton
                variant="contained"
                onClick={requestNFT}
                loading={showBackDrop}
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
};

export default HeaderNFTList;
