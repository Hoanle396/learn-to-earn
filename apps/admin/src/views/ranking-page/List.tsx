import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CardUser from "../card-basic/CardUser";
import Link from "@/components/Link";

const List = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">Ranking</Typography>
          <Link href="/ranking/create">
            <Button variant="contained" color="primary">
              Create a new pool
            </Button>
          </Link>{" "}
        </Stack>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CardUser />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h3">Solid Cards</Typography>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default List;
