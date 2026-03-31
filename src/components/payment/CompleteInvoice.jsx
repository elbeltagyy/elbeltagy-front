import { Alert, Typography } from "@mui/material";
import Section from "../../style/mui/styled/Section";
import { FlexColumn } from "../../style/mui/styled/Flexbox";
import GenerateQrCode from "../qrcodes/GenerateQrCode";
import TabInfo from "../ui/TabInfo";
import InfoText from "../ui/InfoText";
import statusConstants from "../../settings/constants/status";

function CompleteInvoice({ invoice = {} }) {
    const isPaid = invoice?.status === statusConstants.PAID;

    const expireDate = invoice?.expireDate ? new Date(invoice.expireDate) : null;
    const isExpired = expireDate ? new Date() > expireDate : false;

    return (
        <Section>
            <Typography variant="h6">
                يرجى استخدام البيانات التالية لإتمام عملية الدفع:
            </Typography>
            <InfoText label={'سعر الفاتوره'} description={<TabInfo i={0} count={invoice.price + ' جنيه'} />} />
            <InfoText label={'حاله الفاتوره'} description={<TabInfo i={isPaid ? 1 : invoice.status === statusConstants.PENDING ? 2 : 3} count={invoice.status} />} />
            {invoice.payment?.description && <InfoText label={'طريقه الدفع'} description={<span dangerouslySetInnerHTML={{ __html: invoice.payment.description }} />} />}
            {!isExpired && !isPaid && expireDate && <InfoText label={"تنتهي صلاحية الفاتورة في"} description={<TabInfo i={3} count={expireDate.toLocaleString("ar-EG")} />} />}
            <br />

            {!invoice || Object.keys(invoice).length === 0 ? null : (
                <FlexColumn sx={{ height: '100%' }} gap={2}>
                    {isPaid && (
                        <Alert variant="standard" severity="success">
                            <Typography variant="h6">
                                تم دفع الفاتورة بنجاح
                            </Typography>
                        </Alert>
                    )}

                    {!isPaid && isExpired && (
                        <Alert variant="standard" severity="error">
                            <Typography variant="h6">
                                انتهت صلاحية الفاتورة : {' '}
                                <TabInfo i={3} count={expireDate.toLocaleString("ar-EG")} />
                            </Typography>
                        </Alert>
                    )}

                    {!isPaid && !isExpired && invoice?.redirectUrl && (
                        <Alert variant="standard" severity="info">
                            {invoice.instructions}{" "}
                            <Typography
                                component="a"
                                href={invoice.redirectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ wordBreak: "break-all", color: 'primary.main' }}
                            >
                                اضغط هنا للدفع
                            </Typography>
                        </Alert>
                    )}

                    {!isPaid && !isExpired && invoice?.paymentType === 'manual' && (
                        <Alert variant="standard" severity="info">
                            {invoice.instructions}{" "}
                            <Typography variant="h6">
                                يرجي الانتظار لحين التاكد من الطلب و سيتم تفعيله: {' '}
                                <TabInfo i={1} count={"فى خلال 24 ساعة"} />
                            </Typography>
                        </Alert>
                    )}

                    {!isPaid && !isExpired && invoice?.fawryCode && (
                        <Alert variant="standard" severity="info">
                            {invoice.instructions}{" "}
                            <strong>{invoice.fawryCode}</strong>
                        </Alert>
                    )}

                    {!isPaid && !isExpired && invoice?.meezaQrCode && (
                        <FlexColumn gap={2}>
                            <Typography>
                                {invoice.instructions}
                            </Typography>
                            <GenerateQrCode url={invoice.meezaQrCode} />
                        </FlexColumn>
                    )}
                </FlexColumn>
            )}
        </Section>
    );
}

export default CompleteInvoice;