import { FC, Dispatch, SetStateAction, useState } from "react";
import {
    Backdrop,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";

type WaitEffectProps = {
    showBackDrop: boolean;
    showSnackBar: number;
    setShowSnackBar: Dispatch<SetStateAction<number>>;
    success?: string;
    error?: string;
};

const WaitEffect: FC<WaitEffectProps> = ({
    showBackDrop,
    showSnackBar,
    setShowSnackBar,
    success,
    error
}) => {
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
                    severity={showSnackBar === 1 ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {showSnackBar === 1 ? (success ?? 'Success') : (error ?? 'Failed')}
                </Alert>
            </Snackbar>
        </>
    )
};

export default WaitEffect;