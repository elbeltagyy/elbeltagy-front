import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import BtnModal from "../ui/BtnModal";
import Image from "../ui/Image";
import bookConstants from "../../settings/constants/bookConstants";
import { Inventory2, PictureAsPdf, ShoppingCart } from "@mui/icons-material";
import { FaPoundSign } from "react-icons/fa";
import PaymentMethods from "../payment/PaymentMethods";
import { FlexColumn } from "../../style/mui/styled/Flexbox";
import TabInfo from "../ui/TabInfo";
import useGrades from "../../hooks/useGrades";
import InfoText from "../ui/InfoText";

const spineColors = ["#5B4B8A", "#0F6E56", "#9A4A1E", "#B8862E", "#3C6E71", "#7A4A5C"];

//Driven Box
function UserListBooks({ filteredBooks, setBooks, returnOrder, canBy = true, setOrders }) {

    const { grades } = useGrades()
    const handelResponse = (res) => {
        const modifiedBooks = filteredBooks.map(book => {
            if (book._id === res.invoice?.book) {
                return { ...book, status: 'pending' }
            }
            return book
        })
        if (res.bookOrder) {
            setOrders(p => ([...(p || []), res.bookOrder]))
        }
        setBooks(modifiedBooks)
    }

    return (
        <Grid container spacing={2.5} sx={{ mt: '16px' }}>
            {filteredBooks.length === 0 && (
                <FlexColumn width={'100%'} >
                    <Alert severity="warning" variant="filled" sx={{ width: '100%', maxWidth: "500px", textAlign: 'center' }}>سيتم تنزيل الكتب قريبا !</Alert>
                </FlexColumn>
            )}
            {filteredBooks.map((b, i) => {
                const isPending = b.status === 'pending'
                const bookOrder = returnOrder(b._id);
                const grade = grades?.find(g => g.index === b.grade)
                // const order = orderFor(b.id);
                // const outOfStock = b.type === "physical" && (b.stock ?? 0) <= 0;
                return (
                    <Grid item xs={12} sm={6} key={i}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent sx={{ display: "flex", gap: 2, height: "100%" }}>

                                <BtnModal disabled={!b.avatar?.url} btn={<Avatar variant="rounded" src={b.avatar?.url} sx={{ cursor: 'pointer', bgcolor: spineColors[i % spineColors.length], width: 48, height: 64 }}>
                                    {b.title[0]}
                                </Avatar>} component={<Image img={b.avatar?.url} />} />

                                <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                                    <Typography fontWeight={600} noWrap>{b.title}</Typography>
                                    <InfoText label={'الوصف'} description={<Typography variant="body2" color="text.secondary">{b.description}</Typography>} />
                                    {grade && <TabInfo count={grade.name} i={1} sx={{ mb: 1 }} />}
                                    {b.type === bookConstants.DOWNLOAD ? (
                                        <Chip size="small" icon={<PictureAsPdf sx={{ fontSize: 14 }} />} label="PDF" color="success" variant="outlined" sx={{ width: "fit-content" }} />
                                    ) : (
                                        <Chip size="small" icon={<Inventory2 sx={{ fontSize: 14 }} />} label="توصيل الكتاب" color="warning" variant="outlined" sx={{ width: "fit-content" }} />
                                    )}

                                    <Box sx={{ mt: "auto", pt: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: 'wrap', gap: '12px' }}>
                                        <Typography fontWeight={700}>{b.price} {<FaPoundSign size={'12px'} />}</Typography>

                                        {b.discount && <>
                                            <Typography fontWeight={700}>بدلا من</Typography>
                                            <Typography fontWeight={700} color={'error'} sx={{ textDecorationLine: 'line-through' }}>{<FaPoundSign size={'12px'} />}{b.discount}</Typography>
                                        </>}
                                        {bookOrder?._id ? ( //purchased
                                            <Chip size="small" label={bookOrder.status === 'pending' ? 'سيتم توصيل الكتاب قريبا' : "تم شراء الكتاب"} color={'success'} />
                                            // <Chip size="small" label={STATUS_META[order.status].label} color={STATUS_META[order.status].color} />
                                        ) : isPending ?
                                            <Alert variant="filled" severity="warning">تم طلب الكتاب, يمكنك استكمال الدفع او الانتظار حتي الموافقه</Alert>
                                            : canBy && (
                                                <BtnModal
                                                    btn={<Button
                                                        size="small" variant="contained" color="secondary"
                                                        startIcon={<ShoppingCart fontSize="small" />}
                                                    // disabled={outOfStock}
                                                    >
                                                        {b.type === bookConstants.DOWNLOAD ? "شراء الكتاب" : 'طلب الكتاب'}
                                                        {/* {outOfStock ? "Sold out" : "Buy"} */}
                                                    </Button>}
                                                    component={<PaymentMethods
                                                        inModal={false}
                                                        book={b._id} subTitle={'شراء كتاب : ' + b.title}
                                                        price={b.price} handelResponse={handelResponse}
                                                        title={'شراء كتاب'} />}
                                                />
                                            )}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    )
}

export default UserListBooks