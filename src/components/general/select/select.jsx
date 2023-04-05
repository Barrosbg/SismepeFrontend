import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
export default function InputSelect(props) {

  const handleChange = (event) => {
    props.handlerOption(event.target.value);
  };

  return (
 
      <FormControl variant="outlined" fullWidth={true} display="flex" flex-direction="column">
          <InputLabel id="demo-simple-select-outlined-label" style={{marginTop:'-3px'}}>{props.label}</InputLabel>
         
            <Select
                variant="outlined"
                 margin="dense"
                fullWidth={true}
                label={props.label}
                size='small'
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={props.optionSelected}
                onChange={handleChange}
                // style={{marginTop: '2px'}}
            >
                {props.options.map((op, index) => {
                  console.log(props.options)
                   return<MenuItem value={op.value} key={index}>{op.label}</MenuItem>
                })}

            </Select>
          
      </FormControl>
    
  );
}