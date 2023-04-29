import React from 'react'
import { Box, IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const BasicFilter = ({ placeholder, filter, handleFilterChange }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      sx={{
        mt: 2,
        mb: 2,
        maxWidth: 400,
        margin: 'auto',
        border: '1px solid rgba(224, 224, 224, 1)',
        padding: 0.7,
        borderRadius: '5px',
      }}
    >
      <Box display="flex" alignItems="center" sx={{ width: '85%' }}>
        <InputBase
          sx={{ width: '100%' }}
          placeholder={placeholder}
          value={filter}
          onChange={handleFilterChange}
        />
      </Box>
      <IconButton>
        <SearchIcon />
      </IconButton>
    </Box>
  )
}
export default BasicFilter
