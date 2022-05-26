import React from 'react'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect} from'react'
import TextField from '@mui/material/TextField';



function CurrentSemester() {

    const [currentSemester,setCurrentSemester] = useState('CurrentSemester');

    return ( <div 
            style={{
                border:'1px solid #E5E5E5',width:'280%', height:'100%',backgroundColor: 'white',
                borderRadius:'10px',marginTop:"20px",
                padding:"15px"
                }}>
         <Box>
            <FormControl style={{width:'350px',marginLeft:" 48px"}}>
              <TextField
              style={{ backgroundColor:'rgba(15,76,117,0.07)',borderRadius:'20px',color:'rgba(15, 76, 117, 0.6)'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="CurrentSemester"
                value={CurrentSemester}
                variant='standard'
                InputProps={{ disableUnderline: true}}
                onChange={(event) => setCurrentSemester(event.target.value)}
              >
                
              </TextField>
            </FormControl>
          </Box>
    </div> );
}

export default CurrentSemester;