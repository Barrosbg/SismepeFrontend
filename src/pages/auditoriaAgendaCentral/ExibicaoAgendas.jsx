import { Component, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button, Divider, Fab, Grid, IconButton, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DetalhesAgenda from './ModalDetalhesAgenda';
import Paper from '@mui/material/Paper';
import withStyles from '@mui/styles/withStyles';
import { Collapse, CardContent, Card, CardHeader, Tooltip } from '@mui/material';
import { fetchBackdrop } from '../../actions/geral/actions';
import  {buscarUsuario}  from './action.js';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import moment from 'moment'
import 'date-fns/locale/pt-BR'
import 'moment/locale/pt-br'  // without this line it didn't work

moment.locale('pt')
function getSteps() {
  return [{ id: 1, valor: "fezExameDeSangueNosUltimos6meses", descricao: 'FEZ EXAMES DE SANGUE NOS ÚLTIMOS 6 MESES?' }, { id: 2, valor: "fazUsoDeMedicacaoContinua", descricao: 'FAZ USO DE ALGUMA MEDICAÇÃO CONÍNUA? ' }, { id: 3, valor: "fezAlgumaCirurgiaNosUltimos12meses", descricao: 'FEZ ALGUMA CIRURGIA NOS ÚLTIMOS 12 MESES?' }, { id: 4, valor: "esteveInternadoNosUltimos12meses", descricao: 'ESTEVE INTERNADO NOS ÚLTIMOS 12 MESES?' }, { id: 5, valor: "fezExameDoCoracaoNosUltimos12meses", descricao: 'FEZ ALGUM EXAME DO CORAÇÃO NOS ÚLTIMOS 12 MESES?' }, { id: 6, valor: "possuiLicencaOudispensaAtualmente", descricao: 'ESTÁ NO MOMENTO DE LICENÇA OU DISPENSA?' }, { id: 7, valor: "possuiOutroProblemaDeSaude", descricao: 'TEM ALGUM OUTRO PROBLEMA DE SAÚDE?' }, { id: 8, valor: "praticaAtividadeFisica", descricao: 'PRATICA ALGUMA ATIVIDADE FÍSICA REGULAR?' }];
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3c8dbc",
    color: "#fff",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);



const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);




const TabAgenda = (props) => {

  const [ModalOpen, setModalOpen] = useState(false)
  const [agenda, setAgenda] = useState([])
  const [usuario, setUsuario] = useState([])
  

  const handleOpenDetalhes = async (detalhes) => {
    
    props.fetchBackdrop('BACKDROP_FETCHED', true) ;
    let usuario = await buscarUsuario(detalhes?.cdUsuarioAlteracao)
    setAgenda(detalhes)
    setUsuario(usuario)
    setModalOpen(true)
    console.log(detalhes)
    props.fetchBackdrop('BACKDROP_FETCHED', false);
  }

  const closeFunction = (e) => {
    setModalOpen(e)
    
    // handleChangePage(paciente)

  }


  return (
    <Container >


      {/* <Card>
        <CardHeader
          title=" Ficha de Inspeção de Saúde - JMS"
        />
        <CardContent display="flex"  > */}

      <Grid container spacing={2} >


        <Grid item={true} md={12} className="cardlista" >

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id Ag</StyledTableCell>
                  <StyledTableCell align="center">Prestador</StyledTableCell>
                  <StyledTableCell align="center">Especialidade</StyledTableCell>
                  <StyledTableCell align="center">SubEspecialidade</StyledTableCell>
                  <StyledTableCell align="center">Und Atendi</StyledTableCell>
                  <StyledTableCell align="center">Dt Agenda</StyledTableCell>
                  <StyledTableCell align="center">Encaixe</StyledTableCell>
                  <StyledTableCell align="center">Ag Volta</StyledTableCell>
                  <StyledTableCell align="center">Ag Recep</StyledTableCell>
                  <StyledTableCell align="center">Detalhes</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>

                {props.agendas?.data?.content?.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.prestador?.nome}</StyledTableCell>
                    <StyledTableCell align="center">{row.especialidade?.descricao}</StyledTableCell>
                    <StyledTableCell align="center">{row.subespecialidade?.descricao}</StyledTableCell>
                    <StyledTableCell align="center">{row.cdUnidadeAtendimento}</StyledTableCell>
                    <StyledTableCell align="center">{row.dataAgendamento}</StyledTableCell>
                    <StyledTableCell align="center">{row.permiteEncaixe === 'S' ? "SIM" : "NÃO"}</StyledTableCell>
                    <StyledTableCell align="center">{row.permiteAgendamentoVolta === 'S' ? "SIM" : "NÃO"}</StyledTableCell>
                    <StyledTableCell align="center">{row.permiteAgendamentoRecepcao === 'S' ? "SIM" : "NÃO"}</StyledTableCell>
                    <StyledTableCell align="center"><Button onClick={() => handleOpenDetalhes(row)} variant="contained" color="secondary"><AssignmentOutlinedIcon /></Button></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>



        </Grid>

        {ModalOpen && <DetalhesAgenda agenda={agenda} usuario={usuario} setModalOpen={ModalOpen} closeFunction={(e) => closeFunction(e)} />}


      </Grid>

      {/* </CardContent>
      </Card> */}



    </Container >
  )
}



const mapStateToProps = state => ({ open: state.modal.open, usuario: state.usuario, modal: state.modal })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchBackdrop }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TabAgenda)