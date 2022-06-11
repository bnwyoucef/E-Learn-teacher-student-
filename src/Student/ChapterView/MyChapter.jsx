import React from 'react'
import {Typography,Button} from "@mui/material";
import FileSystemNavigator from './TreeView'
import axios from '../../API/Axios'
import { useState,useEffect } from 'react' 
import AddChapter from './AddChapter'

const MyChapter = ( {theSelectedModule} ) => {
  const [chaptersList, setChaptersList] = useState([])
  console.log(theSelectedModule);


  async function getChapterList() {
    try {
      if(Object.keys(theSelectedModule).length > 0) {
        const response = await axios.get(`chapters/of-module=${theSelectedModule.id}/InCurrentBatch`)
        setChaptersList(response.data.message)
        console.log("NNN ",response.data.message);
      }
    }catch(err) {
      console.log(err.message);
    }
  }


  useEffect(() => {getChapterList()},[theSelectedModule])

  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'4px',height:'400px'}}
    >
        <div style={{height:'60px',display:'flex',alignItems: 'center',marginLeft:'10px'}}>
            <Typography variant="h6" style={{flex: 1}}>
                Chapters
            </Typography> 
        </div>
        <FileSystemNavigator chapterList={chaptersList}/>
    </div>
  )
}

export default MyChapter