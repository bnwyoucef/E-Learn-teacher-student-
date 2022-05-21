import React from 'react'
import {Typography,Button} from "@mui/material";
import FileSystemNavigator from './TreeView'
import axios from '../../API/Axios'
import { useState,useEffect } from 'react' 

const MyChapter = () => {
  const [chaptersList, setChaptersList] = useState([])

  let testingList = [{name:'chapter 1',cour:'courses',td:'td',tp:'tp'},{name:'chapter 2',cour:'courses',td:'td',tp:'tp'},{name:'chapter 3',cour:'courses',td:'td',tp:'tp'}];

  async function getChapterList() {
    try {
        const response = await axios.get(`chapters/all`)
        setChaptersList(response.data.message)
        console.log("NNN ",response.data.message);
    }catch(err) {
      console.log(err.message);
    }
  }


  useEffect(() => {getChapterList()},[])

  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'4px',height:'400px'}}
    >
        <div style={{height:'60px',display:'flex',alignItems: 'center',marginLeft:'10px'}}>
            <Typography variant="h6" style={{flex: 1}}>
                Chapters
            </Typography>
            <Button variant='contained' style={{marginRight:'10px'}}>Add Chapter</Button>
        </div>
        <FileSystemNavigator testingList={testingList}/>
    </div>
  )
}

export default MyChapter