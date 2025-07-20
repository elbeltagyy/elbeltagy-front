import { Box, useTheme, useMediaQuery } from '@mui/material';
import MakeInput from './MakeInput';
import { FlexColumn } from '../../style/mui/styled/Flexbox';

const DynamicFormGrid = ({ inputs, props }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const visibleInputs = inputs.filter(i => !i.hidden);
  const maxColumn = Math.max(...visibleInputs.map(i => i.column || 0));


  if (isSmallScreen || !maxColumn || maxColumn === 0) {
    return (
      <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} width={'100%'} >
        {inputs && inputs.map((input, i) => {
          return (
            <Box key={input.name || i} sx={{ width: input.width || '100%', margin: !input.hidden && '14px 0' }}>
              <MakeInput input={input} props={props} />
            </Box>
          )
        })}
      </Box>
    );
  }

  // Group inputs by column
  const columnGroups = Array.from({ length: maxColumn }, (_, i) =>
    visibleInputs
      .filter(input => input.column === i + 1)
      .sort((a, b) => (a.row || 0) - (b.row || 0))
  );

  const restInputs = inputs.filter(input => !input.column)

  return (
    <FlexColumn>

      <Box
        display="grid"
        gridTemplateColumns={`repeat(${maxColumn}, 1fr)`}
        gap={2}
        width={'100%'}
      >
        {columnGroups.map((group, colIdx) => (
          <Box key={colIdx} display="flex" flexDirection="column" gap={2}>
            {group.map((input, i) => (
              <Box
                key={input.name || i}
                sx={{
                  width: '100%',
                }}
              >
                <MakeInput input={input} props={props} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} width={'100%'} >
        {restInputs && restInputs.map((input, i) => {
          return (
            <Box key={input.name || i} sx={{ width: input.width || '100%', margin: !input.hidden && '14px 0' }}>
              <MakeInput input={input} props={props} />
            </Box>
          )
        })}
      </Box>
    </FlexColumn>

  );
};
export default DynamicFormGrid