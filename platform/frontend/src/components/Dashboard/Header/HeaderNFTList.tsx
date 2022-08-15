import { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import Image from 'material-ui-image';
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
    const [token, setToken] = useState<string>("");
    const [confettiDialogOpen, setConfettiDialogOpen] = useState<boolean>(false);
    const [tokenDialogOpen, setTokenDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const links = [];
            for (let i = 0; i < Number(process.env.REACT_APP_CHALLENGE_NUM); i++) {
                const imgPng = await import(`assets/chal${i}.png`);
                const imgPath = imgPng.default;
                links.push(imgPath);
            }
            setNFTImgLinks(links);
        })();
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
            await axios
                .post(apiURL + "/hitcon-nft-sender", {
                    address: account,
                    token: token
                }, {
                    withCredentials: true
                });
            setShowBackDrop(false);
            setSuccessMessage(multiLang?.success.requestNFT);
            setShowSnackBar(1);
            setConfettiDialogOpen(true);
            addNotification({
                idx: Number(process.env.REACT_APP_CHALLENGE_NUM),
                date: Date.now(),
            });
            setShowConfetti(true);
            /*
             * Display "Request NFT" button or "View NFT" button
             * The backend still checks for duplicate requests.
             */
            localStorage.setItem("_NFT_requested_", "true");
            setTimeout(() => {
                setShowConfetti(false);
            }, 15000)
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.code === "ERR_BAD_REQUEST") {
                    const response: AxiosResponse = err.response as AxiosResponse;
                    if (!response.data.ok) {
                        const errMessage = response.data.message
                        if (errMessage === "Missing token") {
                            setErrorMessage(multiLang?.error.missingToken);
                        } else if (errMessage === "Invalid token") {
                            setErrorMessage(multiLang?.error.invalidToken);
                        } else if (errMessage === "Missing address or amount") {
                            setErrorMessage(multiLang?.error.walletNotLogin);
                        } else if (errMessage === "User unauthorized") {
                            setErrorMessage(multiLang?.error.NFTDenied);
                        } else if (errMessage === "NFT already requested") {
                            setErrorMessage(multiLang?.error.NFTRequestOnce);
                            localStorage.setItem("_NFTRequested_", "1");
                        } else if (errMessage === "Not all challenges are solved") {
                            setErrorMessage(multiLang?.error.notAllSolved);
                        } else if (errMessage === "Incorrect wallet address") {
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
    }, [multiLang, account, token]);

    return (
        <>
            { /* "login with token" dialog */}
            <Dialog
                open={tokenDialogOpen}
                onClose={() => setTokenDialogOpen(false)}
            >
                <DialogTitle id="dialog-title">
                    {multiLang?.landing.dialogs[0].title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-content">
                        {multiLang?.landing.dialogs[0].content}
                    </DialogContentText>
                    <Box>
                        <TextField
                            required
                            id="jwt"
                            placeholder="eyJhbGci..."
                            value={token}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setToken(event.target.value)
                            }}
                            fullWidth
                            sx={{
                                mt: theme.spacing(2)
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTokenDialogOpen(false)}>
                        {multiLang?.landing.dialogs[0].buttons.cancel}
                    </Button>
                    <Button onClick={() => {
                        setTokenDialogOpen(false);
                        requestNFT();
                    }}>
                        {multiLang?.landing.dialogs[0].buttons.submit}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* confetti dialog */}
            <Dialog
                open={confettiDialogOpen}
                onClose={() => {
                    setConfettiDialogOpen(false);
                    setShowConfetti(false);
                }}
            >
                <DialogTitle id="dialog-title">
                    {multiLang?.dashboard.header.achievement.dialogs[1].title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-content">
                        {multiLang?.dashboard.header.achievement.dialogs[1].content}
                    </DialogContentText>
                    <DialogContentText>
                        <a href="https://opensea.io/account" target="_blank">
                            https://opensea.io/account
                        </a>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setConfettiDialogOpen(false);
                        setShowConfetti(false);
                    }}>
                        {multiLang?.dashboard.header.achievement.dialogs[1].buttons.ok}
                    </Button>
                </DialogActions>
            </Dialog>
            {
                showSolved ? (
                    <Grid container justifyContent="center" alignItems="center" spacing={8}>
                        {
                            solved.map((yn: boolean, idx: number) => (
                                <Grid item xs={1} key={idx}>
                                    <Tooltip arrow title={
                                        <Box sx={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: 224,
                                            height: 240
                                        }}>
                                            <Container sx={{
                                                my: theme.spacing(2),
                                            }}>
                                                <Typography align="center" variant="h4">
                                                    {multiLang?.challenges.list[idx].title ?? ""}
                                                </Typography>
                                            </Container>
                                            <Container>
                                                <Image
                                                    src={NFTImgLinks[idx] ?? "#"}
                                                    disableSpinner
                                                    disableTransition
                                                    imageStyle={{
                                                        borderRadius: "8px",
                                                        boxShadow: "0 16px 16px 0 rgba(0,0,0,0.25),0 16px 16px 0 rgba(0,0,0,0.15)"
                                                    }}
                                                />
                                            </Container>
                                        </Box>
                                    }>
                                        <Link to={`/challenges/${idx}`}>
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
                                        </Link>
                                    </Tooltip>
                                </Grid>
                            ))
                        }

                        {/* Show the "Request NFT" button only when the user solved all challenges */}
                        {solved.every((v) => v === true) && (
                            <>
<<<<<<< HEAD
                                {
                                    localStorage.getItem("_NFT_requested_") === "true" ? (
                                        <Grid item lg={3}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                component="a"
                                                href="https://opensea.io/account"
                                                target="_blank"
                                            >
                                                {multiLang?.dashboard.header.achievement.viewNFT}
                                            </Button>
                                        </Grid>
                                    ) : (
                                        <Grid item lg={3}>
                                            <LoadingButton
                                                variant="contained"
                                                color="error"
                                                onClick={() => setTokenDialogOpen(true)}
                                                loading={showBackDrop}
                                                loadingIndicator="Requesting..."
                                            >
                                                {multiLang?.dashboard.header.achievement.requestNFT}
                                            </LoadingButton>
                                        </Grid>
                                    )
                                }
=======
                                <Grid item lg={3}>
                                    <LoadingButton
                                        variant="contained"
                                        color="error"
                                        onClick={() => setTokenDialogOpen(true)}
                                        loading={showBackDrop}
                                        loadingIndicator="Requesting..."
                                    >
                                        {multiLang?.dashboard.header.achievement.requestNFT}
                                    </LoadingButton>
                                </Grid>
>>>>>>> fc3da17 (Fixed solved challenges)
                            </>
                        )
                        }
                    </Grid >
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
                                        title={
                                            <Box sx={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: 224,
                                                height: 240
                                            }}>
                                                <Container sx={{
                                                    my: theme.spacing(2),
                                                }}>
                                                    <Typography align="center" variant="h4">
                                                        {multiLang?.challenges.list[idx].title ?? ""}
                                                    </Typography>
                                                </Container>
                                                <Container>
                                                    <Image
                                                        src={NFTImgLinks[idx] ?? "#"}
                                                        disableSpinner
                                                        disableTransition
                                                        imageStyle={{
                                                            borderRadius: "8px",
                                                            boxShadow: "0 16px 16px 0 rgba(0,0,0,0.25),0 16px 16px 0 rgba(0,0,0,0.15)"
                                                        }}
                                                    />
                                                </Container>
                                            </Box>
                                        }
                                    >
                                        <Link to={`/challenges/${idx}`}>
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
                                        </Link>
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
                            {/* Show the "Request NFT" button only when the user solved all challenges */}
                            {solved.every((v) => v === true) && (
                                <Grid item lg={3}>
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
