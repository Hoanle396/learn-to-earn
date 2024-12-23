"use client"
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CardUser from "../card-basic/CardUser";
import Link from "@/components/Link";
import { useRankingList } from "@/@core/apis/ranking";

const List = () => {
  const { data } = useRankingList({
    limit: 12,
    page: 1
  })
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
      {data?.data.items.map((item: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <CardUser {...item} />
        </Grid>
      ))
      }
    </Grid>
  );
};

export default List;
