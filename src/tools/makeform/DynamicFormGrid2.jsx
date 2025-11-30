import { Box, Grid } from "@mui/material";
import MakeInput from "./MakeInput";
import { FlexBetween, FlexColumn } from "../../style/mui/styled/Flexbox";

// Helper to group inputs by column
const groupByColumn = (inputs) => {
  const columns = {};
  const restInputs = []

  inputs.forEach(input => {
    if (!input.column) {
      restInputs.push(input)
    } else {
      if (!columns[input.column]) columns[input.column] = [];
      columns[input.column].push(input);
    }
  });

  return [columns, restInputs];
};

// Helper to sort by row within each column
const sortInputs = (inputs) => {
  return inputs.sort((a, b) => a.row - b.row);
};


export default function DynamicFormGrid({ inputs }) {
  const [columns, restInputs] = groupByColumn(inputs);

  return (
    <FlexBetween sx={{ width: '100%' }}>
      <Grid container spacing={2} width="100%">
        {Object.entries(columns).map(([col, colInputs]) => {
          const sortedInputs = sortInputs(colInputs);

          // Group by row within this column
          const rows = {};
          sortedInputs.forEach(input => {
            if (!rows[input.row]) rows[input.row] = [];
            rows[input.row].push(input);
          });

          const columnCount = Object.keys(columns).length;
          const mdSize = Math.floor(12 / columnCount) || 12;

          return (
            <Grid item xs={12} sm={6} md={mdSize} key={`column-${col}`}>
              <Grid container spacing={2}>
                {Object.entries(rows).map(([rowNum, rowInputs]) => {
                  const isSingle = rowInputs.length === 1;

                  return rowInputs.map((input, idx) => (
                    <Grid
                      item
                      key={input.name || `input-${col}-${rowNum}-${idx}`}
                      xs={12}
                      md={isSingle ? 12 : Math.floor(12 / rowInputs.length)}
                      sx={{
                        ...(input.rowSpan && {
                          gridRow: `span ${input.rowSpan}`,
                        }),
                      }}
                    >
                      {!input.hidden && (
                        <MakeInput input={input} />
                      )}
                    </Grid>
                  ));
                })}
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} width={'100%'} >
        {restInputs && restInputs.map((input, i) => {

          return (
            <Box key={input.name || i} sx={{ width: input.width || '100%', margin: !input.hidden && '14px 0' }}>
              <MakeInput input={input} />
            </Box>
          )
        })}
      </Box>
    </FlexBetween>

  );
}
