"use client"

import { useUpdateUser, useUsers } from "@/@core/apis/auth"
import { Box, Button, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import toast from "react-hot-toast"

const UserManagement = () => {
  const { data: users, refetch } = useUsers()
  const { mutateAsync } = useUpdateUser()
  const handleActive = async (id: number, status: 'active' | 'inactive') => {
    try {
      await mutateAsync({ id, status })
      refetch()
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  }
  return (
    <Box sx={{ padding: 4, borderRadius: 5, boxShadow: 0.5, paddingY: 8 }}>

      <Stack direction='row' justifyContent='space-between' alignItems='center' my={8}>
        <Typography variant='h5'>User Joined</Typography>
      </Stack>
      <Box sx={{ border: 1, borderRadius: 2, padding: 4 }} >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Wallet</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.data.items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.wallet}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.isActive ? (<Chip label="active" color='success' />) : (<Chip label="inactive" color='error' />)}</TableCell>
                <TableCell>
                  <Stack direction='row' gap={2}>
                    {!item.isActive ? (
                      <Button variant='outlined' color='success' onClick={() => { handleActive(item.id, 'active') }}>
                        Active
                      </Button>
                    ) : (
                      <Button variant='outlined' color='error' onClick={() => { handleActive(item.id, 'inactive') }}>
                        Inactive
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}


export default UserManagement
