import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Avatar, Box, ListItemAvatar, Radio, Typography } from '@mui/material';
import Grid from '../../vanilla/Grid';

function ListMethods({ methods = [], setMethod, activeMethod, disabled = [], excludeFc = null, sx, itemWidth = 360, isMulti = false, disableP = true }) { //{ value, icon, label, desc }

    const isDisabled = (method) => {
        if (method.isValid) return false
        if (method.disabled) return true

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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <List sx={{ ...sx }}>

                {methods.map((method) => {
                    if (excludeFc) {
                        const isTrue = excludeFc(method)

                        if (isTrue) {
                            return
                        }
                    }
                    const labelId = `checkbox-list-label-${method.value}`;

                    return (
                        <Grid key={method.value}>

                            <ListItem
                                key={method.value}

                                sx={{
                                    position: 'relative',
                                    border: '1px dotted grey',
                                    mb: '6px',
                                    borderRadius: '6px',
                                    width: '100%',
                                    // maxWidth: itemWidth,
                                    ...method.sx
                                }}
                                disablePadding={disableP}
                            >
                                {method.overlay}

                                <ListItemButton disabled={isDisabled(method)} onClick={() => handelChosen(method.value)} dense>
                                    <ListItemIcon>
                                        <Radio
                                            checked={isChecked(method?.value)}
                                            value={method.value}
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': method.value }}
                                            edge='end'
                                        />
                                    </ListItemIcon>

                                    <ListItemText id={labelId}
                                        primary={<Typography component={'span'} color={'primary.main'} variant='subtitle1'>{method.label}</Typography>}
                                        secondary={method.descCompo ? method.description : <span dangerouslySetInnerHTML={{ __html: method.description }} />}
                                    />

                                    {/* secondaryAction={ */}
                                    <IconButton edge="end" aria-label="comments" disabled={isDisabled(method)}>
                                        {method.icon}
                                    </IconButton>

                                    {method.image && (
                                        <ListItemAvatar>
                                            <Avatar alt="Image" src={method.image} />
                                        </ListItemAvatar>
                                    )}
                                </ListItemButton>
                            </ListItem>

                        </Grid>

                    )
                })}
            </List>
        </Box>

    );
}

export default ListMethods
