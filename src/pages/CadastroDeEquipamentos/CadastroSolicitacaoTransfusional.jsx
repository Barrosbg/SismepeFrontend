import { Button, Collapse, Fab, IconButton, Container, Card, CardContent, Box, TextField, CardHeader, Grid, svgIconClasses, PaginationItem } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import List from '@mui/material/List';
import CustomizedTables from '../../components/general/CustomizedTables'
import { bindActionCreators } from 'redux';
import { fetchBackdrop } from '../../actions/geral/actions';
import { buscarTodasSolicitacoes } from "./action";
import 'moment/locale/pt'
import 'date-fns/locale/pt-BR'
import TablePagination from '@mui/material/TablePagination';

import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';


const CadastroSolicitacaoTransfusional = (props) => {

    const [listaSolicitacoes, setListaSolicitacoes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    
    useEffect(async () => {
        console.log("effect")
        props.fetchBackdrop('BACKDROP_FETCHED', true);
        let solicitacoes = await buscarTodasSolicitacoes(currentPage, rowsPerPage)
        setListaSolicitacoes(solicitacoes)
        console.log(solicitacoes)
        props.fetchBackdrop('BACKDROP_FETCHED', false);
    }, [currentPage, rowsPerPage])

    const handleEditCad = (id) => {
        setCadId(id)
        setOpenModalAtualizar(true)
    }
    
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    return(
        <Container>
            <Card>
                <CardHeader
                    title="Lista Transfusional"
                />
                <CardContent>
                    <List dense="true">
                        <CustomizedTables
                            columns={
                                [
                                    { size: 1, value: 'Matrícula' },
                                    { size: 1, value: 'Corporação' },
                                    { size: 3, value: 'Nome Completo' },
                                    { size: 3, value: 'Nome Mãe' },
                                    { size: 1, value: 'Idade' },
                                    { size: 1, value: 'Sexo' },
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
                                    { size: 1, value: item.matricula },
                                    { size: 1, value: item.cdPessoa.corporacao == 6 ? "PM": "BM" },
                                    { size: 3, value: item.cdPessoa.nome },
                                    { size: 3, value: item.cdPessoa.nomeMae },
                                    { size: 1, value: item.idade },
                                    { size: 1, value: item.cdPessoa.sexo },
                                    { size: 1, value: item.cdPessoa.rg },
                                    { size: 1, value: item.cdPessoa.telefone != 0 ? item.cdPessoa.telefone : "" },
                                    // { size: 1, isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'editar', event: () => { handleEditCad(item.id) } }, { colorButton: 'BgPrimary', icon: 'deletar', event: () => {handleIdCadcancelamento(item.id) } }] },
                                    // { size: 1, isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'editar', event: () => { '' } }, { colorButton: 'BgPrimary', icon: 'deletar', event: () => {''} }] },
                                    { size: 1, isAction: true, actions: [{ buttonColor: 'BgPrimary', icon: 'editar', event: () => { handleEditCad(item.id) } }] },
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
                            rowsPerPageOptions={[2, 3, 4]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </List>
                    <Grid container spacing={1} margin="dense" >
                         <Grid item xs={11} md={11}>
                            <span className=" " >
                            <Tooltip title="Adicionar uma nova Solicitação Transfusional" placement="bottom-end">
                                {/* <Fab size="small" style={{ position: "fixed", bottom: 25, right: 25, zIndex: 100 }} aria-label="add" onClick={()=>this.handleClickOpenCadastro()}> */}
                                <Fab size="small" color="primary" style={{ position: "initial", bottom: 25, right: 25, zIndex: 50 }} aria-label="add" onClick={''}>
                                <AddIcon />
                                </Fab>
                                </Tooltip>
                            </span>
                         </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}

const mapStateToProps = state => ({ usuario: state.usuario, })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CadastroSolicitacaoTransfusional)