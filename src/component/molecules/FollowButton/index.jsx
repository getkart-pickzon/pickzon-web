import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Assets } from '../../../assets/Assets'

const FollowButton = () => {
    const [state, setState] = useState(false);

    const followIcon = <img src={Assets.follow_icon.img} alt={Assets.follow_icon.img} width={"15px"} />
    const followingIcon = <img src={Assets.following_icon.img} alt={Assets.following_icon.img} width={"15px"} />

    const onHandleClick = () => {
        setState(!state)
    }

    const Styled = {
        padding: "0.2rem 1rem",
        marginRight: "0.5rem",
        width: "120px",
        backgroundColor: state ? 'primary.800' : "secondary.main",
        textTransform: "none",
        borderRadius: "1.5rem",
        boxShadow: "none",
        color: state ? "secondary.main" : "neutral.100",
        '&:hover': {
            backgroundColor: state ? "primary.900" : "secondary.main",
            boxShadow: "none",
        },
    }

    return (
        <Button variant="contained" startIcon={state ? followingIcon : followIcon} sx={Styled} onClick={onHandleClick}>
            {state ? "Following" : "Follow"}
        </Button>
    )
}

export default FollowButton;

