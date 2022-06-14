import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react';
import axios from '../../API/Axios';

const SelectGroup = ( {currentGroup,setCurrentGroup} ) => {
  const [groupsList,setGroupsList] = useState([])
  const [teacherId,setTeacherId] = useState(0);
  
  useEffect(() => {
    if(localStorage.getItem('loginStatus')){
        const loginStatus = JSON.parse(localStorage.getItem('loginStatus'))
        setTeacherId(parseInt(loginStatus.currentUser.id));
      }
    },[])
  
    function compare( a, b ) {
      if ( a.name.toUpperCase() < b.name.toUpperCase() ){
        return -1;
      }
      if ( a.name.toUpperCase() > b.name.toUpperCase() ){
        return 1;
      }
      return 0;
    }

    async function getMyGroups() {
      try {
        if(teacherId) {
          const response = await axios.get(`teacher/${teacherId}/groups`)
          setGroupsList(response.data.message.sort(compare))
          console.log(response.data.message);  
        }
      }catch(err) {
        console.log(err.message);
      }
    }
  
    useEffect(()=> {getMyGroups()},[teacherId]);
  
    return (
      <Box sx={{ minWidth: 120,marginLeft:'10px' }}>
        <FormControl fullWidth size='small'>
          <InputLabel id="demo-simple-select-label">Group</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentGroup}
            label="Group"
            onChange={e => setCurrentGroup(e.target.value)}
          >
            {groupsList.map(group => 
              <MenuItem key={group.id} value={group.id}>{group.name + ' ' + group.inLevel}</MenuItem>
            )} 
          </Select>
        </FormControl>
      </Box>
    );
}

export default SelectGroup