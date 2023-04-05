import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import ReactLoading from "react-loading";
import { Component } from 'react';
import { connect } from 'react-redux';

class BackdropCustom extends Component {
 
  constructor(props){
    super(props);
  }

  render(){
    const { classes, open } = this.props
    return (
      <div>
        <Backdrop style={{zIndex: 10000, color: 'white'}} open={open} >
          <ReactLoading type="bubbles" color="#fff" />
        </Backdrop>
      </div>
    );
  }
}

const mapStateToProps = state => ({ open: state.backdrop.open })
export default connect(mapStateToProps, null)(BackdropCustom)