// components/DataGridMassActions.js
import { useMemo, useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import BtnConfirm from '../../components/ui/BtnConfirm';
import BtnModal from '../../components/ui/BtnModal';

const DataGridMassActions = ({ selectedIds, actions, setSelection, deleteMany }) => {

    // Actions = [] => {onCLick(chosenIds), label, sx}
    const [anchorEl, setAnchorEl] = useState(null);
    const modifiedItems = useMemo(() => {
        let mass = [
            ...actions
        ]

        if (deleteMany) {
            mass = [
                ...mass, {
                    label: 'ازاله العناصر المختاره ' + '(' + selectedIds.length + ')', modalInfo: { desc: 'سيتم ازاله العناصر المختاره فقط' + ' ' + selectedIds.length + ' عنصر' },
                    onClick: () => {
                        deleteMany({
                            ids: selectedIds
                        })
                    }
                }
            ]
        }
        mass = [...mass, {
            label: 'reset to 0',
            noConfirm: true,
            onClick: () => {
                setSelection()
            }
        }]
        return mass
    }, [actions])

    const handleOpen = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    if (!selectedIds.length || (!actions.length && !deleteMany)) return null;
    return (
        <Box>
            <Button color='error' variant="contained" onClick={handleOpen}>
                اجراء جماعي ({selectedIds.length})
            </Button>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {modifiedItems.map((action, i) => action.noConfirm ? <MenuItem
                    key={i}
                    sx={{
                        ...action.sx
                    }}
                    onClick={() => {
                        action?.onClick(selectedIds);
                        setSelection()
                        handleClose();
                    }}
                >
                    {action?.label || 'test'}
                </MenuItem>
                    : action.Component ? <MenuItem
                        key={i}
                        sx={{
                            ...action.sx
                        }} >
                        <action.Component selectedIds={selectedIds} />
                    </MenuItem>
                        : (
                            <BtnConfirm
                                modalInfo={action.modalInfo}
                                key={i}
                                btn={<MenuItem
                                    sx={{
                                        ...action.sx
                                    }}
                                    onClick={() => {
                                        action?.onClick(selectedIds);
                                        if (!action.dontResetSelection) {
                                            setSelection()
                                        }
                                        handleClose();
                                    }}
                                >
                                    {action?.label || 'test'}
                                </MenuItem>}
                            />
                        ))}
            </Menu>
        </Box>
    );
};

export default DataGridMassActions;
