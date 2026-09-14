import { Download, MenuBook } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import bookConstants from "../../settings/constants/bookConstants";
import BtnModal from "../ui/BtnModal";
import Image from "../ui/Image";
import TabInfo from "../ui/TabInfo";
import { getFullDate } from "../../settings/constants/dateConstants";

function downloadPlaceholder(book) {
    const link = book.file?.url || book.url
    window.open(link, '_blank')
}

function UserBooksOrders({ orders = [] }) {

    return (
        <Stack spacing={1.5}>
            {orders.length === 0 && (
                <Card sx={{ textAlign: "center", py: 5, bgcolor: "grey.50" }}>
                    <MenuBook sx={{ color: "text.secondary", mb: 1 }} />
                    <Typography color="text.secondary" variant="body2">لم تقم بشراء كتب حتي الأن !</Typography>
                </Card>
            )}
            {orders.map((o) => {
                const book = o.book;
                if (!book) return <></>
                return (
                    <Card key={o._id}>
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, "&:last-child": { pb: 2 } }}>
                            <BtnModal disabled={!book.avatar?.url} btn={<Avatar variant="rounded" src={book.avatar?.url} sx={{ cursor: 'pointer', bgcolor: 'primary.main', width: 48, height: 64 }}>
                                {book.title[0]}
                            </Avatar>} component={<Image img={book.avatar?.url} />} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography fontWeight={600}>{book.title}</Typography>
                                <Typography variant="body2" color="text.secondary">تم شراءه في <TabInfo count={getFullDate(o.createdAt)} i={1} /></Typography>
                            </Box>
                            {(book.type === bookConstants.DOWNLOAD && book) ? (
                                <Button size="small" variant="outlined" color="success" startIcon={<Download fontSize="small" />} onClick={() => downloadPlaceholder(book)}>
                                    تحميل الكتاب
                                </Button>
                            ) : o.status === 'pending' ? (
                                <Chip size="small" label={"سيتم توصيل الكتاب قريبا"} color={'warning'} />
                            ) : <>
                                <Chip size="small" label={"تم توصيل الكتاب"} color={'success'} />
                            </>}
                        </CardContent>
                    </Card>
                );
            })}
        </Stack>
    )
}

export default UserBooksOrders