import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWeb3React } from "@web3-react/core";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useTheme } from "@mui/material/styles";
import LanguageContext from "contexts/LanguageContext";
import EffectContext from "contexts/EffectContext";
import Web3Context from "contexts/Web3Context";
import NotificationContext from "contexts/NotificationContext";

const HeaderNFTList: FC = () => {
    const { account, active } = useWeb3React();
    const {
        setShowBackDrop,
        setShowSnackBar,
        setSuccessMessage,
        setErrorMessage,
        setShowConfetti,
        showBackDrop
    } = useContext(EffectContext);
    const { addNotification } = useContext(NotificationContext);
    const { solved } = useContext(Web3Context);
    const theme = useTheme();
    const showSolved = useMediaQuery("(min-width:940px)");
    const { multiLang } = useContext(LanguageContext);
    const [NFTImgLinks, setNFTImgLinks] = useState<any[]>([]);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        const loadImg = async () => {
            const links = [];
            for (let i = 0; i < Number(process.env.REACT_APP_CHALLENGE_NUM); i++) {
                const imgPng = await import(`assets/chal${i}.png`);
                const imgPath = imgPng.default;
                links.push(imgPath);
            }
            setNFTImgLinks(links);
        };
        loadImg();
    }, []);

    const requestNFT = useCallback(async () => {
        let apiURL;
        switch (process.env.NODE_ENV) {
            case "development":
                apiURL = process.env.REACT_APP_BASE_API_URL_DEV;
                break;
            case "test":
                apiURL = process.env.REACT_APP_BASE_API_URL_TEST;
                break;
            case "production":
                apiURL = process.env.REACT_APP_BASE_API_URL_PROD;
                break;
            default:
                apiURL = process.env.REACT_APP_BASE_API_URL_DEV;
                break;
        }
        setShowBackDrop(true);
        try {
            /*await axios
                .post(apiURL + "/hitcon-nft-sender", {
                    address: account,
                }, {
                    withCredentials: true
                });
            */
            setShowBackDrop(false);
            setSuccessMessage(multiLang?.success.requestNFT);
            setShowSnackBar(1);
            setDialogOpen(true);
            setShowConfetti(true);
            addNotification({
                idx: Number(process.env.REACT_APP_CHALLENGE_NUM),
                date: Date.now(),
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.code === "ERR_BAD_REQUEST") {
                    const response: AxiosResponse = err.response as AxiosResponse;
                    if (!response.data.ok) {
                        const errMessage = response.data.message
                        if (errMessage === "Missing Address or Amount") {
                            setErrorMessage(multiLang?.error.missingAddressOrAmount);
                        } else if (errMessage === "User unauthorized") {
                            setErrorMessage(multiLang?.error.NFTDenied);
                        } else if (errMessage === "Not all challenges are solved") {
                            setErrorMessage(multiLang?.error.notAllSolved);
                        } else if (errMessage === "Incorrect Wallet Address") {
                            setErrorMessage(multiLang?.error.incorrectAddress);
                        } else if (errMessage === "NFT can only be requested once") {
                            setErrorMessage(multiLang?.error.NFTRequestOnce);
                        } else {
                            setErrorMessage(multiLang?.error.NFTFailed);
                        }
                    }
                } else {
                    setErrorMessage(multiLang?.error.serverError);
                }

            } else {
                setErrorMessage(multiLang?.error.unexpectedError);
            }
            setShowSnackBar(2);
            setShowBackDrop(false);
        }
    }, [account, multiLang]);

    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={() => {
                    setDialogOpen(false);
                    setShowConfetti(false);
                }}
            >
                <DialogTitle id="dialog-title">
                    {multiLang?.landing.dialogs[0].title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-content">
                        {multiLang?.landing.dialogs[0].content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setDialogOpen(false);
                        setShowConfetti(false);
                    }}>
                        {multiLang?.landing.dialogs[0].buttons.submit}
                    </Button>
                </DialogActions>
            </Dialog>
            {
                showSolved ? (
                    <Grid container justifyContent="center" alignItems="center" spacing={8}>
                        {
                            solved.map((yn: boolean, idx: number) => (
                                <Grid item xs={1} key={idx}>
                                    <Tooltip arrow title={multiLang?.challenges.list[idx].title ?? ""}>
                                        <a href={`/challenges/${idx}`}>
                                            <Avatar
                                                variant="rounded"
                                                src={NFTImgLinks[idx]}
                                                sx={{
                                                    borderWidth: "3px",
                                                    borderStyle: "dashed",
                                                    borderColor: (active && yn) ? theme.colors.success.main : theme.colors.error.main,
                                                    padding: "1px"
                                                }}
                                                imgProps={{
                                                    style: {
                                                        opacity: (active && yn) ? "100%" : "40%",
                                                    }
                                                }}
                                            />
                                        </a>
                                    </Tooltip>
                                </Grid>
                            ))
                        }

                        {true && (
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
                                        title={multiLang?.challenges.list[idx].title ?? ""}
                                    >
                                        <a href={`/challenges/${idx}`}>
                                            <Avatar
                                                variant="rounded"
                                                src={NFTImgLinks[idx]}
                                                sx={{
                                                    borderWidth: "3px",
                                                    borderStyle: "dashed",
                                                    borderColor: (active && yn) ? theme.colors.success.main : theme.colors.error.main,
                                                    padding: "1px",
                                                }}
                                                imgProps={{
                                                    style: {
                                                        opacity: (active && yn) ? "100%" : "40%",
                                                    }
                                                }}
                                            />
                                        </a>
                                    </Tooltip>
                                    <Box sx={{
                                        ml: theme.spacing(2)
                                    }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: (active && yn) ? theme.colors.success.main : theme.colors.error.main
                                            }}
                                        >
                                            {(active && yn) ? multiLang?.challenges.solved : multiLang?.challenges.notSolved}
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
                )
            }
        </>
    );
};

export default HeaderNFTList;
