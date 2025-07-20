import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { FaList } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function AdminCourseStatisticsMenu({ course }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<FaList />}
            >
                احصائيات المحاضرات
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={Link} to={'/management/reports?course=' + course?._id}>تقارير الكورس</MenuItem>

                <MenuItem component={Link} to={'/statistics/views?course=' + course?._id}>مشاهدات الكورس</MenuItem>
                <MenuItem component={Link} to={'/management/attempts?courseId=' + course?._id}> احصائيات الاختبارات</MenuItem>

                {/* <MenuItem onClick={handleClose}>اختبارات الكورس</MenuItem> */}
            </Menu>
        </div>
    )
}

export default AdminCourseStatisticsMenu
