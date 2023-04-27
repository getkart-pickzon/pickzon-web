import { Box, Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Assets } from '../../../assets/Assets'
import NavigationList from '../../../component/organisms/navigationList'
import NavigationPaths from '../../../routes/navigationPath'


const navigateArr = [
    { label: "Search", iconBlue: Assets.search_icon_blue.img, iconGrey: Assets.search_icon_grey.img, path: NavigationPaths.SEARCH },
    { label: "Feed", iconBlue: Assets.feed_icon_blue.img, iconGrey: Assets.feed_icon_grey.img, path: NavigationPaths.FEED },
    { label: "Page", iconBlue: Assets.pages_icon_blue.img, iconGrey: Assets.pages_icon_grey.img, path: NavigationPaths.PAGE },
    { label: "Notifications", iconBlue: Assets.notification_icon_blue.img, iconGrey: Assets.notification_icon_grey.img, path: "" },
    { label: "Saved Posts", iconBlue: Assets.savepost_icon_blue.img, iconGrey: Assets.savepost_icon_grey.img, path: NavigationPaths.SAVEFEED },
]


const WallPost = () => {

    return (
        <Grid container>
            <Grid item lg={3} xl={3}>
                <Box p={"0.5rem 0"}>
                    <NavigationList array={navigateArr} />
                </Box>
            </Grid>
            <Grid item lg={6} xl={6} sx={{ backgroundColor: "secondary.900" }}>
                <Box p={"1rem 2rem"}>
                    <Outlet />
                </Box>
            </Grid>
            <Grid item lg={3} xl={3}>

            </Grid>
        </Grid>
    )
}

export default WallPost;