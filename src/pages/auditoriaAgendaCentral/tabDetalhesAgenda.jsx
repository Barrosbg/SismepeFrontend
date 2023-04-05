import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid'; // Grid version 1
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CollapsibleTable from './ExibicaoAgendas';
import { connect } from "react-redux";
import { fetchBackdrop } from '../../actions/geral/actions';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { buscarAgendasPorPrestador } from './action';
import { buscarAgendaModificada } from './action';
import CardFicha from './cardFichaPrestadorAudite';
import DetalhesAlteracao from './tabDetalheAlteracao';
import TabAgenda from './ExibicaoAgendas';
import  {buscarUsuario}  from './action.js';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function VerticalTabs(props) {
    const [value, setValue] = React.useState(0);
    const [agendas, setAgendas] = useState([])
    const [usuario, setUsuario] = useState([])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

      useEffect(async () =>{
        
        props.fetchBackdrop('BACKDROP_FETCHED', true) ;
        // console.log(props.agendas)
        // let usuario = await buscarAgendaModificada(props.escalas?.escala.cdUsuarioAlteracao)
        // setUsuario(usuario)
        
        props.fetchBackdrop('BACKDROP_FETCHED', false);
      },[])
    const handleOpenDetalhes = async (detalhes) => {
    
    
      }
    

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, width: 1500 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' ,maxWidth: 170}}
            >
                <Tab label="Agedas" {...a11yProps(0)} />
                <Tab label="Detalhes da Escala" {...a11yProps(1)} />
                <Tab label="Detalhes de Alteração" {...a11yProps(2)} />
        
            </Tabs>
            <TabPanel value={value} index={0}>
                <TabAgenda agendas={props.agendas} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CardFicha escala={props.escalas} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DetalhesAlteracao usuario={usuario} escala={props.escalas} titulo={"Alteração da Escala"}/>
            </TabPanel>

        </Box>
    );
}
const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTabs)