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
    const [checkedGroups,setCheckedGroups] = useState([]);
    const [imageToUpload,setImageToUpload] = useState(null);
    const [teacherId,setTeacherId] = useState(0);

    useEffect(() => {
      if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setTeacherId(parseInt(loginStatus.currentUser.id));
      }
    },[])

    async function getMyGroups() {
      try {
        if(teacherId) {
          const response = await axios.get(`teacher/${teacherId}/groups`)
          setMyGroups(response.data.message);  
        }
      }catch(err) {
        console.log(err.message);
      }
    }
  
    useEffect(()=> {getMyGroups()},[teacherId])


  async function getNouvelsAprove() {
    try {
        const response = await axios.get(`news/approvedNews`)
        setNouvelList(response.data.message.reverse());
    }catch(err) {
      console.log(err.message);
    }
  }

  const handleGroupCheck = (event,groupId) => {
    let groupInfo = {isSelected: event.target.checked,groupId: groupId};
    let itemExist = checkedGroups.find(item => item.groupId == groupId);
    
    if(!itemExist) {
      setCheckedGroups([...checkedGroups,groupInfo]);
    }else {
      let newList = checkedGroups.map(item => item.groupId === groupId?groupInfo:item);
      setCheckedGroups(newList);   
    }
  }

  function groupIsSelected(listOfGroupInfo,id) {
    let item = listOfGroupInfo.find(item => item.groupId === id);
    return item?item.isSelected:false;
  }

  const handleConfirm = async (event) => {
    event.preventDefault();
    let GroupsConcernedNews = checkedGroups.filter(item => item.isSelected).map(item => item.groupId);
    let newNews = {teacher_Id:teacherId.toString(),object:object,message:message,file:imageToUpload};
    GroupsConcernedNews.forEach((item, index)=>{
      newNews[`groups[${index}]`] = item;
    })
    
    // const fd = new FormData()
    // fd.append("file",imageToUpload);
    // fd.append("teacher_Id",teacherId.toString());
    // fd.append("object", object);
    // fd.append("message", message);
    // fd.append("groups", JSON.stringify(GroupsConcernedNews));
    
    try{
        const response = await axios.post(`/news/create`,newNews,{
          headers: { 'Content-Type': 'multipart/form-data' }});//multipart/form-data
            setCreateSuccess(response.data.success)
            setDisplayMsg(true)
            console.log(response.data.message);
            setTimeout(handleClose,500)
    }
    catch(err){
        console.log(err);
        setDisplayMsg(true);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setObject('');
    setMessage('');
    setCheckedGroups([]);
    setDisplayMsg(false);
  };

  useEffect(() => {getNouvelsAprove()},[]);

  const handleFileSelect = (event) => {
    setImageToUpload(event.target.files[0]);
  }

  return (
    <div style={{marginLeft:"10px",width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'10px',maxWidth: '100%',height:'300px',marginBottom:'10px'}}
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
              <Button
                variant="contained"
                component="label"
              >
                Upload File
                <input
                    type="file"
                    hidden
                    onChange={e => handleFileSelect(e)}
                />
              </Button>
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Select Groups</FormLabel>
        <FormGroup>
            {groups?groups.map((groupe) => 
            <FormControlLabel 
              key={groupe.id}
            control={
                <Checkbox 
                  checked={groupIsSelected(checkedGroups,groupe.id)}
                  onChange={(event) => handleGroupCheck(event,groupe.id)} 
                  name={groupe.name+' '+groupe.inSection+' '+groupe.inLevel}
                />
            }
            label={groupe.name+' '+groupe.inSection+' '+groupe.inLevel}     
            />):''}
        </FormGroup>
      </FormControl>
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
        </div>
      <Divider />
        <List
            dense
            disablePadding
            sx={{ width: "100%",height: "230px",overflow: "auto",bgcolor: "background.paper"}}
        >
            {nouvelList?nouvelList.map((nouvel) => {
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
                            <img src={`https://school-systemmanagement-production.up.railway.app/news/files/${nouvel.fileUrl}`} 
                            alt='nouvel' 
                            style={{margin:'5px',height:128,width:215}}
                             />
                        </ListItem>
                        <Divider style={{width:"98%", marginRight:"auto",marginLeft:"auto"}}/>
                    </div>
                );
            }):''}
            </List>
    </div>
  )
}

export default NewsControl