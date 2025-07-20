import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';
import { locales } from 'utils/constants';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper component="section" id="500Page" sx={{ p: 6 }}>
          <Grid container justifyContent="center">
            <Stack spacing={6}>
              <Box display="flex">
                <img
                  alt="500"
                  src="/500.svg"
                  style={{
                    height: 'auto',
                    maxWidth: '100%',
                    width: 200,
                    margin: 'auto',
                  }}
                />
              </Box>
              <Typography variant="h4" align="center">
                {locales.somethingWentWrong}
              </Typography>
              <Box display="flex">
                <Button
                  style={{ margin: 'auto' }}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    this.setState({ hasError: false });
                    window.location.reload();
                  }}
                >
                  {locales.retry}
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Paper>
      );
    }

    return this.props.children;
  }
}
