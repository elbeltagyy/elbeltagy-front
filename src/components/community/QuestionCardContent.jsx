import { Box, CardContent, Typography } from '@mui/material';
import ShowMultiMedia from '../ui/ShowMultiMedia';

function QuestionCardContent({ q }) {
    const attachments = q.attachments
    return (
        <CardContent sx={{ pb: 1, pt: 0 }}>
            {q.content && (() => {
                const [firstLine, ...rest] = q.content.split(/\r?\n/);
                return (
                    <Box sx={{ maxWidth: '70ch' }}>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ whiteSpace: 'pre-wrap' }}
                        >
                            {firstLine}
                        </Typography>

                        {rest.length > 0 && (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ whiteSpace: 'pre-wrap' }}
                            >
                                {rest.join('\n')}
                            </Typography>
                        )}
                    </Box>
                );
            })()}
            <ShowMultiMedia attachments={attachments} />
        </CardContent>
    )
}

export default QuestionCardContent