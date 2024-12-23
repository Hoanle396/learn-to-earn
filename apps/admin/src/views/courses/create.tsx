'use client'
import FormWrapper from "@/components/Form";
import Link from "@/components/Link";
import TextField from "@/components/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Grid, Stack, Typography, Chip, MenuItem, Select, InputLabel, FormControl, CardContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { ChangeEvent } from "react";
import * as yup from "yup";
import { useTemplate } from "@/@core/apis/ranking";

const languageData = ["English", "Arabic", "French", "German", "Portuguese"];

const CreateCourse = () => {

  const [fileInput, setFileInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([])
  const [imgSrc, setImgSrc] = useState<string>("/images/logo_full.svg");
  const { mutateAsync: download } = useTemplate()

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    questionPerPool: yup.number().required()

  });
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const formSubmitHandler = async (formData: any) => {
    console.log(formData);
  };


  const handleFileInputChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(files[0]);

      if (reader.result !== null) {
        setFileInput(reader.result as string);
      }
    }
  };

  const handleFileInputReset = () => {
    setFileInput("");
    setImgSrc("/images/logo_full.svg");
  };

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">Create new pool</Typography>
          <Link href="/courses">
            <Button variant="contained" color="primary">
              Back To Ranking
            </Button>
          </Link>{" "}
        </Stack>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <CardContent className="mbe-5 flex justify-between">
          <div className="flex max-sm:flex-col items-center gap-6">
            <img
              height={200}
              width={399}
              className="rounded object-contain border border-primary border-dashed"
              src={imgSrc}
              alt="Profile"
            />
            <div className="flex flex-grow flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  component="label"
                  size="small"
                  variant="contained"
                  htmlFor="account-settings-upload-image"
                >
                  Upload New Photo
                  <input
                    hidden
                    type="file"
                    value={fileInput}
                    accept="image/png, image/jpeg"
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
              <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
            </div>
          </div>
        </CardContent>
      </Grid>
      <Grid item xs={12}>
        <FormWrapper methods={methods} onSubmit={formSubmitHandler}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Course Name"
                placeholder="Course Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="category"
                label="Category"
                placeholder="Category"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                multiline
                rows={4}
                fullWidth
                name="description"
                label="Description"
                placeholder="Description"
              />
            </Grid>

            <Grid item xs={12} >
              <FormControl fullWidth>
                <InputLabel>tags</InputLabel>
                <Select
                  multiple
                  value={tags}
                  label="tags"
                  renderValue={(selected) => (
                    <div className="flex flex-wrap gap-2">
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          clickable
                          onDelete={() => { setTags(prev => ([...prev.filter(item => item != value)])) }}
                          deleteIcon={
                            <i
                              className="ri-close-circle-fill"
                              onMouseDown={(event) => event.stopPropagation()}
                            />
                          }
                          size="small"
                          label={value}
                        />
                      ))}
                    </div>
                  )}
                >
                  {languageData.map((name) => (
                    <MenuItem key={name} value={name} onClick={() => setTags((prev) => ([...prev, name]))}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} className="flex gap-4 flex-wrap justify-start flex-row-reverse">
              <Button variant="contained" type="submit">
                Save Changes
              </Button>
              <Button
                variant="outlined"
                type="reset"
                color="secondary"
                onClick={() => {
                  methods.reset();
                  setTags([]);
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </FormWrapper>
      </Grid>
    </Grid>
  );
};

export default CreateCourse;
