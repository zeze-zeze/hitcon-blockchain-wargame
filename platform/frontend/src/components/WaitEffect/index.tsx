import { FC, Dispatch, SetStateAction, useState, useContext } from "react";
import {
    Backdrop,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import EffectContext from "contexts/EffectContext";

const WaitEffect: FC = () => {
    const { showSnackBar, showBackDrop, setShowSnackBar, successMessage, errorMessage } = useContext(EffectContext);
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
                onClose={() => {
                    setShowSnackBar(0);
                }}
            >
                <Alert
                    onClose={() => {
                        setShowSnackBar(0);
                    }}
                    severity={showSnackBar === 1 ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {showSnackBar === 1 ? (successMessage ?? 'Success') : (errorMessage ?? 'Failed')}
                </Alert>
            </Snackbar>
        </>
    )
};

export default WaitEffect;