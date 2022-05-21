import React from 'react'
import { Typography } from '@mui/material'

const Header = () => {
  return (
    <div style={{backgroundColor:'none',borderRadius: '10px',height:'100px',display: 'flex',alignItems: 'center',marginBottom: '20px'}}>
    <img src={`${require('./images/Logo_png.png')}`} alt="logo classtek" style={{marginLeft:'10px',width:'90px',height:'90px'}}/>
    <Typography variant="h5" style={{marginLeft: '20px',color:'#007AFF'}}>
        CLASSTEK
    </Typography>
    </div>
  )
}

export default Header
