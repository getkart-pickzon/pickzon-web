import { Badge, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { tokens } from '../../../theme/theme'

const Color = tokens();
const NavigationList = ({ array = [], notificationCount = "1" }) => {

    return (
        <List sx={{ m: "0rem 2rem" }}>
            {array.map((item, i) => {
                return (<ListItem
                    key={i}
                    component={NavLink}
                    to={item.path}
                    style={({ isActive }) => (isActive ? Style.listWrapperActive : Style.listWrapper)}
                    alignItems='center'
                    secondaryAction={
                        item.label === 'Notification' &&
                        <Badge color="error" badgeContent={notificationCount} max={999} sx={{ mr: 3 }} />
                    }>
                    <ListItemAvatar>
                        <Box alignItems={"center"} display={"flex"}>
                            <img alt={item.label} src={item.iconGrey} style={{ width: "35px", height: "35px" }} />
                        </Box>
                    </ListItemAvatar>
                    <ListItemText >
                        <Typography variant='h6' sx={{ fontWeight: "900", color: 'primary.600' }}>
                            {item.label}
                        </Typography>
                    </ListItemText>
                </ListItem>)
            })}
        </List >
    )
}

export default NavigationList;

const Style = {
    listWrapper: {
        cursor: "pointer",
        borderRadius: "5rem",
        padding: "1rem 2rem",
        border: "0.125rem solid",
        borderColor: "transparent",
        '&:hover': {
            backgroundColor: 'secondary.900',
            transition: "0.2s"
        },
    },
    listWrapperActive: {
        backgroundColor: Color.blueAccent[900],
        cursor: "pointer",
        borderRadius: "5rem",
        padding: "1rem 2rem",
        border: "0.125rem solid",
        borderColor: "transparent",
    }
}