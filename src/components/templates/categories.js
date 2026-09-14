import { Assignment, Book, Help, Quiz, School, Task } from "@mui/icons-material";

export const CATEGORIES = [
    { value: 'all', label: 'الكل' },
    { value: 'online', label: 'اونلاين منصه' },
    { value: 'center', label: 'سنتر' },
    { value: 'technical_support', label: 'دعم فني' },
    { value: 'psychological_support', label: 'دعم نفسي' },
    { value: 'academic_support', label: 'دعم علمي' },
    { value: 'books', label: 'مذكرات' },
];

export const CATEGORY_META = {
    online: { color: "primary", icon: <School fontSize="small" /> },
    center: { color: "info", icon: <Assignment fontSize="small" /> },
    psychological_support: { color: "warning", icon: <Quiz fontSize="small" /> },
    books: { color: "error", icon: <Book fontSize="small" /> },
    academic_support: { color: "secondary", icon: <Task fontSize="small" /> },
    technical_support: { color: "success", icon: <Help fontSize="small" /> },
};