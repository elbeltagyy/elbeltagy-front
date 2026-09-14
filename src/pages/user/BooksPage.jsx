import { Search } from "@mui/icons-material";
import { Alert, Box, Container, Grid, InputAdornment, Snackbar, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { FlexRow } from "../../style/mui/styled/Flexbox";
import MakeSelect from "../../style/mui/styled/MakeSelect";
import { useLazyGetBooksQuery } from "../../toolkit/apis/booksApi";

import TitleSection from "../../components/ui/TitleSection";
import Section from "../../style/mui/styled/Section";
import usePaginate from "../../hooks/usePaginate";
import UserListBooks from "../../components/books/UserListBooks";
import UserBooksOrders from "../../components/books/UserBooksOrders";
import { useLazyGetBooksOrdersQuery } from "../../toolkit/apis/booksOrdersApi";
import { useSelector } from "react-redux";
import bookConstants from "../../settings/constants/bookConstants";
import { handelObjsOfArr } from "../../tools/fcs/MakeArray";
import useGrades from "../../hooks/useGrades";
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton";

const STATUS_META = {
  pending: { label: "Pending review", color: "warning" },
  approved: { label: "Approved", color: "info" },
  shipped: { label: "Shipped", color: "secondary" },
  delivered: { label: "Delivered", color: "success" },
  completed: { label: "Purchased", color: "success" },
};


const typesOptions = [
  { value: 'all', label: 'الكل' },
  { value: bookConstants.PHYSICAL, label: 'توصيل الكتاب' },
  { value: bookConstants.DOWNLOAD, label: 'pdf' },
]
export default function BooksPage() {
  // const [books, setBooks] = useState([]);
  const [tab, setTab] = useState("browse");
  const [search, setSearch] = useState("");
  const [type, setType] = useState('all')

  const user = useSelector(s => s.global.user) || {}
  const [grade, setGrade] = useState(user?.grade || 'all')

  const { grades } = useGrades()

  const [getData, { isLoading }] = useLazyGetBooksQuery()
  const { data: books = [], setData: setBooks } = usePaginate({ getData, key: 'books', })

  const [getOrders] = useLazyGetBooksOrdersQuery()
  const { data: orders = [], setData: setOrders } = usePaginate({ getData: getOrders, skip: !user?._id, key: 'booksOrders', params: { populate: 'book' } },)

  const returnOrder = (bookId) => orders.find((o) => o.book?._id === bookId);

  const gradesOptions = useMemo(() => {
    const ggs = handelObjsOfArr(grades, { label: 'name', value: 'index' })
    return [{ value: 'all', label: 'الكل' }, ...ggs]
  }, [grades])

  const filteredBooks = useMemo(
    () =>
      books.filter((b) => {
        const matchesSearch = [b.title, b.description]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesType = type === 'all' ? true : type === b.type
        const matchesGrade = grade === 'all' ? true : grade === b.grade

        return matchesSearch && matchesType && matchesGrade;
      }),
    [books, search, type, grade]
  );
  return (
    <Section sx={{ bgcolor: "background.default" }}>
      <TitleSection title={'متجر الكتب'} />
      <Container maxWidth="lg">
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab value="browse" label="تصفح الكتب" />
          {user?._id && (
            <Tab value="mine" label={`كتبي  (${orders.length})`} />
          )}
        </Tabs>

        {tab === "browse" ? (
          <>
            <FlexRow gap={'12px'} justifyContent={'center'} mb={'16px'}>
              <TextField
                size="small" placeholder="ابحث عن كتاب" value={search}
                onChange={(e) => setSearch(e.target.value)} sx={{ bgcolor: "background.paper", flexGrow: 1 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
              />
              <MakeSelect title={'الصف الدراسي'}
                value={grade} setValue={setGrade}
                options={gradesOptions} />
              <MakeSelect title={'نوع الكتاب'}
                value={type} setValue={setType}
                options={typesOptions} />
            </FlexRow>
            {isLoading && <LoaderSkeleton />}
            <UserListBooks setOrders={setOrders} filteredBooks={filteredBooks} setBooks={setBooks} returnOrder={returnOrder} canBy={!!user?._id} />
          </>
        ) : user._id && (
          <UserBooksOrders orders={orders} />
        )}
      </Container>
    </Section>
  );
}