import React, { Component } from 'react'
import Container from '@mui/material/Container';
import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import TextFieldAutocomplete from '../../../../components/general/autocomplete'
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import { listarRelatoriosPorOmePdf } from '../../../../actions/jms/actions'
import { filtrarPessoa } from '../../../../actions/jms/actions'
import { ListarCid } from '../../../../actions/jms/actions'
// import "./style.css";
import DateInput from '../../../../components/general/dateInput';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import CollapsibleTable from "../../../../components/general/tabelaMinimizavel"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
<link rel="stylesheet" type="text/css" href="print.css"></link>
const INITIAL_STATE = {
    batalhao: null,
    parecer: null,
    pm: true,
    bm: true,
    qtdDias: 0,
    licencasDispensasOme: '',
    isOpenModalListarLicencas: false,
    page: 0,
    opcao: null,
    hiddenCid: false,
    hidden: true,
    hiddenMatricula: false,
    labelValue: true,
    changeBusca: null,
    dateFrom: new Date()

}
class genrenciarGestores extends Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }
    // ChangeBatalhao = (batalhao) => {
    //     this.setState({ batalhao: batalhao == null ? '' : batalhao.id })
    // }
    // changeParecer = (parecer) => {
    //     this.setState({ parecer: parecer })
    // }
    // changeDias = (dias) => {
    //     if (dias <= 0) {
    //         toast.warning("Forneça uma quantidade de dias maior que Zero")
    //     } else {
    //         this.setState({ qtdDias: dias.target.value })
    //     }
    // }

    handleChangeSelect = (event, opcao) => {
        let option = opcao.props.value
        if (option == 10) {
            this.setState({ changeBusca: option, labelValue: option, hiddenCid: false ,hiddenMatricula:false})
        } else if (option == 20) {
            this.setState({ changeBusca: option, labelValue: option, hiddenCid: false ,hiddenMatricula:false})
        } else if (option == 30) {
            this.setState({ changeBusca: option, labelValue: option, hiddenCid: false ,hiddenMatricula:false})
        } else if (option == 40) {
            this.setState({ changeBusca: option, labelValue: option, hiddenCid: false ,hiddenMatricula:false})
        } else if (option == 50) {
            this.setState({ changeBusca: option, labelValue: option, hiddenCid: false ,hiddenMatricula:false})
        } else if (option == 60) {
            this.setState({ changeBusca: option, labelValue: option, hiddenCid: false ,hiddenMatricula:false})
        } else if (option == 70) {
            this.setState({ changeBusca: option, labelValue: option, hiddenCid: true ,hiddenMatricula:false})
        } else if (option == 80) {
            this.setState({ changeBusca: option, labelValue: option, hiddenMatricula: true, hiddenCid:false })
        }else  if (option == 90) {
            this.setState({ changeBusca: option, labelValue: option, hiddenCid: false ,hiddenMatricula:false})
        }
    }

    handleChangeBuscar = async (option) => {
      
        // const { batalhao, parecer, pm, bm, qtdDias } = this.state
        // let relatorioLicencas
        // relatorioLicencas = await listarRelatoriosPorOme({ batalhao, parecer, pm, bm, qtdDias })
        // this.setState({ licencasDispensasOme: relatorioLicencas, hidden: false })
        // console.log(relatorioLicencas)
    }

    // handleClickImpirmir = async () => {
    //     this.props.fetchBackdrop('BACKDROP_FETCHED', true);
    //     const { batalhao, parecer, pm, bm, qtdDias, pdf } = this.state;
    //     let relatorioLicencas = await listarRelatoriosPorOmePdf({ batalhao, parecer, pm, bm, qtdDias });
    //     window.open(relatorioLicencas.request.responseURL);
    //     this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    // }

    // handleChangeBuscar = async () => {
    //     const { batalhao, parecer, pm, bm, qtdDias } = this.state
    //     let relatorioLicencas
    //     relatorioLicencas = await listarRelatoriosPorOme({ batalhao, parecer, pm, bm, qtdDias })
    //     this.setState({ licencasDispensasOme: relatorioLicencas, hidden: false })
    //     console.log(relatorioLicencas)
    // }
    // handleChangePaginacao = async (event, page) => {
    //     const { batalhao, parecer, pm, bm, qtdDias } = this.state
    //     let relatorioLicencas = await listarRelatoriosPorOme({ batalhao, parecer, pm, bm, qtdDias, page })
    //     this.setState({ licencasDispensasOme: relatorioLicencas, page: page })
    // }

    // handleRowsPerPage = async (event) => {
    //     const { batalhao, parecer, pm, bm, qtdDias, page } = this.state
    //     let linesPerPage = event.target.value
    //     console.log(linesPerPage)
    //     let relatorioLicencas = await listarRelatoriosPorOme({ batalhao, parecer, pm, bm, qtdDias, page, linesPerPage })
    //     this.setState({ licencasDispensasOme: relatorioLicencas, page: page, linesPerPage: linesPerPage })
    // }

    render() {
        const { pm, bm, licencasDispensasOme, page, hiddenCid,labelValue,opcao,hiddenMatricula } = this.state

        return (
            <Container>


                <div className="Spacer"></div>
                <Card container spacing={2} display="flex" alignItems="center">
                    <CardHeader
                        title="Relatório Gerencial"
                    />
                    <CardContent>
                        <Grid container spacing={1} display="flex">
                            <Grid item xs={12} sm={4} >
                                <DateInput label="Início" fullWidth value={this.state.dateFrom} handleDateChange={this.handleDateInicial} error={this.state.dtInicialError} />
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <DateInput label="Fim" fullWidth value={this.state.dateFrom} handleDateChange={this.handleDateInicial} error={this.state.dtInicialError} />
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <FormControl required className={''} variant="outlined" fullWidth size="small" margin="dense">
                                    <InputLabel id="demo-simple-select-required-label">Tipo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={labelValue}
                                        onChange={this.handleChangeSelect}
                                        className={''}
                                        label={"Tipo"}
                                    >
                                        {/* <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem> */}
                                        <MenuItem value={10}>TODOS</MenuItem>
                                        <MenuItem value={20}>Por Duração</MenuItem>
                                        <MenuItem value={30}>Por Médico</MenuItem>
                                        <MenuItem value={40}>Unidade Militar</MenuItem>
                                        <MenuItem value={50}>Por Digitador</MenuItem>
                                        <MenuItem value={60}>Somatória dos Dias</MenuItem>
                                        <MenuItem value={70}>Por Cid</MenuItem>
                                        <MenuItem value={80}>Por Matricula</MenuItem>
                                        <MenuItem value={90}>POr Grupo</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                          
                               {hiddenCid &&     <Grid item xs={12} sm={12} >
                                    <TextFieldAutocomplete label="CID"  value={this.state.cid } actionFilter={ListarCid} actionChangeOption={this.handleChangecid} getOptionLabel={(option) => option.id + ' - ' + option.descricao} filterOptions={(options, object) => options.filter((item) => item.id.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.descricao.toString().includes(object.inputValue))} error={this.state.cidError} />
                                </Grid>}
                                {hiddenMatricula &&    <Grid item xs={12} sm={12}>
                                        <TextFieldAutocomplete label="Matricula" value={this.state.paciente} actionFilter={filtrarPessoa} actionChangeOption={this.changePaciente} getOptionLabel={(option) => option ? option.matricula + ' - ' + option.nome : ""} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))} error={this.state.pessoaError} />
                                    </Grid>}
                                {/* opcao  != null ? opcao === 70 ? ListarCid : '' : opcao === 80 ? filtrarPessoa: '' */}
                            <Grid container display="flex" spacing={2} justifyContent="flex-end">
                                <Grid item md={3} display="flex" alignItems="center">
                                    <Button variant="contained" color="primary" fullWidth onClick={this.handleChangeBuscar}>Buscar</Button>
                                </Grid>
                                <Grid item md={3} display="flex" alignItems="center" className="ButtonPrimary" target={"_blank"}>
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
                        <CollapsibleTable
                            rowsHeader={
                                [
                                    { value: 'Matricula' },
                                    { value: 'Nome' },
                                    { value: 'Batalhão' },

                                ]
                            }

                            tableRowBody={
                                [
                                    { value: 'Corporação' },
                                    { value: 'QtdDias' },
                                    { value: 'Prestador' },
                                    { value: 'Parecer' },
                                    { value: 'Data Inicio' },
                                    { value: 'Data Homologação' },
                                ]
                            }

                            licencasDispensasOme={licencasDispensasOme}
                            handleChangeRowsPerPage={this.handleRowsPerPage}
                            handleChangePaginacao={this.handleChangePaginacao}

                            rowsBody={

                                this.state.licencasDispensasOme.content && this.state.licencasDispensasOme.content.length ?
                                    this.state.licencasDispensasOme.content.map((item) => {

                                        return [
                                            [
                                                { value: item.pessoa.corporacao == 6 ? "PM" : "BM" },
                                                { value: item.qtdDias },
                                                { value: item.prestador.nome },
                                                { value: item.parecer.parecer },
                                                { value: item.dataInicio },
                                                { value: item.dataHomologacao }
                                            ],



                                            [
                                                { value: item.pessoa.matricula },
                                                { value: item.pessoa.nome },
                                                { value: item.omePessoaTitular.descricao },
                                            ]


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
export default connect(null, mapDispatchToProps)(genrenciarGestores);

