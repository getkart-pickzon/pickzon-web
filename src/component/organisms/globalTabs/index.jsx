import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const GlobalTabs = ({ tabArray }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
            >
                {tabArray.map((item, i) => {
                    return (
                        <Tab iconPosition="start" icon={item.icon} label={item.label} key={i} sx={{ textTransform: "none", fontSize: "1rem", color: 'secondary.400' }} />
                    )
                })}
            </Tabs>

        </Box>
    );
}
export default GlobalTabs;