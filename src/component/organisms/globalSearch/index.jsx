import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const GlobalSearch = (props) => {
    const [hideSuggestions, setHideSuggestions] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const onHandleSearch = () => {
        setHideSuggestions(true);
    }




    return (
        <Box>
            <Box>
                <Search>
                    <SearchIconWrapper>
                        {/* <img src={Assets.search_black_icon.img} alt={Assets.search_black_icon.alt} style={{ width: "50px", height: "25px" }} /> */}
                        <SearchRoundedIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        onClick={onHandleSearch}
                        // value
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <SearchIconWrapper>
                        <CloseRoundedIcon sx={{ color: 'primary.main', cursor: "pointer" }} />
                    </SearchIconWrapper>
                </Search>
                <Tabs
                    value={value}
                    onChange={(e, newValue) => setValue(newValue)}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                >
                    {tabList.map((item, i) => {
                        return (
                            <Tab iconPosition="start" icon={item.icon} label={item.label} key={i} sx={{ textTransform: "none", fontSize: "1rem", color: 'secondary.400' }} />
                        )
                    })}
                </Tabs>
                <Box>
                    aldskfj
                    jdshfvb
                </Box>
            </Box>
        </Box>
    )
}

export default GlobalSearch;

const tabList = [
    { label: "People", icon: <PersonRoundedIcon /> },
    { label: "Pages", icon: <ContactPageRoundedIcon /> },
    { label: "Hastags", icon: <TagRoundedIcon /> },
    { label: "Media", icon: <SubscriptionsRoundedIcon /> },
]

const Search = styled('div')(() => ({
    position: 'relative',
    borderRadius: "0.8rem",
    backgroundColor: '#fff',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '&:focus': {
        border: "1px solid blue",
    },
    padding: "1rem 1rem",
    width: '100%',
}));

const SearchIconWrapper = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
}));

const StyledInputBase = styled(InputBase)(() => ({
    fontSize: "1rem",
    color: "#000",
    width: "100%",
    // padding: " 0.5rem",

}));