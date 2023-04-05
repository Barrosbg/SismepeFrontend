import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import ReactLoading from "react-loading";

export default function BackdropGeneral(props) {
 
    return (
      <div>
        <Backdrop style={{zIndex: 10000, color: 'white'}} open={props.open} >
          <ReactLoading type="bubbles" color="#fff" />
        </Backdrop>
      </div>
    );
  
}