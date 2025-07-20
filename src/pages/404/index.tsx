import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { useTitle } from 'hooks/common';
import { Link } from 'react-router-dom';
import { PATH } from 'routes/constants';
import { locales } from 'utils/constants';

function NotFoundPage() {
  useTitle('404');

  return (
    <Paper component="section" id="404Page" sx={{ p: 6 }}>
      <Grid container justifyContent="center">
        <Stack spacing={6}>
          <Box display="flex">
            <img
              alt="404"
              src="/404.svg"
              style={{
                height: 'auto',
                maxWidth: '100%',
                width: 200,
                margin: 'auto',
              }}
            />
          </Box>
          <Typography variant="h4" align="center">
            {locales.pageNotFound}
          </Typography>
          <Box display="flex">
            <Link to={PATH.HOME} style={{ margin: 'auto' }}>
              <Button color="primary" variant="contained">
                {locales.home}
              </Button>
            </Link>
          </Box>
        </Stack>
      </Grid>
    </Paper>
  );
}

export default NotFoundPage;
