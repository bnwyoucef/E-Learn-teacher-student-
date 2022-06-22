import React from 'react'
import {Typography,Divider,TextField,Button} from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import axios from '../../API/Axios'
import { useState,useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

const StudentMarksFill = ( {currentStudent} ) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [moduleList,setModulesList] = useState([]);
    const [teacherId,setTeacherId] = useState(0);
    const [emd1,setEmd1] = useState('');
    const [emd2,setEmd2] = useState('');
    const [cc,setCc] = useState('');

    useEffect(() => {
      if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setTeacherId(parseInt(loginStatus.currentUser.id));
      }
    },[]);

    async function getAllModules() {
        if(teacherId !== 0 && Object.keys(currentStudent).length > 0) {
            try {
                const response = await axios.get(`marks/ofStudent=${currentStudent.id}/ByTeacher=${teacherId}`);
                setModulesList(response.data.message);
            } catch (error) {
                
            }
        }
    }

    useEffect(() => {getAllModules()},[currentStudent]);

    async function handleMarkRegister(moduleId) {
        let newRow = {student_Id: parseInt(currentStudent.id),module_Id: moduleId};
        if(emd1 !== '') newRow.emd1 = parseInt(emd1, 10);
        if(emd2 !== '') newRow.emd2 = parseInt(emd2, 10);
        if(cc !== '') newRow.cc = parseInt(cc, 10);
        try {
            const response = await axios.post(`marks/newRow`,newRow);
            handleClose();
        } catch (error) {
            
        }
    }

    function handleEmd1Change(event) {
        setEmd1(event.target.value);
    }

  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'10px',height:'600px'}}
    >
        <div style={{height:'60px',display:'flex',alignItems: 'center',justifyContent: 'center'}}>
            <Typography variant="h6">
                Fill marks
            </Typography> 
        </div> 
        <Divider />
        <List
            dense
            disablePadding
            sx={{ width: "100%",height: "530px",overflow: "auto",bgcolor: "background.paper",
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
                <div style={{display: 'flex',justifyContent: 'flex-end'}}>
                    <TextField 
                        id="filled-basic" label="Note 1" variant="outlined" size="small"
                        style={{width:'80px',marginLeft:'10px'}} 
                        onChange={event => setEmd1(event.target.value)} value={emd1}
                    />
                    <TextField 
                        id="filled-basic" label="Note 2" variant="outlined" size="small" 
                        style={{width:'80px',marginLeft:'10px'}} 
                        onChange={event => setEmd2(event.target.value)} value={emd2}
                    />
                    <TextField 
                        id="filled-basic" label="CC" variant="outlined" size="small" 
                        style={{width:'80px',marginLeft:'10px'}} 
                        onChange={event => setCc(event.target.value)} value={cc}
                    />
                    <Button 
                        variant='contained' size='small' 
                        style={{margin:'0 10px',  textTransform:'none',height:'80%',alignSelf:'center'}}
                        onClick={handleClickOpen}
                    >
                        Register
                    </Button>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Mark Register"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure to rigister this mark?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={() => handleMarkRegister(value.id)}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                </ListItem>
            );
            })}
      </List> 
    </div>
  )
}

export default StudentMarksFill
