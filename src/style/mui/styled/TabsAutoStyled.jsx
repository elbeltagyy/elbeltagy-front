import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabInfo from '../../../components/ui/TabInfo';
import { useState } from 'react';
import { FlexColumn } from './Flexbox';

export default function TabsAutoStyled({ tabs, defaultVal = 0, style = {} }) {
    // **_** Make component to be fully automatic

    const [value, setValue] = useState(defaultVal)

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    // Validate the `value` value
    const isValid = tabs.some(option => option.value === value);
    const safeValue = isValid ? value : (tabs[0]?.value); // Fallback to 0 if the grade is invalid
    const component = tabs.find(t => t.value === value)?.component

    return (
        <FlexColumn sx={{ width: '100%', gab: '16px', ...style }}>
            <Box
                sx={{
                    // maxWidth: { xs: 320, sm: 480 },
                    bgcolor: 'background.paper',
                    borderRadius: '16px',
                    width: '100%'
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
            {component}
        </FlexColumn>

    );
}