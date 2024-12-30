'use client';
import { useJoinedRanking, useRankingDetail, useTemplate, useUploadQuestions } from '@/@core/apis/ranking';
import useDrawl from '@/@core/hooks/useDrawlPool';
import usePublish from '@/@core/hooks/usePublishPool';
import { IPFS } from '@/constants';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import toast from 'react-hot-toast';

const DetailPool = () => {
  const { publish, isLoading: onchainLoading, isTransactionSuccess } = usePublish();
  const { drawl, isLoading: drawlLoading, isTransactionSuccess: drawlSuccess } = useDrawl()
  const { id } = useParams();
  const { push } = useRouter();
  const {
    data: { data } = { data: {} },
    isLoading,
    isError,
  } = useRankingDetail(Number(id));
  const { mutateAsync: download } = useTemplate();
  const { mutateAsync } = useUploadQuestions();
  const { data: joined } = useJoinedRanking(Number(id));
  const client = useQueryClient();

  const handleDownload = async () => {
    try {
      const data = await download();
      console.log(data);
      const url = window.URL.createObjectURL(new Blob([data as unknown as BlobPart]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `template.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileInputChange = async (file: ChangeEvent) => {
    const { files } = file.target as HTMLInputElement;

    try {
      const data = new FormData();
      data.append('file', files?.[0] as any);
      data.append('id', String(id));
      await mutateAsync({ file: files?.[0] as any, poolId: Number(id) });
      client.invalidateQueries({ queryKey: ['ranking-detail'] });
      toast.success('Questions uploaded successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };
  const publishToChain = async () => {
    if (!data) return;
    const questions = data.quizzes.map((quiz: any) => quiz.question);
    publish({
      name: data?.name ?? '',
      startDate: dayjs(data.startTime).unix(),
      endDate: dayjs(data.endTime).unix(),
      questions,
      passed: data?.questionPerPool,
    });
  };

  const handleDrawl = async () => {
    if (!data) return;
    drawl({
      pool: data?.onchainId,
      answers: data?.quizzes.map((quiz: any) => quiz.options.find((option: any) => option.isCorrect)?.answer),
    });
  }

  if (isTransactionSuccess) {
    toast.success('Pool published successfully');
  }

  if (drawlSuccess) {
    toast.success('Pool drawl successfully');
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    push('/ranking');
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
                  Start Time: {dayjs(data.startTime).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant='body1' color='textSecondary' gutterBottom>
                  End Time: {dayjs(data.endTime).format('DD/MM/YYYY')}
                </Typography>
              </Stack>
              <Stack direction='row' width='100%' justifyContent='space-between'>
                <Typography variant='body1' color='textSecondary' gutterBottom>
                  Questions Per Pool: {data.questionPerPool}
                </Typography>
                <Typography variant='body1' color='textSecondary' gutterBottom>
                  Total question: {data.quizzes.length}
                </Typography>
              </Stack>
              <Box width={'100%'}>
                {(data.quizzes.length > 0 && !data.isVerified) && (
                  <Stack>
                    <LoadingButton loading={onchainLoading} variant='outlined' onClick={publishToChain}>
                      Publish{' '}
                    </LoadingButton>
                  </Stack>
                )}
                {(data.isVerified && new Date().getTime() > new Date(data.endTime).getTime()) ? (
                  <Stack>
                    <LoadingButton variant='outlined' onClick={handleDrawl} loading={drawlLoading}>
                      Drawl
                    </LoadingButton>
                  </Stack>
                ) : data.isVerified ? (
                  <Stack>
                    <LoadingButton variant='outlined' disabled>Pool on processing...</LoadingButton>
                  </Stack>
                ) : ''}
                {!data.quizzes.length && (
                  <Stack direction='row' width='100%' justifyContent='end' gap={2}>
                    <Button variant='outlined' color='primary' onClick={handleDownload}>
                      download template
                    </Button>
                    <Button component='label' variant='contained' color='primary' htmlFor='account-settings-upload-csv'>
                      Import question
                      <input
                        hidden
                        type='file'
                        accept='text/csv'
                        onChange={handleFileInputChange}
                        id='account-settings-upload-csv'
                      />
                    </Button>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Stack direction='row' justifyContent='space-between' alignItems='center' my={8}>
        <Typography variant='h5'>User Joined</Typography>
      </Stack>
      <Box sx={{ border: 1, borderRadius: 2, padding: 4 }} >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell>Passed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {joined?.data.items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.user.wallet}</TableCell>
                <TableCell>{item.isJoined ? (<Chip label="joined" color='success' />) : (<Chip label="error" color='warning' />)}</TableCell>
                <TableCell>{item.isPassed ? (<Chip label="passed" color='success' />) : (<Chip label="failed" color='warning' />)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default DetailPool;
