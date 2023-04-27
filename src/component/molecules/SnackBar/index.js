import React, { useEffect, useState } from 'react'
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import { useDispatch } from 'react-redux';
import { onClearSnackbar } from '../../../redux/reducer/snackbar';

function SlideTransition(props) {
    return (<Slide {...props} direction="down" />);
}

export default function SnackBar({ message, status, call }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(call);
    }, [call])

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        dispatch(onClearSnackbar())
    };

    return (
        message && status && call &&
        <Snackbar
            open={open}
            TransitionComponent={SlideTransition}
            autoHideDuration={2000}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            onClose={handleClose} action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }>
            <Alert onClose={handleClose} severity={status ? status : "info"} sx={{ width: '100%', fontSize: "1.2rem" }}>
                {message}
            </Alert>
        </Snackbar >)
}
