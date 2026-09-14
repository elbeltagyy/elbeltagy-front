import { useState, useMemo } from "react";
import {
  Box, Typography, TextField, Button, IconButton,
  InputAdornment, Stack
} from "@mui/material";
import {
  Search, Close, FilterList,

} from "@mui/icons-material";
import CreateTemplate from "../../components/templates/CreateTemplate";
import usePaginate from "../../hooks/usePaginate";
import { useLazyGetTemplatesQuery } from "../../toolkit/apis/templateApis";

import ListCategories from "../../components/templates/ListCategories";

import TemplateCard from "../../components/templates/TemplateCard";
import LoaderSkeleton from "../../style/mui/loaders/LoaderSkeleton";

export default function TempPage() {
  const [search, setSearch] = useState("");
  const [showHidden, setShowHidden] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const [getData, status] = useLazyGetTemplatesQuery()
  const { data: templates, setData: setTemplates } = usePaginate({ getData, key: 'templates', })

  const filtered = useMemo(() => {
    return templates.filter(t => {
      if (!showHidden && t.hidden) return false;
      if (activeCategory !== "all" && t.category !== activeCategory) return false;
      const q = search.toLowerCase();
      return !q || t.question.toLowerCase().includes(q) || t.answer.toLowerCase().includes(q);
    });
  }, [templates, search, activeCategory, showHidden]);

  return (
    <Box sx={{ p: 3, maxWidth: 860, mx: "auto" }}>
      {/* Header */}
      <CreateTemplate setTemplates={setTemplates} templates={templates} />

      {/* Filters */}
      <Stack direction={{ xs: "column", sm: "row" }} gap={1.5} mb={2} alignItems="center">
        <TextField
          size="small"
          placeholder="ابحث عن اجابه او سؤال"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearch("")}><Close fontSize="small" /></IconButton>
              </InputAdornment>
            )
          }}
        />
        {/* <FormControlLabel
          control={<Switch size="small" checked={showHidden} onChange={e => setShowHidden(e.target.checked)} />}
          label={<Typography variant="body2" color="text.secondary">Show hidden</Typography>}
          sx={{ m: 0, whiteSpace: "nowrap" }}
        /> */}
      </Stack>

      {/* Category chips */}
      <ListCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        showHidden={showHidden}
        templates={templates}
      />
      {status.isLoading && <LoaderSkeleton />}
      {/* Template List */}
      {filtered.length === 0 ? (
        <Box textAlign="center" py={6}>
          <FilterList sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
          <Typography color="text.secondary">تعذر ايجاد سؤال او الجواب !</Typography>
          <Button sx={{ mt: 1 }} onClick={() => { setSearch(""); setActiveCategory("all"); }}>مسح البحث</Button>
        </Box>
      ) : (
        <Stack gap={1.5}>
          {filtered.map((t, i) => (
            <TemplateCard template={t} key={t._id} setTemplates={setTemplates} i={filtered.length - i} />
          ))}
        </Stack>
      )}
    </Box>
  );
}