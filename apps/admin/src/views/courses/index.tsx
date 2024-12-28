"use client"
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';
import ListCourses from './list';
import Link from '@/components/Link';

export default function Courses() {
  const { push } = useRouter();
  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h3">Courses</Typography>
            <Link href="/courses/create">
              <Button variant="contained" color="primary">
                Create new course
              </Button>
            </Link>{" "}
          </Stack>
          <Divider />
        </Grid>
      </Grid>
      <ListCourses />
    </Box>
  );
}
