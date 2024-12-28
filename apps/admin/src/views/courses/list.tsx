"use client"
import { useCourses } from '@/@core/apis/courses/queries'
import { Grid } from '@mui/material'
import CardCourse from './Card'

const ListCourses = () => {
  const { data } = useCourses()
  console.log(data);
  return (
    <Grid container mt={2} spacing={2}>
      {data?.data.items.map((item: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <CardCourse {...item} />
        </Grid>
      ))
      }
    </Grid>
  )
}

export default ListCourses
