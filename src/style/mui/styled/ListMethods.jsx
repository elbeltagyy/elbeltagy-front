import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Radio } from '@mui/material';

function ListMethods({ methods = [], setMethod, activeMethod, disabled = [], sx, itemWidth = 360, isMulti = false, disableP = true }) { //{ value, icon, label, desc }

    const isDisabled = (method) => {
        if (method.isValid) return false

        if (disabled.includes(method?.value)) {
            return true
        } else {
            return false
        }
    }

    const isChecked = (value) => {
        if (isMulti) {
            return activeMethod.includes(value)
        } else {
            return activeMethod === value
        }
    }

    const handelChosen = (value) => {
        if (isMulti) {
            if (isChecked(value)) {
                setMethod(prev => (prev.filter(ele => ele !== value)))
            } else {
                setMethod(prev => ([...prev, value]))
            }
        } else {
            setMethod(value)
        }
    }

    return (
        <List sx={{ width: '100%', ...sx }}>
            {methods.map((method) => {
                const labelId = `checkbox-list-label-${method.value}`;

                return (
                    <ListItem
                        key={method.value}

                        sx={{
                            border: '1px dotted grey',
                            mb: '6px',
                            borderRadius: '6px',
                            maxWidth: itemWidth,
                            ...method.sx
                        }}
                        disablePadding={disableP}
                    >
                        <ListItemButton disabled={isDisabled(method)} role={undefined} onClick={() => handelChosen(method.value)} dense>
                            <ListItemIcon>
                                <Radio
                                    checked={isChecked(method?.value)}
                                    value={method.value}
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': method.value }}
                                    edge='end'
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={method.label} secondary={method.description} />
                            {/* secondaryAction={ */}
                            <IconButton edge="end" aria-label="comments" disabled={isDisabled(method)}>
                                {method.icon}
                            </IconButton>
                        {/* } */}
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default ListMethods
