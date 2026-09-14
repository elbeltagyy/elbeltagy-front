import { Chip, Stack } from '@mui/material';
import { CATEGORIES, CATEGORY_META } from './categories';

function ListCategories({ templates, showHidden, setActiveCategory, activeCategory }) {
    return (
        <Stack direction="row" gap={1} mb={3} flexWrap="wrap">
            {CATEGORIES.map(({ value, label }) => {
                const count = value === "all"
                    ? templates.filter(t => showHidden || !t.hidden).length
                    : templates.filter(t => t.category === value && (showHidden || !t.hidden)).length;
                return (
                    <Chip
                        icon={CATEGORY_META[value]?.icon}
                        key={value}
                        label={`${label} (${count})`}
                        size="small"
                        onClick={() => setActiveCategory(value)}
                        variant={activeCategory === value ? "filled" : "outlined"}
                        color={activeCategory === value ? (CATEGORY_META[value]?.color || "primary") : "default"}
                    />
                );
            })}
        </Stack>
    )
}

export default ListCategories