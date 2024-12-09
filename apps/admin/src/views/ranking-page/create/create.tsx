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

const languageData = ["English", "Arabic", "French", "German", "Portuguese"];

const CreatePool = () => {
  const [fileInput, setFileInput] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("/images/avatars/1.png");

  const schema = yup.object().shape({
    bid: yup.number().label("bid").typeError("Bid must a number").required(),
  });
  const methods = useForm({
    defaultValues: {
      bid: 0,
    },
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
    setImgSrc("/images/avatars/1.png");
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
          <Link href="/ranking">
            <Button variant="contained" color="primary">
              Back To Ranking
            </Button>
          </Link>{" "}
        </Stack>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <CardContent className="mbe-5">
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
                label="First Name"
                placeholder="John"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="question"
                label="Last Name"
                placeholder="Doe"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="bid"
                label="Email"
                placeholder="john.doe@gmail.com"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="bid"
                label="Organization"
                placeholder="ThemeSelection"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="bid"
                label="Phone Number"
                placeholder="+1 (234) 567-8901"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="bid"
                label="Address"
                placeholder="Address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                placeholder="New York"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="zipCode"
                label="Zip Code"
                placeholder="123456"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  label="Country"
                >
                  <MenuItem value="usa">USA</MenuItem>
                  <MenuItem value="uk">UK</MenuItem>
                  <MenuItem value="australia">Australia</MenuItem>
                  <MenuItem value="germany">Germany</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  multiple
                  value={[]}
                  label="Language"
                  renderValue={(selected) => (
                    <div className="flex flex-wrap gap-2">
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          clickable
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
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} className="flex gap-4 flex-wrap">
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
      </Grid>
    </Grid>
  );
};

export default CreatePool;
