import { Box, Rating, Typography } from "@mui/material";

function RatingStyled({ value, setValue, title, readOnly = false }) {
    return (
        <Box>
            {title && (
                <Typography variant="subtitle1" component="legend">{title}</Typography>
            )}
            <Rating
                readOnly={readOnly}
                name="simple-controlled"
                value={Number(value)}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    )
}

export default RatingStyled
