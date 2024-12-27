'use client';
import { useRankingDetail, useTemplate, useUploadQuestions } from '@/@core/apis/ranking';
import usePublish from '@/@core/hooks/usePublishPool';
import { IPFS } from '@/constants';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

const DetailPool = () => {
  const { publish, isLoading: onchainLoading, isTransactionSuccess } = usePublish();
  const { id } = useParams();
  const { push } = useRouter();
  const {
    data: { data } = { data: {} },
    isLoading,
    isError,
  } = useRankingDetail(Number(id));
  const { mutateAsync: download } = useTemplate();
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync } = useUploadQuestions();
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
    setFile(files?.[0] as any);
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
      startDate: new Date(data.startTime).getTime(),
      endDate: new Date(data.endTime).getTime(),
      questions,
      passed: data?.questionPerPool,
    });
  };

  if (isTransactionSuccess) {
    toast.success('Pool published successfully');
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
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  Start Time: {data.startTime}
                </Typography>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  End Time: {data.endTime}
                </Typography>
              </Stack>
              <Stack direction='row' width='100%' justifyContent='space-between'>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  Questions Per Pool: {data.questionPerPool}
                </Typography>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  total question: {data.quizzes.length ? data.quizzes.length : 'No'}
                </Typography>
              </Stack>
              <Box width={'100%'}>
                {data.quizzes.length && !data.isVerified && (
                  <Stack>
                    <LoadingButton loading={onchainLoading} variant='outlined' onClick={publishToChain}>
                      Publish{' '}
                    </LoadingButton>
                  </Stack>
                )}
                {data.isVerified && new Date().getTime() > new Date(data.endTime).getTime() ? (
                  <Stack>
                    <LoadingButton variant='outlined' onClick={() => { }}>
                      Drawl
                    </LoadingButton>
                  </Stack>
                ) : (
                  <Stack>
                    <LoadingButton variant='outlined'>View User joined</LoadingButton>
                  </Stack>
                )}
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
    </Box>
  );
};

export default DetailPool;
