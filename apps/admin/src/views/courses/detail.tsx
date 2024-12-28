'use client';
import { useCourse } from '@/@core/apis/courses/queries';
import { IPFS } from '@/constants';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const DetailPool = () => {
  const { id } = useParams();
  const { push } = useRouter();
  const {
    data: { data } = { data: {} },
    isLoading,
    isError,
  } = useCourse(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    push('/courses');
  }
  return (
    <Box sx={{ padding: 4, borderRadius: 5, boxShadow: 0.5, paddingY: 8 }}>
      <Grid container gap={4} justifyContent={'space-between'}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              height: 450,
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '5px',
              background:
                'radial-gradient(99.38% 318% at 100% 0%, rgba(112, 108, 79, 0.3) 0%, rgba(41, 41, 49, 0.8) 100%), #4A4D53',
            }}
          >
            <img
              alt='nft'
              src={IPFS(data?.logo)}
              width='100%'
              height='100%'
              style={{ borderRadius: 5, objectFit: 'contain' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2} direction={'column'} justifyContent='space-between' height='100%'>
            <Stack direction='column' gap={2}>
              <Typography variant='h4' component='h1' gutterBottom>
                {data.name}
              </Typography>
              <Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {data?.tags?.map((tag: any, index: number) => (
                    <Chip color='info' key={index} label={tag} />
                  ))}
                </Box>
              </Box>
              <Typography variant='body1' gutterBottom>
                {data.description}
              </Typography>
            </Stack>
            <Stack direction='column' gap={4}>
              <Stack direction='row' width='100%' justifyContent='space-between'>
                <Typography variant='body1' color='textSecondary' gutterBottom>
                  Created At: {dayjs(data.createdAt).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant='body1' color='textSecondary' gutterBottom>
                  Last update At: {dayjs(data.updatedAt).format('DD/MM/YYYY')}
                </Typography>
              </Stack>
              <Stack direction='row' width='100%' justifyContent='space-between'>
                <Typography variant='body1' color='textSecondary' gutterBottom>
                  Category: {data.category.name}
                </Typography>
                <Typography variant='body1' color='textSecondary' gutterBottom>
                  Total lesson: {data.lessons.length}
                </Typography>
              </Stack>
              <Box width={'100%'}>
                <Stack>
                  <Link href={`/courses/${data.id}/lesson`} >
                    <LoadingButton loading={false} variant='contained' fullWidth >
                      Add Lesson
                    </LoadingButton>
                  </Link>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailPool;
