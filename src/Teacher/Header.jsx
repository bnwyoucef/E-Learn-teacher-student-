import React from 'react'
import { Typography  } from '@mui/material'

const Header = () => {
  return (
    <div style={{backgroundColor:'none',borderRadius: '10px',height:'15vh',display: 'flex',alignItems: 'center',marginTop:"-64px"}}>
    <img src={`${require('../images/Logo_png.png')}`} alt="logo classtek" style={{marginLeft:'10px',height:"100px",width:"100px"}}/>
    <Typography variant="h5" style={{marginRight: '20px',color:'#007AFF'}}>
        CLASSTEK
    </Typography>
    </div>
  )
}

export default Header