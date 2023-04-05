import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide} from "@mui/material";
import { Component } from "react";
import { bindActionCreators } from "redux";
import { openModal, closeModal, confirmModal } from "../../actions/geral/actions";
import { connect } from "react-redux";


class ModalGlobal extends Component{

    constructor(props){
        super(props)
    }

    transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="left" ref={ref} {...props} />;
    });

    render(){
        const {open, title, body, width, confirmText, cancelText, confirmModal, openModal, closeModal, actionConfirm} = this.props;
        return (
            <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth={width} TransitionComponent={this.transition} >
                <DialogTitle id="form-dialog-title" >{title} </DialogTitle>
                <DialogContent>
                    {body}
                </DialogContent>
                <DialogActions style={{padding: '20px !important'}}>
                    <Button onClick={closeModal} 
                        style={{
                            backgroundColor: "#e04747",
                            color: "white"
                        }}
                        variant="contained">
                        {cancelText}
                    </Button>
                    <Button onClick={() => {confirmModal()}} 
                        style={{
                            backgroundColor: "#3c8dbc",
                            color: "white"
                        }}
                        variant="contained">
                        {confirmText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({ open: state.modal.open });
const mapDispatchToProps = dispatch => bindActionCreators({ openModal, closeModal, confirmModal }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ModalGlobal);