'use client'
import { useCreateLesson } from "@/@core/apis/courses/queries";
import { useMutationPinFileToIPFS } from "@/@core/apis/ipfs";
import FormWrapper from "@/components/Form";
import Link from "@/components/Link";
import TextField from "@/components/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { useParams, useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import VideoPlayer from 'simple-react-video-thumbnail'

export const createLesson = () => {
  const { push } = useRouter();
  const { id } = useParams();

  const [fileInput, setFileInput] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const { mutateAsync: create } = useCreateLesson()
  const { mutateAsync } = useMutationPinFileToIPFS()

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmitHandler = async (input: any) => {
    try {
      let hash;
      if (fileInput) {
        const result: any = await mutateAsync(fileInput as any);
        hash = result.hash;
      }
      const payload = {
        ...input,
        lessonUrl: hash,
        courseId: Number(id),
      }
      await create(payload);
      push('/courses/' + id)
      toast.success("Lesson created successfully");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };


  const handleFileInputChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);
      setFileInput(files?.[0] as File);
    }
  };

  const handleFileInputReset = () => {
    setFileInput(null);
    setImgSrc("");
  };

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">Create new lesson</Typography>
          <Link href="/courses">
            <Button variant="contained" color="primary">
              Back To Courses
            </Button>
          </Link>{" "}
        </Stack>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <CardContent className="mbe-5 flex justify-between">
          <div className="flex max-sm:flex-col items-center gap-6">
            {!imgSrc ? (
              <img
                height={300}
                width={599}
                className="rounded object-contain border border-primary border-dashed"
                src={'/images/logo_full.svg'}
                alt="Profile"
              />
            ) : (
              <VideoPlayer
                videoUrl={imgSrc}
                snapshotAt={3}
                width={120}
                height={80}
              />
            )
            }

            <div className="flex flex-grow flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  component="label"
                  size="small"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                >
                  Upload New Video
                  <input
                    hidden
                    type="file"
                    accept="video/*"
                    onChange={handleFileInputChange}
                    id="account-settings-upload-image"
                  />
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleFileInputReset}
                >
                  Reset
                </Button>
              </div>
              <Typography>Allowed Video/*</Typography>
            </div>
          </div>
        </CardContent>
      </Grid>
      <Grid item xs={12}>
        <FormWrapper methods={methods} onSubmit={formSubmitHandler}>
          <Grid container spacing={5}>
            <Grid item xs={12} >
              <Typography variant="body2" m={1}>Title</Typography>
              <TextField
                fullWidth
                name="title"
                label="Lesson title"
                placeholder="Lesson title"
              />
            </Grid>
            <Grid item xs={12} >
              <Typography variant="body2" m={1}>Content</Typography>
              <MdEditor language="en-US" value={methods.watch('description')} onChange={(t) => methods.setValue("description", t)} />
            </Grid>
            <Grid item xs={12} className="flex gap-4 flex-wrap justify-start flex-row-reverse">
              <Button variant="contained" type="submit">
                Save Changes
              </Button>
              <Button
                variant="outlined"
                type="reset"
                color="secondary"
                onClick={() => methods.reset()}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </FormWrapper>
      </Grid >
    </Grid >
  );
}
