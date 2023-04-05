import React, { Component } from 'react'
import Container from '@mui/material/Container';
import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import TextFieldAutocomplete from '../../../../components/general/autocomplete'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { listarPorOme } from '../../../../actions/jms/actions'
import { listarPorDiasIniterruptos } from '../../../../actions/jms/actions'
import { listarPorCid } from '../../../../actions/jms/actions'
import { ListarCid } from '../../../../actions/jms/actions'
import { RelatoriosAfastadosPorCidPdf } from '../../../../actions/jms/actions'
import { RelatoriosAfastadosPorDiasIniterruptosPdf } from '../../../../actions/jms/actions'
import { RelatoriosAfastadosPorOmePdf } from '../../../../actions/jms/actions'

import "./style.css";
import DateInput from '../../../../components/general/dateInput';
import { fetchBackdrop } from '../../../../actions/geral/actions';

import CustomizedTables from "../../../../components/general/CustomizedTables"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
<link rel="stylesheet" type="text/css" href="print.css"></link>
const INITIAL_STATE = {
    batalhao: null,
    optionChange: null,
    qtdDias: 0,
    licencasDispensasOme: '',
    isOpenModalListarLicencas: false,
    page: 0,
    parecerinfo: null,
    hidden: false,
    hiddenCid: false,
    buscaState: null,
    cid: null,
    resultSearch: [],
    labelValue: '',
    buscaPorOme: null,
    buscaPorCid: false,
    changeBusca: null,
    headers: []
}
class genrenciarGestores extends Component {
    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }
    ChangeBatalhao = (batalhao) => {
        this.setState({ batalhao: batalhao == null ? '' : batalhao.id })
    }
    changeParecer = (parecer) => {
        this.setState({ parecer: parecer })
    }
    changeDias = (dias) => {
        if (dias <= 0) {
            toast.warning("Forneça uma quantidade de dias maior que Zero")
        } else {
            this.setState({ qtdDias: dias.target.value })
        }
    }
    handleChangeLimpar = () => {
        const { resultSearch, hidden, cid, changeBusca } = this.state
        this.setState({ resultSearch: [], hidden: false, changeBusca: null, cid: null })
    }

    handleChangeListarPorOme = async () => {
        let listagemCid = await listarPorOme()
        this.setState({ buscaPorCid: listagemCid })
        console.log(listagemCid)
    }

    handleChangecid = (cid) => {
        if(cid!==null){
            this.setState({ cid: cid })
        }else{
            this.setState({hidden:false, cid:null})
        }

    }

    handleChangeListarPorCid = async (cid) => {
        let listagemOme = await listarPorCid(cid)
        this.setState({ buscaPorOme: listagemOme })
    }
    handleClickImpirmir = async () => {
     const {changeBusca} = this.state
        if (changeBusca) {

            if (changeBusca == 10) {
                await RelatoriosAfastadosPorDiasIniterruptosPdf()
            }
            else if (changeBusca == 20) {
               await RelatoriosAfastadosPorOmePdf()
            } else if (changeBusca == 30) {
                if (cid) {
                    let relatorioLicencas = await RelatoriosAfastadosPorCidPdf(cid.id)
                    console.log(relatorioLicencas)
                    this.setState({ resultSearch: relatorioLicencas, hidden: true, })
                } else {
                    toast.error("Informe um CID válido")
                }

            }
        } else {
            toast.error("Selecione uma opção de relátorio")
        }
    }
    handleChangeSelect = (event, opcao) => {


        let option = opcao.props.value
        switch (option) {
            case 10:
                this.setState({ changeBusca: 10, labelValue: option, hidden: false, hiddenCid: false, resultSearch: [] })
                break;
            case 20:
                this.setState({ changeBusca: 20, labelValue: option, hidden: false, hiddenCid: false, resultSearch: [] })
                break;
            case 30:
                this.setState({ changeBusca: 30, labelValue: option, hidden: false, hiddenCid: true, resultSearch: [] })
                break;    

        }
 
    }

    handleChangeBuscar = async () => {
        const { changeBusca, cid } = this.state
        console.log(changeBusca)
        if (changeBusca) {

            if (changeBusca == 10) {
                let relatorioLicencas = await listarPorDiasIniterruptos()
                console.log(relatorioLicencas)
                this.setState({ resultSearch: relatorioLicencas, hidden: true })
            }
            else if (changeBusca == 20) {
                let relatorioLicencas = await listarPorOme()
                console.log(relatorioLicencas)
                this.setState({ resultSearch: relatorioLicencas, hidden: true })
            } else if (changeBusca == 30) {
                if (cid) {
                    console.log(cid)
                  let relatoriosCid = await listarPorCid(cid)
                  this.setState({ resultSearch: relatoriosCid, hidden: true })
                } else {
                    toast.error("Informe um CID válido")
                }

            }
        } else {
            toast.error("Selecione uma opção de relátorio")
        }
        // const { batalhao, parecer, pm, bm, qtdDias } = this.state
        // let relatorioLicencas
        // relatorioLicencas = await listarRelatoriosPorOme({ batalhao, parecer, pm, bm, qtdDias })
        // this.setState({ licencasDispensasOme: relatorioLicencas, hidden: false })
        // console.log(relatorioLicencas)
    }

    handleRenderColumns = () => {
        const { changeBusca } = this.state;
        let columns;
        if (changeBusca == 20) {
            columns = [
                { value: 'Unidade Militar' },
                { value: 'Homologadas' },
                { value: 'Lançadas' },
            ]
        } else if (changeBusca == 30) {
            columns = [
                { value: 'Unidade Militar' },
                { value: 'Homologadas' },
                { value: 'Lançadas' },
            ]
        } else {
            columns = [
                { value: 'Matricula' },
                { value: 'Nome' },
                { value: 'Batalhão' },
                { value: 'Data Inicial' },
                { value: 'Data Final' },
                { value: 'Qtd Dias' },
            ]
        }
        // console.log(columns)
        // this.setState({headers:columns})
        return columns
        // changeBusca == 40 ?   :

    }

    handleRenderRow = (item) => {
        const { changeBusca, resultSearch } = this.state;
        let row
        console.log(item)
        if (changeBusca == 20 || changeBusca == 30) {
            row = [
                { value: item.col0 },
                { value: item.col1 },
                { value: item.col2 },
            ]

        } else {
            row = [
                { value: item.matricula },
                { value: item.nome },
                { value: item.batalhao },
                { value: item.dataInicial },
                { value: item.dataFinal },
                { value: item.qtdDias },
            ]
        }

        return row
    }
    handleChangePaginacao = async (event, page) => {
        const { changeBusca, cid } = this.state
        if (changeBusca == 10) {
            let relatorioLicencas = await listarPorDiasIniterruptos(page)
            console.log(relatorioLicencas)
            this.setState({ resultSearch: relatorioLicencas, hidden: true })
        }
        else if (changeBusca == 20) {
            let relatorioLicencas = await listarPorOme(page)
            console.log(relatorioLicencas)
            this.setState({ resultSearch: relatorioLicencas, hidden: true })
        } else if (changeBusca == 30) {

            let relatorioLicencas = await listarPorCid(cid, page)
            console.log(relatorioLicencas)
            this.setState({ resultSearch: relatorioLicencas, hidden: true, })
        }
    }

    handleRowsPerPage = async (event) => {
        let linesPerPage = event.target.value
        console.log(linesPerPage)
        const { changeBusca, cid,page } = this.state
        console.log(cid)
        if (changeBusca == 10) {
            let relatorioLicencas = await listarPorDiasIniterruptos(page,linesPerPage )
            console.log(relatorioLicencas)
            this.setState({ resultSearch: relatorioLicencas, hidden: true.content,page: page, linesPerPage: linesPerPage  })
        }
        else if (changeBusca == 20) {
            let relatorioLicencas = await listarPorOme(page,linesPerPage )
            console.log(relatorioLicencas)
            this.setState({ resultSearch: relatorioLicencas, hidden: true ,page: page, linesPerPage: linesPerPage })
        } else if (changeBusca == 30) {

            let relatorioLicencas = await listarPorCid(cid, page,linesPerPage )
            console.log(relatorioLicencas)
            this.setState({ resultSearch: relatorioLicencas, hidden: true,page: page, linesPerPage: linesPerPage  })
        }
    
    }

    render() {
        const { licencasDispensasOme, resultSearch, hidden, hiddenCid, labelValue, changeBusca } = this.state
       
        return (
            <Container>


                <div className="Spacer"></div>
                <Card container spacing={2} display="flex" alignItems="center">
                    <CardHeader
                        title="Militares Afastados"
                    />
                    <CardContent>
                        <Grid container spacing={1} display="flex" >
                            <Grid item md={6}>
                                <FormControl fullWidth size="small" variant="outlined" className={''} alignItems="center" margin="dense">
                                    <InputLabel id="demo-simple-select-outlined-label">Opções</InputLabel>
                                    <Select
                                        // labelId="demo-simple-select-outlined-label"
                                        // id="demo-simple-select-outlined"
                                        value={labelValue}
                                        onChange={this.handleChangeSelect}
                                        label={'Opções'}
                                    >

                                        <MenuItem value={10}>Por Dias Ininterruptos</MenuItem>
                                        <MenuItem value={20}>Unidade Militar</MenuItem>
                                        <MenuItem value={30}>Por Cid</MenuItem>
                                        
                                    </Select>
                                </FormControl>
                            </Grid>
                            {hiddenCid && <Grid item xs={12} sm={6} mt={1} >
                                <TextFieldAutocomplete label="CID" actionFilter={ListarCid} actionChangeOption={this.handleChangecid} getOptionLabel={(option) => option.id + ' - ' + option.descricao} filterOptions={(options, object) => options.filter((item) => item.id.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.descricao.toString().includes(object.inputValue))} error={this.state.cidError} />
                            </Grid>}

                            {/* <Grid container display="flex" spacing={2 }  justify="flex-end"> */}
                            <Grid item md={3} display="flex" alignItems="center">
                                <Button variant="contained" color="primary" fullWidth onClick={this.handleChangeBuscar}>Buscar</Button>
                            </Grid>
                            <Grid item md={3} display="flex" alignItems="center" justifyContent="flex-end" className="ButtonPrimary" target={"_blank"}>
                                <Button variant="contained" color="primary" fullWidth onClick={this.handleClickImpirmir} target={"_blank"}>Imprimir</Button>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card >
                {hidden && <Grid container xs={12} >

                    <div className="Spacer"></div>
                    <div className={this.state.hidden ? 'hidden' : ''}  >
                        <Typography color="textSecondary" variant="body1" gutterBottom>
                            <span className="TitlePage">Usuários da OME</span>
                        </Typography>
                    </div>

                    <Grid item xs={12} container display='flex' justifyContent='flex-start'>
                        <CustomizedTables
                            columns={
                                this.handleRenderColumns()
                            }

                            licencasDispensasOme={licencasDispensasOme}
                            handleChangeRowsPerPage={this.handleRowsPerPage}
                            handleChangePaginacao={this.handleChangePaginacao}

                            rows={
                                resultSearch.content && resultSearch.content.length ?
                                    resultSearch.content.map((item) => {
                                        return this.handleRenderRow(item)
                                    }) : []

                            }

                        />

                    </Grid>
                    <Box m={1} >
                        <Button onClick={this.handleChangeLimpar} variant="outlined" color="primary">Limpar</Button>
                    </Box>


                </Grid>
                }
            </Container>
        );
    }
}



const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBackdrop
}, dispatch);
export default connect(null, mapDispatchToProps)(genrenciarGestores);

