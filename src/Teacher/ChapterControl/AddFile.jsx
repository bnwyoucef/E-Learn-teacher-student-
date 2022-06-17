import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from '../../API/Axios';

const AddFile = ({theList,setTheList,chapterId}) => {

    const [open, setOpen] = useState(false);
    const [name,setName] = useState('')
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    const [fileToUpload, setFileToUpload] = useState(null);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setName('')
      setDisplayMsg(false)
    };


    const handleFileSelect = (event) => {
        setFileToUpload(event.target.files[0]);
    }
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      const newFile = {fileName:name,chapter_Id:chapterId,file:fileToUpload};

      try {
          const response = await axios.post(`chapter-files/create`,newFile,{
              headers: { 'Content-Type': 'multipart/form-data' }});
              setCreateSuccess(response.data.success);
              setDisplayMsg(true);
              setTimeout(handleClose,500);
              let newList = theList.map((item) => item.id === chapterId?response.data.message:item); 
              console.log(response.data.message);
              setTheList(newList);
      } catch (error) {
          console.log('there is prblm: ' + error.message);
          setDisplayMsg(true)
      }
    }
  
    useEffect(() => {setDisplayMsg(false)},[name])

  return (
    <div style={{display: 'flex',justifyContent: 'center',padding:'10px 0px'}}>
        <Button variant="contained" size="small" startIcon={<UploadFileIcon />}
            style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginLeft: 20}}
            onClick={handleClickOpen}
        >
            Upload file
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload File</DialogTitle>
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
                <Button
                variant="contained"
                component="label"
                >
                Upload File
                <input
                    accept="application/pdf"
                    type="file"
                    hidden
                    onChange={e => handleFileSelect(e)}
                />
                </Button>
              
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddFile
