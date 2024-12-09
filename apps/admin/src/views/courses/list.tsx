"use client"
import { Grid } from '@mui/material'
import React from 'react'
import CardUser from '../card-basic/CardUser'

const ListCourses = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={3}>
        <CardUser />
      </Grid>
    </Grid>
  )
}

export default ListCourses
