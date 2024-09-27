import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Avatar, Button } from '@mui/material';
import TabInfo from '../../../components/ui/TabInfo';





export default function TabsStyled({ tabs, setValue, value }) {

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };


    return (
        <Box
            sx={{
                // maxWidth: { xs: 320, sm: 480 },
                bgcolor: 'background.paper',
                borderRadius: '16px',
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                allowScrollButtonsMobile
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    },
                }}
            >
                {tabs?.map((tab, i) => {
                    return (
                        <Tab sx={{
                        }} key={i}
                            label={<TabInfo count={tab?.count} i={i} title={tab.label} />}
                            value={tab?.value} />

                    )
                })}



            </Tabs>
        </Box>
    );
}