import { Box, CircularProgress, Stack, Typography } from '@mui/material';

type PropsType = {
  height?: number;
  text?: string;
};

function Loading(props: PropsType) {
  return (
    <Box
      id="Loading"
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      height={props.height}
    >
      <Stack style={{ margin: 'auto' }} spacing={1}>
        <CircularProgress style={{ margin: 'auto' }} />
        {props.text && <Typography textAlign="center">{props.text}</Typography>}
      </Stack>
    </Box>
  );
}

export default Loading;
