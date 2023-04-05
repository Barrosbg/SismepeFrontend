import React, { Component, useState } from 'react'
import Container from '@mui/material/Container';
import TextFieldAutocomplete from '../../../../components/general/autocomplete'
import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { listaOme } from '../../../../actions/jms/actions'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { ListarParecer } from '../../../../actions/jms/actions'
import { listarRelatoriosPorOmePdf } from '../../../../actions/jms/actions'
import { listarRelatoriosPorOme } from '../../../../actions/jms/actions'
import "./style.css";
import moment from 'moment'
import { Controller, useForm } from "react-hook-form";
import DateInput from '../../../../components/general/dateInput';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import CollapsibleTable from "../../../../components/general/tabelaMinimizavel"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
<link rel="stylesheet" type="text/css" href="print.css"></link>



const genrenciarGestores = (props) => {

    const [batalhao, setBatalhao] = useState(null);
    const [parecer, setParecer] = useState(null);
    const [qtdDias, setQtdDias] = useState(0);
    const [licencasDispensasOme, setLicencasDispensasOme] = useState([]);
    const [isOpenModalListarLicencas, setisOpenModalListarLicencas] = useState(false);
    const [page, setPage] = useState(0);
    const [linesPerPage, setLinesPerPage] = useState(0);
    const [dateFromIni, setDateFromIni] = useState(null);
    const [dateFromFim, setDateFromFim] = useState(new Date());
    const [dataIni, setDataIni] = useState(null);
    const [dataFim, setDataFim] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [qtdDiasError, setQtdDiasError] = useState(false);
    const [dataIniError, setDataIniError] = useState(false);
    const [dataFimError, setDtaFimError] = useState(false);
    const [parecerError, setParecerError] = useState(null);
    const [habilitaImpressao, setHabilitaImpressao] = useState(false)
    const [hidden, setHidden] = useState(true);

    const ChangeBatalhao = (batalhao, event) => {
        setBatalhao(batalhao == null ? '' : batalhao)
    }
    const changeParecer = (parecer, event) => {
        setParecer(parecer)
        console.log(parecer)
    }
    const changeDias = (dias) => {
        if (dias <= 0) {
            toast.warning("Forneça uma quantidade de dias maior que Zero")
        } else {
            setQtdDias(dias.target.value)
            setQtdDiasError(false)
        }
    }

    const handleClickImpirmir = async () => {
        console.log(batalhao, parecer, dataIni, dataFim, qtdDias)
        const ome = batalhao === null ? '' : batalhao.id
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        await listarRelatoriosPorOmePdf({ ome, parecer, dataIni, dataFim, qtdDias });
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    const handleDateInicial = (dateIni) => {
        var moment = require('moment');
        const date = moment(dateIni).format('YYYY-MM-DD')
        setDateFromIni(date)
        setDataIni(date)
        setDataIniError(false)
    }
    const handleDateFim = (dataFim) => {
        var moment = require('moment');
        const date = moment(dataFim).format('YYYY-MM-DD')
        setDateFromFim(date)
        setDataFim(date)
    }
    const handleChangePaginacao = async (event, page) => {
        console.log(page)
        let relatorioLicencas = await listarRelatoriosPorOme({ batalhao, parecer, dataIni, dataFim, qtdDias,page , linesPerPage})
        setLicencasDispensasOme(relatorioLicencas)
        setPage(page)

    }

    const handleRowsPerPage = async (event) => {

        let linesPerPage = event.target.value
        console.log(linesPerPage)
        let relatorioLicencas = await listarRelatoriosPorOme({batalhao, parecer, dataIni, dataFim, qtdDias, linesPerPage })
        setLicencasDispensasOme(relatorioLicencas)
        setPage(page)
        setLinesPerPage(linesPerPage)

    }



    const handleChange = async (e) => {



        if (parecer == null ) {
            toast.error("Forneça um parecer.")
            setParecerError(true)
        } else  if (qtdDias == 0) {
            toast.error("Forneça um intervalo de dias.")
            setQtdDiasError(true)
        } else  if (dataIni == null) {
            toast.error("Data inicial pracisa ser informada.")
            setDataIniError(true)
        } else if (!parecerError && !qtdDiasError && !dataIniError ) {
            console.log("Tudo válido")
            props.fetchBackdrop('BACKDROP_FETCHED', true);
            let relatorioLicencas = await listarRelatoriosPorOme({ batalhao, parecer, dataIni, dataFim, qtdDias})
            setLicencasDispensasOme(relatorioLicencas)
            setHabilitaImpressao(true)
            setHidden(false)
            props.fetchBackdrop('BACKDROP_FETCHED', false);
        }



    }
    const { error, handleSubmit, pristine, reset, submitting } = props
    
    return (

        <Container>


            <div className="Spacer"></div>
            <Card container spacing={2} display="flex" alignItems="center">
                <CardHeader
                    title="Relatório Licenças / Dispensas por OME"
                />
                <CardContent>


                    <form >
                        <Grid container spacing={1} display="flex">
                            <Grid item md={6} xs={5}>
                                <TextFieldAutocomplete id="Ome" label="Ome" actionFilter={listaOme}  actionChangeOption={ChangeBatalhao} getOptionLabel={(option) => option.descricao} />
                            </Grid>
                            <Grid item md={6} xs={5}>
                                <TextFieldAutocomplete label="Parecer" name="parecer" actionFilter={ListarParecer} actionChangeOption={changeParecer} getOptionLabel={(option) => option.parecer} filterOptions={(options, object) => options.filter((item) => item.parecer.toUpperCase().includes(object.inputValue.toString().toUpperCase()))} error={parecerError} />
                            </Grid>
                            <Grid item md={2} xs={10 } sm={4}  mt={1}>
                                <TextField size="small"  id="outlined-basic" label="Qtd Dias" fullWidth variant="outlined" onChange={changeDias} margin="dense" error={qtdDiasError} />
                            </Grid>

                            <Grid item xs={12} sm={2} mt={2} >
                                <DateInput label="De" fullWidth value={dateFromIni} handleDateChange={handleDateInicial} error={dataIniError} />
                            </Grid>
                            <Grid item xs={12} sm={2} mt={2}>
                                <DateInput label="Até" fullWidth value={dateFromFim} handleDateChange={handleDateFim} error={dataFimError} />
                            </Grid>

                            <Grid item md={habilitaImpressao ? 3 : 6} display="flex" alignItems="center" xs={10} >
                                {/* <Input type="submit" ariant="contained" color="primary" fullWidth value="buscar"/> */}
                                <Button variant="contained" color="primary" fullWidth onClick={handleChange}  >Buscar</Button>
                            </Grid>
                            {habilitaImpressao ?    <Grid item md={3} display="flex" alignItems="center" className="ButtonPrimary" target={"_blank"}>
                                <Button variant="contained" color="primary" fullWidth onClick={handleClickImpirmir} target={"_blank"}>Imprimir</Button>
                            </Grid> : ''}
                        </Grid>
                    </form>



                </CardContent>
            </Card >


            <Grid container xs={12} >

                <div className="Spacer"></div>
                <div className={hidden ? 'hidden' : ''}  >
                    <Typography color="textSecondary" variant="body1" gutterBottom>
                        <span className="TitlePage">Usuários da OME</span>
                    </Typography>
                </div>

                <Grid item xs={12} className={hidden ? 'hidden' : ''} >
                    <CollapsibleTable
                        rowsHeader={
                            [
                                { id: "matricula", value: 'Matricula' },
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
                        handleChangeRowsPerPage={handleRowsPerPage}
                        handleChangePaginacao={handleChangePaginacao}

                        rowsBody={

                            licencasDispensasOme && licencasDispensasOme.content ?
                                licencasDispensasOme.content.map((item) => {

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

    )
}




const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBackdrop
}, dispatch);
export default connect(null, mapDispatchToProps)(genrenciarGestores);

