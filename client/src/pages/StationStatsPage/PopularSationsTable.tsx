import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

interface PopularSationsTableProps {
  popularStations: any[]
}

const PopularSationsTable = ({ popularStations }: PopularSationsTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Station</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {popularStations?.map((s: any) => (
            <TableRow
              key={s._id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {s._id}
              </TableCell>
              <TableCell align="left">{s.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PopularSationsTable
