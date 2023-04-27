import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Assets } from "../../../assets/Assets";
import { PUBLIC } from "../../../routes/apiEndPoints";
import { GET } from "../../../services";

const WebLogo = () => {
    const theme = useTheme();
    const [state, setState] = useState([]);
    const defaultLogo = theme.palette.mode === "dark" ? Assets.logo_white.img : Assets.logo_black.img
    const defaultAlt = theme.palette.mode === "dark" ? Assets.logo_white.alt : Assets.logo_black.alt

    useEffect(() => {
        const api_FetchLogo = async () => {
            try {
                let { status, message, payload } = await GET(PUBLIC.FETCH_LOGO, {});
                if (status === 0) {
                    return console.error(message);
                }
                setState(payload);
            } catch (err) {
                console.log(err)
            }
        };
        api_FetchLogo();
    }, [])

    return (
        <>
            {
                !state.length ?
                    <img src={defaultLogo} alt={defaultAlt} style={{ height: "2.5rem" }} />
                    :
                    <img src={state.length === 0 ? defaultLogo : state[0]?.media} alt={state.length === 0 ? defaultAlt : state[0]?.alt} style={{ height: "2.5rem" }} />
            }
        </>
    )
}

export default React.memo(WebLogo);