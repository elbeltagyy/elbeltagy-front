import { Avatar, CardHeader, Chip, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material"
import TabInfo from "../ui/TabInfo"
import { getFullDate } from "../../settings/constants/dateConstants"
import BtnConfirm from "../ui/BtnConfirm"

import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { useSelector } from "react-redux";
import { communityStatus } from "../../settings/constants/communityConstants";
import { user_roles } from "../../settings/constants/roles";


const hue = (name) => [...name].reduce((n, c) => (n * 31 + c.charCodeAt(0)) % 360, 0);
const initials = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join(" ");

function UserAvatar({ name, size = 36 }) {
    return (
        <Avatar sx={{ width: size, height: size, fontSize: size * 0.38, fontWeight: 700, bgcolor: `hsl(${hue(name)} 55% 45%)` }}>
            {initials(name)}
        </Avatar>
    );
}


function QuestionCardHeader({ q, handleAction, isAdmin }) {

    const user = useSelector(s => s.global.user)
    const questionUser = q.user

    const authorName = questionUser.name
    const isMe = user?._id === questionUser?._id

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (t) => {
        handleClose()
        handleAction(t)
    }
    return (
        <CardHeader sx={{ mb: 0, flexWrap: 'wrap' }}
            title={<Typography component={'div'} lineHeight={1.2} sx={{ textWrap: 'wrap' }}>{authorName} {isMe && '(أنا)'}
                <TabInfo sx={{ margin: '0 6px' }} count={communityStatus.find(s => q.status === s.value)?.label}
                    i={q.status === 'published' ? 1 : q.status === 'hidden' ? 2 : 3} />

                {(q.user?.role === user_roles.ADMIN || q.user?.role === user_roles.SUBADMIN) && (
                    <Chip label={'مشرف'} size="small" color="error" variant="outlined" sx={{ marginInlineStart: "auto" }} />
                )}

            </Typography>}
            subheader={<Stack direction="row" spacing={1.5} alignItems="center">
                <Typography variant="caption" color="text.secondary"><TabInfo count={getFullDate(q.createdAt)} i={1} /></Typography>
                {q.courses?.length ? q.courses.map((course, i) => {
                    if (course.name)
                        return <Chip key={i} label={course.name} size="small" color="primary" variant="outlined" sx={{ marginInlineStart: "auto" }} />
                }) : ''}

            </Stack>
            }
            action={<>
                <IconButton
                    size="small"
                    aria-label="card options"
                    aria-controls={open ? 'card-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleOpen}
                >
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    id="card-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {/* <MenuItem onClick={() => handleAction('edit')}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </MenuItem> */}

                    <MenuItem
                        onClick={() => handleAction('share')}
                    >
                        <ListItemIcon>
                            <ShareIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Share</ListItemText>
                    </MenuItem>

                    {(isMe || isAdmin) && (
                        <BtnConfirm
                            btn={<MenuItem
                                onClick={() => handleClick('delete')}
                                sx={{ color: 'error.main' }}
                            >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    <DeleteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>ازاله السؤال</ListItemText>
                            </MenuItem>} />
                    )}
                </Menu></>}
            avatar={<UserAvatar name={authorName} />} />

    )
}

export default QuestionCardHeader