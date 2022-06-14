import React from 'react'
import {Typography,Avatar,Divider} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SelectGroup from './SelectGroup'
import axios from '../../API/Axios'
import { useState,useEffect } from 'react'

const TeacherStudent = ( {setCurrentStudent}) => {

    const [studentsList,setStudentsList] = useState([]);
    const [currentGroup,setCurrentGroup] = useState(0);

    async function getAllStudents() {
        try {
            const response = await axios.get('student/all')
            let newList = response.data.message.filter(student => student.group.id === currentGroup); 
            setStudentsList(newList);
        } catch (error) {
            
        }
    }

    useEffect(() =>{getAllStudents()},[currentGroup])

  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,border: '1px solid #E5E5E5',
        backgroundColor: 'white',borderRadius:'4px',height:'500px'}}
    >
        <div style={{height:'60px',display:'flex',alignItems: 'center',marginLeft:'10px'}}>
            <Typography variant="h6">
                Fill Marks
            </Typography>
            <SelectGroup currentGroup={currentGroup} setCurrentGroup={setCurrentGroup}/>
        </div> 
        <Divider /> 
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
        {studentsList.length > 0?studentsList.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <ListItem
              key={value.id}
              disablePadding
              onClick={event => setCurrentStudent(value)}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>{value.name.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.name + ' ' + value.lastName}`} />
              </ListItemButton>
            </ListItem>
          );
        }):<div style={{display: 'flex', justifyContent: 'center',marginTop:'30px'}}>
            {currentGroup === 0 ? <Typography variant="h6">
                Select the group please
              </Typography>:
              <Typography variant="h6">
                There is no student in this group
              </Typography>
            }
          </div>}
      </List> 
    </div>
  )
}

export default TeacherStudent