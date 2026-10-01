import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Button } from '@mui/material'

function LikeBtn({ comment, handleAction }) {

    return (
        <Button
            size="small"
            onClick={() =>
                handleAction(comment.isLiked ? "disLike" : "like")
            }
            startIcon={
                comment.isLiked ? (
                    <Favorite sx={{ animation: "likePop .35s ease" }} />
                ) : (
                    <FavoriteBorder />
                )
            }
            sx={{
                minWidth: 64,
                px: 1.5,
                borderRadius: 5,
                color: comment.isLiked ? "#ef476f" : "text.secondary",
                bgcolor: comment.isLiked
                    ? "rgba(239, 71, 111, 0.09)"
                    : "transparent",
                transition: "all .25s ease",
                "&:hover": {
                    bgcolor: comment.isLiked
                        ? "rgba(239, 71, 111, 0.16)"
                        : "action.hover",
                    transform: "translateY(-1px)",
                },
                "&:active": {
                    transform: "scale(.93)",
                },
                "@keyframes likePop": {
                    "0%": { transform: "scale(.5)" },
                    "60%": { transform: "scale(1.3)" },
                    "100%": { transform: "scale(1)" },
                },
                "& .MuiButton-startIcon": {
                    mr: 0.6,
                },
            }}
        >
            {comment.likes ?? 0}
        </Button>
    )
}

export default LikeBtn