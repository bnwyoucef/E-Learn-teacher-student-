import React from 'react'
import {Typography,Avatar,TextField} from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import axios from '../../API/Axios'
import { useState,useEffect } from 'react';

const StudentMarksFill = () => {

    const [moduleList,setModulesList] = useState([])
    async function getAllModules() {
        try {
            const response = await axios.get('module/all')
            setModulesList(response.data.message.slice(0, 4))
        } catch (error) {
            
        }
    }

    useEffect(() => {getAllModules()},[])

  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'4px',height:'500px'}}
    >
        <div style={{height:'120px',display:'flex',flexDirection:'column',alignItems: 'center',marginLeft:'10px',marginBottom:'30px'}}>
            <Avatar style={{height:'80px',width:'80px',marginTop:'10px'}}>H</Avatar>
            <Typography variant="h6" style={{flex: 1}}>
                Student
            </Typography>
            
        </div> 
        <List
            dense
            disablePadding
            sx={{ width: "100%",height: "87%",overflow: "auto",bgcolor: "background.paper",
            //change the background color of item when it clicked
            '& .MuiListItemButton-root:focus': {
                bgcolor: '#7da9ff',
                color: 'white',
            },
            }}
        >
            {moduleList.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.id}`;
            return (
                <ListItem
                key={value.id}
                disablePadding
                >
                <ListItemButton>
                    <ListItemAvatar>
                        <BookIcon style={{color:'#007AFF'}}/>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.name} secondary={'description'}/>
                </ListItemButton>
                <TextField id="filled-basic" label="Filled" variant="outlined" size="small" style={{width:'80px',marginLeft:'10px'}} />
                <TextField id="filled-basic" label="Filled" variant="outlined" size="small" style={{width:'80px',marginLeft:'10px'}} />
                <TextField id="filled-basic" label="Filled" variant="outlined" size="small" style={{width:'80px',marginLeft:'10px'}} />
                </ListItem>
            );
            })}
      </List> 
    </div>
  )
}

export default StudentMarksFill
