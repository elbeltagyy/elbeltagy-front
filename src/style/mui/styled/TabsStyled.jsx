import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Avatar, Button } from '@mui/material';
import TabInfo from '../../../components/ui/TabInfo';





export default function TabsStyled({ tabs, setValue, value, defaultValue = '' }) {

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    // Validate the `value` value
    const isValid = tabs.some(option => option.value === value);
    const safeValue = isValid ? value : (tabs[0]?.value); // Fallback to 0 if the grade is invalid


    return (
        <Box
            sx={{
                // maxWidth: { xs: 320, sm: 480 },
                bgcolor: 'background.paper',
                borderRadius: '16px',
            }}
        >
            <Tabs
                value={safeValue}
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