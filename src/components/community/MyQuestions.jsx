import { Button, Paper, Stack, Typography } from "@mui/material"
import CollapseStyled from "../../style/mui/styled/CollapseStyled"
import { useGetCommunityQuestionsCountQuery } from "../../toolkit/apis/communtyQuestionsApi"
import { useSelector } from "react-redux"
import { FaLocationArrow } from "react-icons/fa"
import TabInfo from "../ui/TabInfo"

function MyQuestions({ isAdmin = false, preCourse, filters = {} }) {
    const user = useSelector(s => s.global.user)
    const { data = {} } = useGetCommunityQuestionsCountQuery({ user: user._id, isActive: true, courses: preCourse, ...filters })
    const askedQuestions = data?.values?.count

    const { data: notAnswered = {} } = useGetCommunityQuestionsCountQuery({ status: 'pending', user: user._id, courses: preCourse, ...filters })
    const notAnsweredQUestions = notAnswered?.values?.count // firstAuthorReplay.length === 0
    //firstAuthorReplay: 'size_split_0',
    const { data: global = {} } =
        useGetCommunityQuestionsCountQuery(
            { isActive: true }, { skip: !isAdmin })
    const globalAskedQuestions = global?.values?.count

    const { data: globalNotAnswered = {}, refetch } =
        useGetCommunityQuestionsCountQuery(
            { status: 'pending', isActive: true }, { skip: !isAdmin })
    const globalNotAnsweredQuestions = globalNotAnswered?.values?.count

    return (
        <CollapseStyled label={'أسئلتي'}>
            <Stack spacing={1.5} component="aside" aria-label="أسئلتي">

                {isAdmin && (<Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700} mb={0.5}>نشاط المنصه</Typography>
                    <Typography variant="body2" color="text.secondary">
                        عدد الاسئله علي المنصه . {globalAskedQuestions} <br />
                        تم الاجابه علي . {globalAskedQuestions - globalNotAnsweredQuestions} <br />
                        في انتظار الاجابه . <TabInfo count={globalNotAnsweredQuestions} i={3} /> <br />
                    </Typography>
                    <Button endIcon={<FaLocationArrow />} size="small" onClick={refetch}>تحديث</Button>
                </Paper>)}

                <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight={700} mb={0.5}>نشاطك</Typography>
                    <Typography variant="body2" color="text.secondary">
                        طرحت {askedQuestions} أسئلة، وتلقيت {askedQuestions - notAnsweredQUestions} إجابات  ,
                        <br />
                        {notAnsweredQUestions} سؤال في انتظار الاجابه
                    </Typography>
                </Paper>
            </Stack>
        </CollapseStyled>
    )
}

{/* <Paper variant="outlined" sx={{ p: 2 }}>
    <Typography variant="subtitle1" fontWeight={700} mb={1}>أسئلتي</Typography>
    {count === 0 && (
        <Typography variant="body2" color="text.secondary">لم تطرح أي سؤال بعد. انشر سؤالك الأول.</Typography>
    )}
    : (
                         mine.map((q, i) => (
    <Box key={q.id} sx={{ py: 1.25, borderTop: i ? 1 : 0, borderColor: "divider" }}>
        <Typography variant="body2" fontWeight={500}>{q.title}</Typography>
        <Stack direction="row" spacing={1} alignItems="center" mt={0.5}>
            <Chip size="small" label={q.comments.length ? "تمت الإجابة" : "بانتظار الإجابة"}
                color={q.comments.length ? "success" : "primary"} variant="outlined" />
            <Typography variant="caption" color="text.secondary">{q.course}، {q.likes} إعجاب</Typography>
        </Stack>
    </Box>
    ))
    )
</Paper> */}
export default MyQuestions