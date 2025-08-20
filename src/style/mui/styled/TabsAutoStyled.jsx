import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabInfo from '../../../components/ui/TabInfo';
import { useEffect, useMemo, useState } from 'react';
import { FlexColumn } from './Flexbox';
import { useSearchParams } from 'react-router-dom';


// {
//     value: 0, label: 'ارسال تقرير', component: <ReportCompo
//         course={course} excludedUsers={excludedUsers} isExcluded={isExcluded} />,
// },
const parseTabValue = (val) => {
    const parsed = Number(val);
    return isNaN(parsed) ? val : parsed;
};

export default function TabsAutoStyled({ originalTabs = [], defaultVal = 0, style = {}, searchVal = 'valueId' }) {
    // **_** Make component to be fully automatic

    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState(() => {
        const paramVal = searchParams.get(searchVal);
        return paramVal ? parseTabValue(paramVal) : defaultVal;
    });

    const handleChange = (e, newValue) => {
        setValue(newValue);
        const newParams = new URLSearchParams(searchParams);
        newParams.set(searchVal, newValue);
        setSearchParams(newParams);
    };

    useEffect(() => {
        const paramVal = searchParams.get(searchVal);
        setValue(paramVal !== null ? Number(paramVal) : defaultVal);
    }, [searchParams, searchVal, defaultVal]);

    const tabs = useMemo(() => {
        return originalTabs.map((tab, i) => ({
            ...tab,
            value: tab.value ?? i
        }));
    }, [originalTabs]);

    // Validate the `value` value
    const safeValue = useMemo(() => {
        return tabs.some(tab => tab.value === value) ? value : tabs[0]?.value;
    }, [value, tabs]);
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
            <Box sx={{ width: '100%' }}>
                {component}
            </Box>
        </FlexColumn>

    );
}