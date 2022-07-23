import { FC, useContext, useEffect, useState } from "react";
import { Avatar, Box, Grid, List, ListItem, Tooltip, Typography, useMediaQuery } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import axios from "axios";
import useSolvedProblems from "hooks/useSolvedProblems";
import { styled, useTheme } from "@mui/material/styles";
import LanguageContext from "contexts/LanguageContext";
import WaitEffectContext from "contexts/WaitEffectContext";
import Web3Context from "contexts/Web3Context";

const HeaderNFTList: FC = () => {
    const { account, active } = useWeb3React();
    
    const {
        setShowBackDrop,
        setShowSnackBar,
        setSuccessMessage,
        setErrorMessage,
        showBackDrop
    } = useContext(WaitEffectContext);

    
    const { solved } = useContext(Web3Context);
    const theme = useTheme();
    const showSolved = useMediaQuery("(min-width:940px)");
    const { multiLang } = useContext(LanguageContext);

    const nftImgLinks = [
        "https://i.imgur.com/fSFl7io.png",
        "https://i.imgur.com/OP9jv73.png",
        "https://i.imgur.com/VRYrAZ5.png",
        "https://i.imgur.com/IFRMdTA.png",
        "https://i.imgur.com/lgGrqE6.png",
        "https://i.imgur.com/yvn5IdB.png"
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

    return showSolved ? (
        <Grid container justifyContent="center" alignItems="center" spacing={8}>
            {
                solved.map((yn: boolean, idx: number) => (
                    <Grid item xs={1} key={idx}>
                        <Tooltip arrow title={multiLang?.problems.challenges[idx].title ?? ""}>
                            <Avatar
                                variant="rounded"
                                src={nftImgLinks[idx]}
                                sx={{
                                    borderWidth: "3px",
                                    borderStyle: "dashed",
                                    borderColor: yn ? theme.colors.success.main : theme.colors.error.main,
                                    padding: "1px"
                                }}
                                imgProps={{
                                    style: {
                                        opacity: yn ? "100%" : "40%",
                                    }
                                }}
                            />
                        </Tooltip>
                    </Grid>
                ))
            }

            {solved.every((v) => v === true) && (
                <>
                    <Grid item lg={3} key={7}>
                        <LoadingButton
                            variant="contained"
                            color="error"
                            onClick={requestNFT}
                            loading={showBackDrop}
                            loadingIndicator="Requesting..."
                        >
                            {multiLang?.dashboard.header.achievement.requestNFT}
                        </LoadingButton>
                    </Grid>
                </>
            )}
        </Grid>
    ) : (

        <>
            <List sx={{
                backgroundColor: theme.colors.alpha.black[100],
                borderRadius: theme.spacing(0.8),
                margin: theme.spacing(1),
            }}>
                {
                    solved.map((yn: boolean, idx: number) => (
                        <ListItem
                            key={idx}
                            sx={{
                                my: theme.spacing(0.8),
                                py: theme.spacing(1),
                            }}
                        >
                            <Tooltip
                                arrow
                                placement="left"
                                title={multiLang?.problems.challenges[idx].title ?? ""}
                            >
                                <Avatar
                                    variant="rounded"
                                    src={nftImgLinks[idx]}
                                    sx={{
                                        borderWidth: "3px",
                                        borderStyle: "dashed",
                                        borderColor: yn ? theme.colors.success.main : theme.colors.error.main,
                                        padding: "1px",
                                    }}
                                    imgProps={{
                                        style: {
                                            opacity: yn ? "100%" : "40%",
                                        }
                                    }}
                                />
                            </Tooltip>
                            <Box sx={{
                                ml: theme.spacing(2)
                            }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: yn ? theme.colors.success.main : theme.colors.error.main
                                    }}
                                >
                                    {yn ? multiLang?.problems.solved : multiLang?.problems.notSolved}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))
                }
                <ListItem>
                    {solved.every((v) => v === true) && (
                        <Grid item lg={3} key={7}>
                            <LoadingButton
                                variant="contained"
                                color="error"
                                onClick={requestNFT}
                                loading={showBackDrop}
                                loadingIndicator="Requesting..."
                            >
                                {multiLang?.dashboard.header.achievement.requestNFT}
                            </LoadingButton>
                        </Grid>
                    )}
                </ListItem>
            </List>
        </>
    );
};

export default HeaderNFTList;
