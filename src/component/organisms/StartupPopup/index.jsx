import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getBrowserLocation } from '../../../helper/getDeviceLocation';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Assets } from '../../../assets/Assets';
import { List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import { installAppBtn } from '../../../utils/common';

const Style = {
    wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",
        border: "none",
        outline: "none",
        p: 1,
    },
    WrapperBox: {
        backgroundColor: "#fff",
        borderRadius: 2,
        p: 1
    }
};

const StartUpPopUp = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        async function callEffect() {
            let device = await getBrowserLocation();
            if (device.OS === 'Android' || device.OS === 'iPhone' || device.OS === 'iPad') {
                handleOpen()
            } else {
                handleClose();
            }
        }; callEffect();
    }, [])

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={Style.wrapper}>
                <Box sx={Style.WrapperBox}>
                    <Stack>
                        <Box textAlign={"right"}>
                            <CloseRoundedIcon sx={{ fontWeight: "900" }} onClick={handleClose} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: "900", textAlign: "center" }}>
                            To get the app right now, click Install.
                        </Typography>
                        <List>
                            <ListItem
                                secondaryAction={<Button variant="contained"
                                    sx={{
                                        backgroundColor: 'secondary.main', textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "secondary.main",
                                        }
                                    }}
                                    onClick={() => installAppBtn()}>
                                    Install
                                </Button>}>
                                <ListItemAvatar>
                                    <Box display={"flex"} alignItems={"center"}>
                                        <img src={Assets.logo_square.img} alt={Assets.logo_square.alt} style={{ height: "100%", width: "2.5rem" }} />
                                    </Box>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Typography variant='h6' sx={{ fontWeight: "900" }}>
                                        Pickzon
                                    </Typography>
                                } secondary="Pickzon, Inc." />
                            </ListItem>
                        </List>
                        <img src={Assets.popUp.img} alt={Assets.popUp.alt} style={{ width: "100%", paddingRight: "1rem" }} />
                        <Typography variant='body1' sx={{ p: "0 0.5rem" }}>
                            The PickZon app lets you express your feelings, create pages and connect with others!
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
}
export default StartUpPopUp