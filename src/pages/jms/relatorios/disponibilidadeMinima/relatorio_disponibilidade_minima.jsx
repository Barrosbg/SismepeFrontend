import React, { Component } from 'react'
import Container from '@mui/material/Container';
import TextFieldAutocomplete from '../../../../components/general/autocomplete'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import { listaOme } from '../../../../actions/jms/actions'
import { filtrarPessoa } from '../../../../actions/jms/actions'
import { listarRelatoriosPorData } from '../../../../actions/jms/actions'
import { listarRelatoriosPorDataPdf } from '../../../../actions/jms/actions'
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
    batalhao: '',
    parecer: null,
    pm: null,
    bm: null,
    matricula: null,
    qtdDias: 0,
    dateFrom: new Date(),
    dtInicial: '',
    licencasDispensasOme: '',
    isOpenModalListarLicencas: false,
    page: 0,
    linesPerPage:0,
    parecerinfo: null,
    hidden: true,
    pdf: null,
    relatorioPorData: []

}
class relatorioDisponibilidadeMinima extends Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }
    ChangeBatalhao = (batalhao) => {
        this.setState({ batalhao: batalhao == null ? '' : batalhao.id })
    }

    handleDateInicial = (dateInfo) => {
        var moment = require('moment');
        const date = moment(dateInfo).format('YYYY-MM-DD')
        this.setState({ dateFrom: date, dataInicio: date });
        console.log(date)
    }
    changePessoa = (pessoa) => {
        this.setState({ matricula: pessoa ? pessoa.matricula : null })
    }

    changeDias = (dias) => {
        if (dias <= 0) {
            toast.warning("Forneça uma quantidade de dias maior que Zero")
        } else {
            this.setState({ qtdDias: dias.target.value })
        }
    }

    changeBuscarRelatorio = async () => {
        const { dataInicio, batalhao, matricula, qtdDias } = this.state
        if (batalhao ||matricula ) {
            let relatorioPorData = await listarRelatoriosPorData({ dataInicio, batalhao, matricula, qtdDias })
            this.setState({ relatorioPorData: relatorioPorData, hidden: false })
        }else{
            toast.error("Informar um batalhão ou Militar para pesquisa")
        }
    }

    handleClickImpirmir = async () => {
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);
        const { dataInicio, batalhao, matricula, qtdDias } = this.state
        await listarRelatoriosPorData({ dataInicio, batalhao, matricula, qtdDias });
        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    handleChangePaginacao = async (event, page) => {
        console.log(page)
        const { dataInicio, batalhao, matricula, qtdDias,linesPerPage } = this.state
        let relatorioPorData = await listarRelatoriosPorData({ dataInicio, batalhao, matricula, qtdDias,linesPerPage, page })
        this.setState({ relatorioPorData: relatorioPorData, page: page })
    }


    handleRowsPerPage = async (event) => {
        const { dataInicio, batalhao, matricula, qtdDias, page } = this.state
        let linesPerPage = event.target.value
        console.log(linesPerPage)
        let relatorioPorData = await listarRelatoriosPorData({ dataInicio, batalhao, matricula, qtdDias, page, linesPerPage })
        this.setState({ relatorioPorData: relatorioPorData, page: page, linesPerPage: linesPerPage })
    }

    render() {
        const { relatorioPorData, page } = this.state
        console.log(relatorioPorData)
        return (

            <Container>

                <div className="Spacer"></div>
                <Card container spacing={2} display="flex" alignItems="center">
                    <CardHeader
                        title="Relatório por Disponibilidade Mínima"
                    />
                    <CardContent>
                        <Grid container display="flex" spacing={1}>
                            <Grid item xs={12} md={6} mt={1}>
                                <TextFieldAutocomplete id="Batalhão" value={this.state.ome} label="Batalhão" actionFilter={listaOme} actionChangeOption={this.ChangeBatalhao} getOptionLabel={(option) => option.descricao} />
                            </Grid>

                            <Grid item xs={12} sm={6} mt={1} >
                                <TextFieldAutocomplete label="Militar" value={this.state.paciente} actionFilter={filtrarPessoa} actionChangeOption={this.changePessoa} getOptionLabel={(option) => option ? option.matricula + ' - ' + option.nome : ""} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} error={this.state.pessoaError} />
                            </Grid>
                            <Grid item xs={12} sm={3} mt={1}  >
                                <DateInput label="Data inicial" fullWidth value={this.state.dateFrom} handleDateChange={this.handleDateInicial} error={this.state.dtInicialError} />
                            </Grid>
                            <Grid item xs={12} md={3} display="flex" >
                                <TextField size="small" id="outlined-basic" label="Qtd Dias" fullWidth variant="outlined" onChange={this.changeDias} margin="dense" />
                            </Grid>

                            <Grid item xs={12} md={3} display="flex" alignItems="center">
                                <Button variant="contained" color="primary" fullWidth onClick={this.changeBuscarRelatorio}>Buscar</Button>
                            </Grid>
                            <Grid item xs={12} md={3} display="flex" alignItems="center" className="ButtonPrimary" target={"_blank"}>
                                <Button variant="contained" color="primary" fullWidth onClick={this.handleClickImpirmir} target={"_blank"}>Imprimir</Button>
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
                                    { value: 'Matrícula' },
                                    { value: 'Nome' },
                                    { value: 'Data de Inicio' },
                                    { value: 'Qtd Dias' },
                                    { value: 'Resultado' },
                                    { value: 'Ações' },
                                ]}
                            handleRowsPerPage={this.handleRowsPerPage}
                            handleChangePaginacao={this.handleChangePaginacao}
                            pageDados={relatorioPorData}
                            rows={
                                relatorioPorData && relatorioPorData.content ?
                                    relatorioPorData.content.map((item) => {
                                        return [
                                            { value: item.pessoa.matricula },
                                            { value: item.pessoa.nome },
                                            { value: item.dataInicio },
                                            { value: item.qtdDias },
                                            { value: item.homologacao },
                                            // { isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'detalhes', event: () => { this.handleClickOpenDetalhes(item) } }, { colorButton: 'BgGreen', icon: 'impressao', event: () => { this.handleClickOpenDetalhes(item) } }] },
                                        ]
                                    }) : []
                            }
                        />


                    </Grid>

                </Grid>

            </Container>

        )
    }
}



const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBackdrop
}, dispatch);
export default connect(null, mapDispatchToProps)(relatorioDisponibilidadeMinima);

