import React from 'react'   
import { Stack } from '@mui/material'
import { categories } from '../utils/constants'
const Sidebar = () => {
  return (
    <Stack direction="row" sx={{ overflowY: 'auto', height: { sx: 'auto', md: '95%' }, flexDirection: { md: 'column' } }}>
      {categories.map((category) => (
        <button className='category-btn' style={{ background: 'transparent', border: 'none', color: 'white', display: 'flex', alignItems: 'center', padding: '10px 20px', cursor: 'pointer', width: '100%' }} key={category.name}>
          <span style={{ marginRight: '15px', color: 'white' }}>{category.icon}</span>
            <span style={{ opacity: 0.8 }}>{category.name}</span>
        </button>
      ))}
    </Stack>
  )
}

export default Sidebar
