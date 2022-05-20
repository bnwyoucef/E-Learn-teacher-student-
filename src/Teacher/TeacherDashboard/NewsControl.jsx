import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider,Button} from "@mui/material";
import axios from '../../API/Axios'
import { useState,useEffect } from 'react'

const NewsControl = () => {
    const [nouvelList,setNouvelList] = useState([])

  async function getNouvelsAprove() {
    try {
        const response = await axios.get(`news/approvedNews`)
        setNouvelList(response.data.message)
        console.log(response.data.message);
    }catch(err) {
      console.log(err.message);
    }
  }


  useEffect(() => {getNouvelsAprove()},[])

  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'4px'}}
    >
        <div style={{height:'60px',display:'flex',alignItems: 'center',marginLeft:'10px'}}>
            <Typography variant="h6" style={{flex: 1}}>
                News
            </Typography>
            <Button variant='contained' style={{marginRight:'10px'}}>Post News</Button>
        </div>
        <Divider />
        <List
            dense
            disablePadding
            sx={{ width: "100%",height: "85%",overflow: "auto",bgcolor: "background.paper"}}
        >
            {nouvelList.map((nouvel) => {
                const labelId = `checkbox-list-secondary-label-${nouvel.new_Id}`;
                return (
                    <div key={nouvel.new_Id} style={{border: "1px solid #E5E5E5",margin:'5px',borderRadius:'4px'}}>
                        <ListItem
                            key={nouvel.new_Id}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText id={labelId} primary={`${nouvel.object}`}  
                                secondary={`${nouvel.message}`} /> 
                            </ListItemButton>
                            <img src={`https://schooolsystemmanagement-production.up.railway.app/news/files/${nouvel.fileUrl}`} alt='nouvel' style={{margin:'5px'}} />
                        </ListItem>
                    </div>
                );
            })}
            </List>
    </div>
  )
}

export default NewsControl