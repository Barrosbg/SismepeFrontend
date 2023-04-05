import { Button, Collapse, Fab, IconButton, Container, Card, CardContent, Box, TextField, CardHeader, Grid, svgIconClasses, PaginationItem, Switch } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import List from '@mui/material/List';
import CustomizedTables from '../../components/general/CustomizedTables'
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import { buscarTodasSolicitacoes } from "./action";
import { BuscarFichaPdf } from "./action";
import { BuscarNovaFichaPdf } from "./action";
import { BuscarMinhaFichaPdf } from "./action";
import 'moment/locale/pt'
import 'date-fns/locale/pt-BR'
import TablePagination from '@mui/material/TablePagination';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import ModalCadastroTransfusional from "./ModalAtualizacaoTransfusional";

// import { Link } from 'react-router-dom'

import { BrowserRouterasRouter, Redirect, useHistory } from 'react-router-dom';
// import routes from "../../routes";
// import { Link } from 'react-router-dom'
// import { Route } from "@mui/icons-material";
// import { useParams } from 'react-router-dom'

const CadastroSolicitacaoTransfusional = (props) => {

    const [listaSolicitacoes, setListaSolicitacoes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    let editHistory = useHistory();
    let novoHistory = useHistory();


    const [modalOpen, setModalOpen] = useState(false);
    const [idAtualizar, setIdAtualizar] = useState(null);

    useEffect(async () => {
        console.log(props)
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let solicitacoes = await buscarTodasSolicitacoes(currentPage, rowsPerPage)
        setListaSolicitacoes(solicitacoes)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }, [currentPage, rowsPerPage])

    function editarCadastroTrnasfusional(item){
        setIdAtualizar(item)
        setModalOpen(true);
    }
    function novoCadastroTrnasfusional(){
        setIdAtualizar(null)
        setModalOpen(true);
    }
    const handleEditCad = (id) => {
        setCadId(id)
    }
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    // const atualizar = (e) => {
    //     setIdAtualizar(e)
    // } 

    const closeFunction = (e) => {
        setModalOpen(e)
    }

    const handleFichaPdf = (item) => {
        BuscarFichaPdf(item)
    }

    const handlenovaFichaPdf = (item) => {
        BuscarNovaFichaPdf(item)
    }
    const handleminhaFichaPdf = (item) => {
        BuscarMinhaFichaPdf(4)
    }

    return(
        <Container>
            <Card>
                <Card>
                    <CardHeader
                    />
                    <CardContent>
                        <List dense="true">
                            <h2>Lista Transfusional</h2>
                            <CustomizedTables
                                columns={
                                    [
                                        { size: 2, value: 'Matrícula' },
                                        { size: 1, value: 'Corporação' },
                                        { size: 3, value: 'Nome Completo' },
                                        { size: 3, value: 'Nome Mãe' },
                                        { size: 1, value: 'Idade' },
                                        // { size: 1, value: 'Sexo' },
                                        { size: 1, value: 'Número RG' },
                                        { size: 1, value: 'Telefone' },
                                    ]}
                                    
                                handleRowsPerPage={''}
                                handleChangePaginacao={''}
                                pageDados={''}
                                rows={
                                listaSolicitacoes.content && listaSolicitacoes.content.length ?
                                listaSolicitacoes.content.map((item) => {
                                    return [
                                        { size: 2, value: item.matricula },
                                        { size: 1, value: item.cdPessoa.corporacao == 6 ? "PM": "BM" },
                                        { size: 3, value: item.cdPessoa.nome },
                                        { size: 3, value: item.cdPessoa.nomeMae },
                                        { size: 1, value: item.idade },
                                        // { size: 1, value: item.cdPessoa.sexo },
                                        { size: 1, value: item.cdPessoa.rg },
                                        { size: 1, value: item.cdPessoa.telefone != 0 ? item.cdPessoa.telefone : "" },
                                        // { size: 1, isAction: true, actions:[{ buttonColor: 'BgPrimary', icon: 'editar', event: () => { editarCadastroTrnasfusional(item.id)}},  { colorButton: 'BgGreen', icon: 'impressao1', event: () => {handleFichaPdf(item.id)} }]},
                                        { size: 1, isAction: true, actions:[{ buttonColor: 'BgPrimary', icon: 'editar', event: () => { editarCadastroTrnasfusional(item.id)}}, { colorButton: 'BgGreen', icon: 'impressao1', event: () => {handlenovaFichaPdf(item.id)} }]},
                                        // { isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'detalhes', event: () => { this.handleClickOpenDetalhes(item) } }, { colorButton: 'BgGreen', icon: 'impressao', event: () => { this.handleClickOpenDetalhes(item) } }] }
                                        // { isAction: true, actions: [ { colorButton: 'BgGreen', icon: 'impressao', event: () => { ""} }] }
                                        
                                        ]
                                    }) : []
                                }
                            />
                            <TablePagination
                                component="div"
                                count={listaSolicitacoes.totalElements}
                                page={currentPage}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[8, 12, 15]}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </List>
                        <Grid container spacing={1} margin="dense" >
                            <Grid item xs={11} md={11}>
                                <span className=" " >
                                <Tooltip title="Adicionar uma nova Solicitação Transfusional" placement="bottom-end">
                                    {/* <Fab size="small" style={{ position: "fixed", bottom: 25, right: 25, zIndex: 100 }} aria-label="add" onClick={()=>this.handleClickOpenCadastro()}> */}
                                    <Fab size="small" color="primary" style={{ position: "fixed", bottom: 25, right: 25, zIndex: 50 }} aria-label="add" onClick={novoCadastroTrnasfusional}>
                                    <AddIcon />
                                    </Fab>
                                </Tooltip>
                                </span>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Card>
            {modalOpen && <ModalCadastroTransfusional idAtualizar={idAtualizar} closeFunction={(e) => closeFunction(e)}/>}
        </Container>
    )
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CadastroSolicitacaoTransfusional)