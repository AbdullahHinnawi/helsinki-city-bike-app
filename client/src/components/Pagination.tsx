import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

interface PaginationProps {
  count: number
  page: number
  handleChange: any
}
/**
 * @component
 * @desc Renders pagination component
 * @props PaginationProps
 */
const ControlledPagination: React.FC<any> = ({
  count,
  page,
  handleChange,
}: PaginationProps) => {
  return (
    <Stack spacing={2} sx={{ mt: 3, mb: 3 }}>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
        sx={{ margin: 'auto' }}
      />
    </Stack>
  )
}
export default ControlledPagination
