import { useState } from "react";
import {
  Typography, Box, Grid, Card,
  CardContent,

} from "@mui/material";
import {
  MenuBook, PictureAsPdf, Inventory2,
  ReportProblem,
} from "@mui/icons-material";
import TitleWithDividers from "../../components/ui/TitleWithDividers";
import Section from "../../style/mui/styled/Section";
import TabsAutoStyled from "../../style/mui/styled/TabsAutoStyled";

import AdminListBooks from "../../components/books/AdminListBooks";
import AdminBooksOrders from "../../components/books/AdminBooksOrders";
import { useGetBooksCountQuery } from "../../toolkit/apis/booksApi";
import { useGetBooksOrdersCountQuery } from "../../toolkit/apis/booksOrdersApi";
import bookConstants from "../../settings/constants/bookConstants";

const SEED_BOOKS = [
  { id: "b1", title: "Calculus Made Clear", author: "R. Ahmed", price: 12, type: "pdf", pdfUrl: "https://example.com/calculus.pdf", stock: null, coverColor: "#5B4B8A" },
  { id: "b2", title: "Organic Chemistry Essentials", author: "L. Nasser", price: 18, type: "physical", pdfUrl: "", stock: 6, coverColor: "#0F6E56" },
  { id: "b3", title: "World History Atlas", author: "S. Farouk", price: 9, type: "pdf", pdfUrl: "https://example.com/history.pdf", stock: null, coverColor: "#9A4A1E" },
  { id: "b4", title: "Intro to Data Structures", author: "M. Kamal", price: 15, type: "physical", pdfUrl: "", stock: 3, coverColor: "#B8862E" },
];

function downloadPlaceholder(book) {
  const content = `Placeholder file for "${book.title}" by ${book.author}.\nReal file: ${book.pdfUrl || "(not set)"}`;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${book.title.replace(/\s+/g, "_")}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

const filters = { status: 'pending' }

export default function BooksManage() {

  const [reset, setReset] = useState(false)

  const { data: booksCountValue } = useGetBooksCountQuery()
  const { data: pdfCountValue } = useGetBooksCountQuery({ type: bookConstants.DOWNLOAD })
  const { data: pendingOrdersCountValue } = useGetBooksOrdersCountQuery({ status: 'pending' })
  const { data: ordersCountValue } = useGetBooksOrdersCountQuery()


  const booksCount = booksCountValue?.values?.count ?? 'loading ....'
  const pdfCount = pdfCountValue?.values?.count ?? 'loading ....'
  const pendingOrdersCount = pendingOrdersCountValue?.values?.count ?? 'loading ....'
  const ordersCount = ordersCountValue?.values?.count ?? 'loading ....'

  return (
    <Section sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <TitleWithDividers title={'الكتب والمذكرات'} />

      {/* Statistics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: "Total books", value: booksCount, icon: <MenuBook /> },
          { label: "عدد PDF ملفات", value: pdfCount, icon: <PictureAsPdf /> },
          { label: "عدد الكتب التي لم يتم توصيلها", value: pendingOrdersCount, icon: <Inventory2 /> },
          { label: "عدد الكتب التي تم بيعها", value: ordersCount, icon: <ReportProblem /> },
        ].map((s) => (
          <Grid item xs={6} sm={3} key={s.label}>
            <Card>
              <CardContent>
                <Box sx={{ color: "secondary.main", mb: 1 }}>{s.icon}</Box>
                <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                <Typography variant="caption" color="text.secondary">{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <TabsAutoStyled
        originalTabs={[
          { label: 'الكتب', component: <AdminListBooks reset={reset} />, count: booksCount },
          { label: 'الطلبات', component: <AdminBooksOrders key="orders" filters={filters} />, count: pendingOrdersCount },
          { label: 'تم شراءه', component: <AdminBooksOrders key="purchased" />, count: ordersCount },
        ]}
      />
    </Section>
  );
}