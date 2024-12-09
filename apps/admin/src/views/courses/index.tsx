"use client"
import { Box, Button, Grid } from '@mui/material';

import { useRouter } from 'next/navigation';
import ListCourses from './list';

export default function Courses() {
  const { push } = useRouter();
  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item />
        <Grid item>
          <Button variant="contained" onClick={() => push('courses/create')}>
            Add New
          </Button>
        </Grid>
      </Grid>
      <ListCourses />
    </Box>
  );
}
