import { useEffect, useRef, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Stack,
    useTheme,
    alpha,
} from "@mui/material";
import InfoText from "../ui/InfoText";
import { FlexBetween, FlexColumn, } from "../../style/mui/styled/Flexbox";
import TabInfo from "../ui/TabInfo";
import { Link } from "react-router-dom";
import { FaArrowLeft, } from "react-icons/fa";
import { getFullDate } from "../../settings/constants/dateConstants";
import { MdDateRange } from "react-icons/md";
import { RiFolderUnknowFill } from "react-icons/ri";
import { IoIosRadio } from "react-icons/io";
import { yellow } from "@mui/material/colors";
import useGrades from "../../hooks/useGrades";
// import StarIcon from "@mui/icons-material/Star";

/**
 * Maps an accent key ("primary" | "secondary" | "tertiary") to the actual
 * theme palette entry. Falls back to primary if "tertiary" isn't defined
 * on your theme yet, so this never crashes if the palette key is missing.
 */
function useAccent(theme, key = "primary") {
    const pal =
        theme.palette[key] ||
        theme.palette.tertiary || // custom palette key, if you've added one
        theme.palette.primary;

    return {
        main: pal.main,
        light: pal.light,
        dark: pal.dark,
        tagBg: alpha(pal.main, 0.12),
        tagFg: pal.dark,
    };
}

/**
 * Fallback illustration used when the course has no thumbnail. Generated
 * at whatever imgW/imgH you pass, so the card's crop behavior can be seen
 * working on genuinely different source dimensions.
 */
function placeholderImage(c1, c2, w = 900, h = 560) {
    const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <circle cx="${w * 0.78}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.32}" fill="rgba(255,255,255,0.14)"/>
    <circle cx="${w * 0.18}" cy="${h * 0.85}" r="${Math.min(w, h) * 0.22}" fill="rgba(255,255,255,0.10)"/>
    <path d="M0 ${h * 0.7} Q ${w * 0.5} ${h * 0.5} ${w} ${h * 0.75} L ${w} ${h} L 0 ${h} Z" fill="rgba(0,0,0,0.10)"/>
  </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/**
 * A single course card.
 *
 * Image handling: the image sits in a fixed aspect-ratio box with
 * object-fit: cover, so any source image — whatever its native
 * width/height — gets cropped and filled consistently.
 *
 * Reveal more: the description clamps to `clampLines` lines. Because
 * the card is `height: 100%` inside a CSS grid cell, and the grid's
 * default row sizing stretches every item in a row to match the
 * tallest one, expanding one card's description grows its whole row —
 * and every sibling card in that row grows to match automatically.
 * No shared state between cards needed; it's plain CSS Grid behavior.
 * The buttons are pinned to the bottom (`mt: "auto"`) so the extra
 * height never pushes them off in the un-expanded cards.
 */
export default function CourseCard({
    course = {},
    accent = "primary", // "primary" | "secondary" | "tertiary"
    imgW = 900,
    imgH = 560,
    clampLines = 1,

    subscribedAt = null, //'10/10/2020'
    lastLectureAt = null
}) {
    const theme = useTheme();
    const a = useAccent(theme, accent);
    const [expanded, setExpanded] = useState(false);
    const [overflowing, setOverflowing] = useState(false);
    const descRef = useRef(null);

    useEffect(() => {
        const el = descRef.current;
        if (!el) return;
        setOverflowing(el.scrollHeight > el.clientHeight + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course.description]);

    const discount = course.preDiscount ? (((course.preDiscount - course.price) / course.preDiscount) * 100).toFixed(2) + "%" : null
    const { grades } = useGrades()

    return (
        <Card
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%", // fills the grid row's stretched height
                borderRadius: "22px",
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.dark, 0.5),
                bgcolor: alpha(theme.palette.primary.dark, 0.1),
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                overflow: "hidden",
                width: "100%",
                flexGrow: 1, maxWidth: '380px',
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 1px 2px rgba(34,20,52,0.05), 0 24px 40px -16px ${alpha(theme.palette.primary.light, 0.4)}`,
                },
            }}
        >
            {/* ---------- Image (fixed shape, always the same regardless of source size) ---------- */}
            <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
                <Box
                    component="img"
                    src={course?.thumbnail?.url || placeholderImage(a.light, a.dark, imgW, imgH)}
                    alt={course.title}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = placeholderImage(a.light, a.dark, imgW, imgH);
                    }}
                    sx={{
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center", display: "block", overflow: 'hidden', borderRadius: '16px',
                    }}
                />
                {discount && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 14,
                            left: -1,
                            px: "16px",
                            py: "7px",
                            pl: "14px",
                            fontSize: 13,
                            fontWeight: 800,
                            color: "#fff",
                            background: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.dark})`,
                            clipPath: "polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)",
                        }}
                    >
                        خصم {discount}
                    </Box>
                )}
                <Box sx={{ position: 'absolute', top: 14, right: 14 }}>
                    <TabInfo fontSize={'.6rem'} count={grades.find(g => g.index === course.grade)?.name} i={0} />
                </Box>

            </Box>

            {/* ---------- Body ---------- */}
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.1,
                    p: "20px 22px 22px",
                    "&:last-child": { pb: "22px" },
                    flexGrow: 1, // takes up the extra stretched height
                    height: "100%",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.1, flexGrow: 1 }}>
                    {/* Name */}
                    <Typography
                        component={Link}
                        to={"/courses/" + course.index}
                        variant="subtitle1"
                        sx={{
                            color: 'neutral.0',
                            lineHeight: 1.3,
                            cursor: "pointer",
                            transition: "color 0.15s ease",
                            textDecoration: 'none',
                            "&:hover": { color: `${accent}.light`, textDecoration: "underline" },
                        }}
                    >
                        {course.name}
                    </Typography>
                    {course.rating && (
                        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ color: "text.secondary", fontSize: 13 }}>
                            <Stack direction="row" alignItems="center" spacing={0.25} sx={{ color: "warning.main", fontWeight: 700 }}>
                                {/* <StarIcon sx={{ fontSize: 15 }} /> */}
                                <Typography component="span" sx={{ fontSize: 13, fontWeight: 700, color: "inherit" }}>
                                    {course.rating}
                                </Typography>
                            </Stack>
                            {course.ratingCount && (
                                <Typography component="span" sx={{ fontSize: 13 }}>
                                    ({course.ratingCount} ratings)
                                </Typography>
                            )}
                        </Stack>
                    )}

                    {/* This block takes up whatever vertical space is left in the card
                        (flexGrow: 1), so short descriptions still fill the row's stretched
                        height instead of leaving a gap between text and price. */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            ref={descRef}
                            variant="body2"
                            onClick={() => setExpanded((v) => !v)}
                            sx={{
                                color: "text.secondary",
                                display: expanded ? "block" : "-webkit-box",
                                WebkitLineClamp: expanded ? "unset" : clampLines,
                                WebkitBoxOrient: "vertical",
                                overflow: expanded ? "visible" : "hidden",
                            }}
                        >
                            <span dangerouslySetInnerHTML={{ __html: course?.description }} />
                        </Typography>

                        {overflowing && (
                            <Button
                                onClick={() => setExpanded((v) => !v)}
                                disableRipple
                                sx={{
                                    alignSelf: "flex-start",
                                    p: 0,
                                    minWidth: 0,
                                    fontWeight: 700,
                                    fontSize: 13.5,
                                    color: `primary.main`,
                                    textTransform: "none",
                                    textDecoration: "underline",
                                    "&:hover": { background: "none", textDecoration: "underline", color: `primary.dark` },
                                }}
                            >
                                {expanded ? "عرض الأقل" : "عرض باقي تفاصيل الكورس"}
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Everything below is pinned to the bottom of the card via mt: "auto" on
                    the last flex child, so when a sibling card's row stretches taller,
                    this card's price/buttons stay glued to the bottom instead of floating
                    in the middle of the new empty space. */}
                <Box sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: .8 }}>
                    {subscribedAt ?
                        <FlexColumn sx={{
                            alignItems: 'flex-start',
                            bgcolor: yellow[200] + 40, p: '12px 16px',
                            borderRadius: '16px',
                            border: '1.2px dotted',
                            borderColor: yellow[800] + 80
                        }}>
                            <TabInfo count={getFullDate(subscribedAt)} i={'1'} title={'تم الاشتراك في'} icon={<MdDateRange size='.8rem' />} isBold={false} />
                            <TabInfo count={getFullDate(lastLectureAt)} i={'2'} title={'تاريخ اخر محاضره تم انهاءها'} icon={<MdDateRange size='.8rem' />} isBold={false} />

                        </FlexColumn>
                        : (course.isSalable ?? true) && <FlexBetween>
                            <FlexColumn sx={{
                                // bgcolor: theme.palette.tertiary.main + 20, p: '12px 16px',
                                // borderRadius: '16px', border: '1px dotted',
                                // borderColor: 'tertiary.main',
                                alignItems: 'flex-start', flexGrow: 1
                            }}>

                                {(course.price === 0) &&
                                    <Chip label="كورس مجانى !" size='small' variant="contained" sx={{ background: 'linear-gradient(to right,#f43f5e, #a855f7)', color: 'white' }} icon={<IoIosRadio size="1.3rem" color="#fff" />} />
                                }

                                <InfoText label={'سعر الكورس'} description={<Typography variant="h6" sx={{ fontWeight: 800 }}>{course.price} جنيه</Typography>} />
                                {(course.preDiscount !== 0 && course.preDiscount > course.price) && (
                                    <InfoText label={'بدلا من'} description={<Typography variant="subtitle1" sx={{ color: "error.dark", textDecoration: "line-through" }}>{course.preDiscount} جنيه</Typography>} />
                                )}
                            </FlexColumn>
                            {discount && (
                                <TabInfo count={'خصم ' + discount} i={3} />
                            )}
                        </FlexBetween>
                    }
                    {/* Buttons */}
                    <Stack direction="row" spacing={1.25}>
                        <Button
                            fullWidth
                            disableElevation
                            endIcon={< FaArrowLeft />}
                            component={Link} to={"/courses/" + course.index}
                            sx={{
                                borderRadius: "12px",
                                fontWeight: 800,
                                fontSize: 14,
                                textTransform: "none",
                                py: 1.1,
                                color: "#fff",
                                bgcolor: 'primary.light',
                                border: '2px solid', borderColor: 'primary.main',
                                // background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
                                // boxShadow: `0 8px 18px -8px ${alpha(theme.palette.primary.main, 0.55)}`,
                                "&:hover": {
                                    color: 'primary.main',
                                    borderColor: 'primary.light'
                                },
                            }}
                        >
                            الدخول للكورس
                        </Button>
                    </Stack>

                    {/* Dates */}
                    <FlexBetween gap={'6px'}>
                        <TabInfo fontSize={'.7rem'} count={getFullDate(course.dateStart || course.createdAt)} i={'1'} title={'تاريخ بدايه الكورس'} icon={<MdDateRange size='.8rem' />} isBold={false} />
                        {course.dateEnd && (
                            <TabInfo fontSize={'.7rem'} count={getFullDate(course.dateEnd)} i={3} title={"موعد نهايه الكورس"} icon={<RiFolderUnknowFill size='.8rem' />} isBold={false} />
                        )}
                    </FlexBetween>

                </Box>
            </CardContent>
        </Card>
    );
}

/* ---------------------------------------------------------------
   Demo grid. Cycles accent through "primary" / "secondary" / "tertiary"
   so you can see all three theme colors in rotation. Descriptions are
   intentionally different lengths — expand a short card in the middle
   of a row and watch its neighbors in that row stretch to match.
--------------------------------------------------------------- */