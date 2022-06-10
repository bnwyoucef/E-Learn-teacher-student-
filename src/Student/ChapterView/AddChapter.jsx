import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react';
import axios from '../../API/Axios';

const AddChapter = ({theList,setTheList,module}) => {

    const [open, setOpen] = useState(false);
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    const [hasDataShow, setHasDataShow] = useState(true);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setName('')
      setDescription('')
      setDisplayMsg(false)
    };

    const handleChange = (event) => {
      setHasDataShow(event.target.checked);
    };
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      const newChapter = {name,description,module_Id:module.id}
      try {
          const response = await axios.post(`chapters/create`,newChapter,{
              headers: { 'Content-Type': 'application/json' }})
              setCreateSuccess(response.data.success)
              setDisplayMsg(true)
              setTimeout(handleClose,500)
              let newList = [...theList]
              newList.push(response.data.message) 
              setTheList(newList) 
      } catch (error) {
          console.log('there is prblm: ' + error.message);
          setDisplayMsg(true)
      }
    }
  
    useEffect(() => {setDisplayMsg(false)},[name,description,hasDataShow])

  return (
    <div>
      <Button variant="contained" disabled = {!Object.keys(module).length > 0} onClick={handleClickOpen} size="small" style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
        Add Chapter
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Chapter</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">Chapter added successfully</Alert>}
            {displayMsg && !createSuccess && <Alert severity="error">Oops Something went wrong!</Alert>}
            <form onSubmit={handleConfirm}>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  value= {name}
                  onChange= {e => setName(e.target.value)}
              />
              <TextField
                  margin="dense"
                  id="name"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value= {description}
                  onChange= {e => setDescription(e.target.value)}
              />
              
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddChapter
