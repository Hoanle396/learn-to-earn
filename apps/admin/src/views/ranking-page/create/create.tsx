'use client'
import FormWrapper from "@/components/Form";
import Link from "@/components/Link";
import TextField from "@/components/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import * as yup from "yup";

const CreatePool = () => {
  const schema = yup.object().shape({
    bid: yup.number().label("bid").typeError("Bid must a number").required(),
  });
  const methods = useForm({
    defaultValues: {
      bid: 0,
    },
    resolver: yupResolver(schema),
  });
  const formSubmitHandler = async (formData) => {
    console.log(formData);
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
      <Grid item xs={12} sm={6} md={4}>
        <FormWrapper methods={methods} onSubmit={formSubmitHandler}>
          <TextField name="bid" />
        </FormWrapper>
      </Grid>
    </Grid>
  );
};

export default CreatePool;
