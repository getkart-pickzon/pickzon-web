import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Container, Grid, List, ListItem, ListItemText, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import Metatags from '../../../component/organisms/MetaTags';
import { onLogin } from '../../../redux/reducer/userInfo/index'
import { GET, SOCKET } from '../../../services';
import { getBrowserLocation } from '../../../helper/getDeviceLocation/index'
import NavigationPaths from '../../../routes/navigationPath';
import { AUTH, WEB } from '../../../routes/apiEndPoints';
import { setToken } from '../../../utils/common';
import { Assets } from '../../../assets/Assets';

const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;
const defaultObj = {
    mediaArray: [],
    qrImage: "",
    imgInterval: false
}

const Login = () => {
    console.clear(); //websocket.js:50 WebSocket connection to 'wss://apps.getkart.com/socket.io/?EIO=4&transport=websocket&sid=vjTThkAUB5T7lIIUAACE' failed:
    const socket = SOCKET;
    let location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isNonMobile = useMediaQuery(theme.breakpoints.up('sm'));
    const tabletScreen = useMediaQuery("(max-width:1366px)");
    const [state, setState] = useState(defaultObj);

    useEffect(() => {
        const api_FetchWebMedia = async () => {
            try {
                let { status, message, payload } = await GET(`${WEB.WEB_NAME}${location.pathname}`);
                if (status === 0) {
                    console.log(message);
                }
                setState((prev) => ({
                    ...prev,
                    mediaArray: payload.mediaCdnUrl || [],
                }));
            } catch (error) {
                console.error(error);
            }
        };
        api_FetchWebMedia();
        api_FetchQRImage();
    }, [location.pathname]);

    const api_FetchQRImage = () => {
        try {
            socket.emit('connectionForLoginWeb', { name: 'pickzon', room: 'pickzon-web' }, (error) => {
            });
            socket.on('connectedSuccess', async (data) => {
                try {
                    let obj = { ...await getBrowserLocation(), socketId: socket.id }
                    const { payload } = await GET(AUTH.FETCH_QRIMAGE, obj);
                    setState((prev) => ({
                        ...prev,
                        qrImage: payload,
                        imgInterval: false
                    }));
                    setTimeout(() => {
                        setState((prev) => ({
                            ...prev,
                            imgInterval: true
                        }));
                    }, 150000);
                } catch (error) {
                    console.log(error);
                }
            })
            socket.on('IO_loggedIn', async (data) => {
                try {
                    setToken(TOKEN_NAME, data.secret, { path: NavigationPaths.HOME });
                    dispatch(onLogin(data.payload));
                    navigate(NavigationPaths.FEED);
                } catch (error) {
                    console.log(error);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const Style = {
        bgImage: {
            backgroundImage: isNonMobile && `url(${state.mediaArray[0]?.media})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%"
        }
    }

    return (
        <>
            <Metatags />
            <Container maxWidth="false" sx={{ height: "100vh" }}>
                <Grid container spacing={4} sx={Style.bgImage}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Box pl={{ xs: 0, sm: 0, md: 0, lg: 10, xl: 25 }}>
                            <Box>
                                <Typography variant={!tabletScreen ? "h2" : "h3"} sx={{ fontWeight: "700" }}>
                                    USE Pickzon on your phone to scan the code
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant={"h6"}>
                                                1. Open Pickzon App on your phone.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant={"h6"} sx={{ display: "flex", alignItems: "center" }}>
                                                2. Tap more&nbsp;<PendingOutlinedIcon sx={{ fontSize: "1.2rem" }} />&nbsp;and profile option.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant={"h6"}>
                                                3. In profile option select Pickzon Web Login.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography variant={"h6"}>
                                                4. Point your phone to this screen to capture the QR code.
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                </List>
                                <Typography variant={"h5"}>
                                    To reduce mobile data usage, connect your phone to Wi-Fi.
                                </Typography>
                            </Box>
                            <Stack direction={"row"} spacing={3} justifyContent={"flex-start"} mt={4}>
                                <Box component={"a"} href="https://apps.apple.com/in/app/pickzon/id1560097730" target="_blank" rel="noreferrer noopener">
                                    <img
                                        src={state.mediaArray[1]?.media}
                                        alt={state.mediaArray[1]?.alt}
                                        style={{ maxWidth: "200px", borderRadius: "0.8rem" }}
                                    />
                                </Box>
                                <Box component={"a"} href="https://play.google.com/store/apps/details?id=com.chat.pickzon" target="_blank" rel="noreferrer noopener">
                                    <img
                                        src={state.mediaArray[2]?.media}
                                        alt={state.mediaArray[2]?.alt}
                                        style={{ maxWidth: "200px", borderRadius: "0.8rem" }}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: "5" }}>
                        <Box sx={{ position: "relative" }}>
                            <img src={state.mediaArray[3]?.media} alt={state.mediaArray[3]?.alt} style={{ maxWidth: tabletScreen ? "14rem" : "20rem" }} />
                            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                                {!state.qrImage ?
                                    <CircularProgress />
                                    :
                                    <>
                                        {state.imgInterval === false ?
                                            <>
                                                {state.qrImage ?
                                                    <img src={state.qrImage} alt="pickzon_QR" style={{ height: tabletScreen ? "7rem" : "10rem" }} />
                                                    :
                                                    <img src={Assets.reload_QR.img} alt={Assets.reload_QR.alt} style={{ cursor: 'pointer', height: tabletScreen ? "7rem" : "10rem" }} onClick={api_FetchQRImage} />}
                                            </>
                                            :
                                            <img src={Assets.reload_QR.img} alt={Assets.reload_QR.alt} style={{ cursor: 'pointer', height: tabletScreen ? "7rem" : "10rem" }} onClick={api_FetchQRImage} />}
                                    </>}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Login