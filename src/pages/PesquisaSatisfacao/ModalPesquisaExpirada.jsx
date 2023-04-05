import { Button, Card, CardContent, CardHeader, Collapse, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import makeStyles from '@mui/styles/makeStyles';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { fetchBackdrop } from '../../actions/geral/actions';
import DialogHeaderFooter from "../../components/general/dialogHeaderFooter";
import withOkAndCancel from "../../components/hocs/withOkAndCancel";
import FilledInput from '@mui/material/FilledInput';
import TextFieldAutocomplete from '../../components/general/autocomplete';
import { toast } from 'react-toastify';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ModalAtualizaExames = (props) => {
    const Modal = withOkAndCancel(DialogHeaderFooter);
    const [modalOpen, setModalOpen] = useState(true)

    const closeFunction = () => {
        setModalOpen(false)
        props.closeFunction(false)
        return modalOpen
    }

    return (
        <Modal
            isOpen={modalOpen}
            title={'Pesquisa de Satisfação'}
        >
            <Grid container spacing={1} alignItems="center">
                <Typography variant="h2" gutterBottom>
                    {`${props.situacao}`}
                </Typography>

            </Grid>
        </Modal>
    );
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalAtualizaExames)
