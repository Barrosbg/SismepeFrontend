import React, { Component } from 'react'
import Container from '@mui/material/Container';
import TextFieldAutocomplete from '../../../../components/general/autocomplete'
import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import { ListarPrestador } from '../../../../actions/jms/actions'
import { ListarConselho } from '../../../../actions/jms/actions'
import { listarRelatorioDispensaPorPrestador } from '../../../../actions/jms/actions'
import { listarMilitaresAtendidosPorPrestador } from '../../../../actions/jms/actions'
// import "./style.css";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import DateInput from '../../../../components/general/dateInput';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import CustomizedTables from "../../../../components/general/CustomizedTables"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
<link rel="stylesheet" type="text/css" href="print.css"></link>
const INITIAL_STATE = {
    prestador: '',
    conselho: null,
    dateFromIni: new Date(),
    dateFromFim: new Date(),
    dataIni: null,
    dataFim: null,
    page: 0,
    licencasPorPrestador: [],
    parecerinfo: null,
    hidden: true,


}
class relatorioDisponibilidadeMinima extends Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }
    ChangePrestador = (prestador) => {
  
           if(prestador!=null){
            this.setState({ prestador: prestador.nome,  conselho: prestador.numeroConselho})
           }else{
               this.setState({prestador:null})
           }
    }
    handleDateInicial = (dateIni) => {
        var moment = require('moment');
        const date = moment(dateIni).format('YYYY-MM-DD')
        this.setState({ dateFromIni: date, dataIni: date });
     
    }
    handleDateFim = (dataFim) => {
        var moment = require('moment');
        const date = moment(dataFim).format('YYYY-MM-DD')
        this.setState({ dateFromFim: date, dataFim: date });
        
    }

    handleClickImpirmir = async () => {
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);
        const { prestador, conselho, dataIni, dataFim } = this.state;
        await listarRelatorioDispensaPorPrestador({prestador, dataIni, dataFim, conselho});
        
        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    handleChangeBuscar = async () => {
        const { prestador, conselho, dataIni, dataFim } = this.state
        console.log(prestador, "teste" ,conselho)
        let licencasPorPrestador 
        if( conselho!=''){
            if(dataIni && dataFim){
                licencasPorPrestador = await listarMilitaresAtendidosPorPrestador({ prestador, dataIni, dataFim, conselho })
            licencasPorPrestador && licencasPorPrestador.content.length ?
                    this.setState({ licencasPorPrestador: licencasPorPrestador, hidden: false }):toast.error('Nenhuma licença encontrada.')
               
            }else{
                toast.error('Informe uma data de inicio e fim')
            }
        }else{
            toast.error('Informe um prestador')
        }
        
      
        
    }
    handleChangePaginacao = async (event, page) => {
        const { prestador, conselho, dataIni, dataFim } = this.state
        let licencasPorPrestador = await listarMilitaresAtendidosPorPrestador({ prestador, dataIni, dataFim, conselho, page })
        this.setState({ licencasPorPrestador: licencasPorPrestador, page: page })
    }

    handleRowsPerPage = async (event) => {
        const { prestador, conselho, dataIni, dataFim, page} = this.state  
        let linesPerPage = event.target.value
        let  licencasPorPrestador = await listarMilitaresAtendidosPorPrestador({ prestador,dataIni, dataFim,conselho, page, linesPerPage })
        this.setState({ licencasPorPrestador: licencasPorPrestador, page: page, linesPerPage: linesPerPage })
    }

    render() {
        const { pm, bm, licencasPorPrestador, page } = this.state

        return (
            <Container>

                {/* <Typography color="textSecondary" variant="body1" gutterBottom >
                    <span className="TitlePage">Licenças / Dispensas por OME</span>
                </Typography> */}
                <div className="Spacer"></div>
                <Card container spacing={2} display="flex" alignItems="center">
                    <CardHeader
                        title="Relatório de Militares atendidos por prestador"
                    />
                    <CardContent>
                        <Grid container display="flex" spacing={1}>
                            <Grid item xs={12} sm={3} >
                                <DateInput label="De" fullWidth value={this.state.dateFromIni} handleDateChange={this.handleDateInicial} error={this.state.dtInicialError} />
                            </Grid>
                            <Grid item xs={12} sm={3} >
                                <DateInput label="Até" fullWidth value={this.state.dateFromFim} handleDateChange={this.handleDateFim} error={this.state.dtInicialError} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldAutocomplete e label="Prestador" actionFilter={ListarPrestador} actionChangeOption={this.ChangePrestador} getOptionLabel={(option) => option.numeroConselho + ' - ' + option.nome} error={this.state.prestadorError} />
                            </Grid>
                            {/* <Grid item xs={12} md={4}  >
                                <TextFieldAutocomplete label="Conselho" value={this.state.parecer} actionFilter={''} actionChangeOption={this.changeParecer} getOptionLabel={(option) => option.parecer} filterOptions={(options, object) => options.filter((item) => item.parecer.toUpperCase().includes(object.inputValue.toString().toUpperCase()))} error={this.state.parecerError} />
                            </Grid> */}


                            <Grid container display="flex" spacing={1} justifyContent="flex-end">
                                <Grid item xs={12} md={3} display="flex" >
                                    <Button variant="contained" color="primary" fullWidth onClick={this.handleChangeBuscar}>Buscar</Button>
                                </Grid>
                                <Grid item xs={12} md={3} display="flex" className="ButtonPrimary" target={"_blank"}>
                                    <Button variant="contained" color="primary" fullWidth onClick={this.handleClickImpirmir} target={"_blank"}>Imprimir</Button>
                                </Grid>
                            </Grid>


                        </Grid>
                    </CardContent>
                </Card >


                <Grid container xs={12} >

                    <div className="Spacer"></div>
                    <div className={this.state.hidden ? 'hidden' : ''}  >
                        <Typography color="textSecondary" variant="body1" gutterBottom>
                            <span className="TitlePage">Usuários da OME</span>
                        </Typography>
                    </div>

                    <Grid item xs={12} className={this.state.hidden ? 'hidden' : ''} >
                        <CustomizedTables
                            columns={
                                [
                                    { value: 'Médico' },
                                    { value: 'Data Ini' },
                                    { value: 'Matricula' },
                                    { value: 'Qtd Dias' },
                                    { value: 'Paciente' },
                                ]}
                            handleRowsPerPage={this.handleRowsPerPage}
                            handleChangePaginacao={this.handleChangePaginacao}
                            pageDados={licencasPorPrestador}
                            rows={
                                licencasPorPrestador.content && licencasPorPrestador.content.length ?
                                    licencasPorPrestador.content.map((item) => {
                                        return [
                                            { value: item.nomePrestador },
                                            { value: item.dataInicio },
                                            { value: item.matriculaPaciente },
                                            { value: item.qtdDias },
                                            { value: item.nomePaciente },
                                        ]
                                    }) : []
                            }
                        />






                    </Grid>

                </Grid>

            </Container>
        );
    }
}



const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBackdrop
}, dispatch);
export default connect(null, mapDispatchToProps)(relatorioDisponibilidadeMinima);

