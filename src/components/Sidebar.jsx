import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { categories } from '../utils/constants'

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {

  return (
    <Stack
      direction="row"
      sx={{
        overflowY: 'auto',
        height: { sx: 'auto', md: '95%' },
        flexDirection: { md: 'column' },
      }}
    >
      {categories.map((category) => (
        <button
          className="category-btn"
          onClick={() => setSelectedCategory(category.name)}
          key={category.name}
          style={{
            background: category.name === selectedCategory ? '#333' : 'transparent',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <span style={{ marginRight: '15px', color: 'white' }}>
            {category.icon}
          </span>
          <span style={{ opacity: 0.8 }}>
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  )
}

export default Sidebar
