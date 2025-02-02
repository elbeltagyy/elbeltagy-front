import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Radio } from '@mui/material';
import { useEffect } from 'react';

function ListMethods({ methods = [], setMethod, activeMethod, disabled = [] }) { //{ id, icon, label, desc }

    const isDisabled = (value) => disabled.includes(value) ? true : false

    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {methods.map((method) => {
                const labelId = `checkbox-list-label-${method.value}`;

                return (
                    <ListItem
                        key={method.value}
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments" disabled={isDisabled(method?.value)}>
                                {method.icon}
                            </IconButton>
                        }
                        sx={{
                            border: '1px dotted grey',
                            mb: '6px',
                            borderRadius: '6px'
                        }}
                        disablePadding
                    >
                        <ListItemButton disabled={isDisabled(method?.value)} role={undefined} onClick={() => setMethod(method.value)} dense>
                            <ListItemIcon>
                                <Radio
                                    checked={activeMethod === method.value}
                                    value={method.value}
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': method.value }}
                                    edge='end'
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={method.label} secondary={method.description} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default ListMethods
