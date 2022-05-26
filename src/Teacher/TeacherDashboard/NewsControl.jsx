import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider,Button} from "@mui/material";
import axios from '../../API/Axios'
import { useState,useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

const NewsControl = () => {
    const [nouvelList,setNouvelList] = useState([])
    const [open, setOpen] = useState(false);
    const [object,setObject]= useState('');
    const [message,setMessage] = useState('');
    const [groups,setMyGroups] = useState([]);
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    const [checkedGroups,setCheckedGroups] = useState({})



    async function getGroups() {
        try{
        const response = await axios.get(`/section/1`);
        console.log(response)
        setMyGroups(response.data.message.groups);
        const checkedgrps=response.data.message.groups.map(group=>{group.checked=false
        return group.checked;
        })
        console.log(groups);
        setCheckedGroups(checkedgrps)
        console.log(checkedGroups);
    }
        catch(err){
            console.log(err.message);
        }

    }

  async function getNouvelsAprove() {
    try {
        const response = await axios.get(`news/approvedNews`)
        setNouvelList(response.data.message)
        console.log(response.data.message);
    }catch(err) {
      console.log(err.message);
    }
  }

  const handleChange = (event) => {
    setCheckedGroups({
      ...checkedGroups,
      [event.target.name]: event.target.checked,
    });
    console.log(checkedGroups)
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    const objectt = object.toString();
    const messagee = message.toString();
    const groupss = groups.map(group => group.id);
    console.log(groupss)
    let newNews = {teacher_Id:"1",object:objectt,message:messagee,groups:groupss};
    try{
        const response = await axios.post(`/news/create`,newNews,{
            headers: { 'Content-Type': 'application/json' }});
            console.log(response)
            setCreateSuccess(response.data.success)
              setDisplayMsg(true)
              setTimeout(handleClose,1000)
    }
    catch(err){
        console.log(err);
        setDisplayMsg(true)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {getGroups()},[]);
  useEffect(() => {getNouvelsAprove()},[]);



  return (
    <div style={{marginLeft:"10px",width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'10px',maxWidth: '100%'}}
    >
        <div style={{height:'60px',display:'flex',alignItems: 'center',marginLeft:'10px'}}>
            <Typography variant="h6" style={{flex: 1}}>
                News
            </Typography>
            <Button onClick={handleClickOpen} variant='contained' style={{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: '10px'}}>Post News</Button>
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add News</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">News sent to groups</Alert>}
            {displayMsg && !createSuccess && <Alert severity="error">Oops Something went wrong!</Alert>}
            <form onSubmit={handleConfirm}>
              <TextField
                  autoFocus
                  margin="dense"
                  id="object"
                  label="Object"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  value= {object}
                  onChange= {e => setObject(e.target.value)}
              />
              <TextField
                  margin="dense"
                  id="message"
                  label="Message"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  value= {message}
                  multiline={true}
                  rows={3}
                  onChange= {e => setMessage(e.target.value)}
              />
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Select Groups</FormLabel>
        <FormGroup>
            {groups.map((groupe) => <FormControlLabel 
            control={
                <Checkbox checked={`${checkedGroups[groupe.id-1]}`} onChange={handleChange} name={`${groupe.name}`}/>
            }
            label={`${groupe.name}`}     
            />)}
        </FormGroup>
      </FormControl>
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
        </div>
        <List
            dense
            disablePadding
            sx={{ width: "100%",height: "85%",overflow: "auto",bgcolor: "background.paper"}}
        >
            {nouvelList.map((nouvel) => {
                const labelId = `checkbox-list-secondary-label-${nouvel.new_Id}`;
                return (
                    <div key={nouvel.new_Id} style={{margin:'5px',borderRadius:'10px'}}>
                        <ListItem
                            key={nouvel.new_Id}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText id={labelId} primary={`${nouvel.object}`}  
                                secondary={`${nouvel.message}`} /> 
                            </ListItemButton>
                            <img src={`https://schooolsystemmanagement-production.up.railway.app/news/files/${nouvel.fileUrl}`} alt='nouvel' style={{margin:'5px',height:128,width:215}} />
                        </ListItem>
                                <Divider style={{width:"95%", marginRight:"auto",marginLeft:"auto"}}/>
                    </div>
                );
            })}
            </List>
    </div>
  )
}

export default NewsControl