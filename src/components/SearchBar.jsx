import React, { useState } from 'react'
import { Paper, IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`)
      setSearchTerm('')
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: 500, md: 600 },
        height: 40,
        borderRadius: 20,
        border: '1px solid #ccc',
        boxShadow: 'none',
        px: 1,
        margin: { xs: 1, sm: 2 },
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontSize: '16px',
        }}
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <IconButton
        type="submit"
        sx={{
          p: '10px',
          color: '#606060',
          borderLeft: '1px solid #ccc',
          borderRadius: '0 20px 20px 0',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
