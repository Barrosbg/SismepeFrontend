import React from 'react';
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText, Tooltip,
  Typography
} from "@mui/material";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from '@mui/icons-material/Clear';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { Pagination } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
// import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fff",
    color: theme.palette.common.black,
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

const getIcon = (name) => {
  switch (name) {
    case 'editar':
      return <Tooltip title="Editar" placement='top-start'><EditIcon /></Tooltip>;
    case 'cancelar':
      return <Tooltip title="Cancelar" placement='top-start'><CancelIcon /></Tooltip>;
    case 'atender':
      return <Tooltip title="Atender" placement='top-start'><PlaylistAddCheckIcon /></Tooltip>;
    case 'deletar':
      return <Tooltip title="Excluir" placement='top-start'><DeleteIcon /></Tooltip>;
    case 'adicionar':
      return <Tooltip title="Adicionar" placement='top-start'><AddIcon /></Tooltip>;
    case 'detalhes':
      return <Tooltip title="Mais Detalhes" placement='top-start'><AspectRatioIcon /></Tooltip>;
    case 'impressao':
      return <Tooltip title="Imprimir Licença" placement='top-start'><LocalPrintshopIcon /></Tooltip>;
    case 'impressao1':
      return <Tooltip title="Imprimir ficha transfusional" placement='top-start'><LocalPrintshopIcon /></Tooltip>;  
    case 'exit':
      return <Tooltip title="Liberar Vaga" placement='top-start'><ExitToAppIcon /></Tooltip>;
    case 'remover':
      return <Tooltip title="Remover Permissão" placement='top-start'><DeleteIcon /></Tooltip>;
    case 'relatorios':
      return <Tooltip title="Relatórios" placement='top-start'><AssessmentIcon /></Tooltip>;
    default:
      return '';
  }
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const { columns, rows,handleChangePaginacao ,pageDados,handleRowsPerPage} = props

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              columns && columns.length ?
                columns.map((item) => (
                  <StyledTableCell>{item.value}</StyledTableCell>
                )) : ''

            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows && rows.length ?
              rows.map((rowItem) => (
                <StyledTableRow key={rowItem.value}>
                  {
                    rowItem && rowItem.length ?
                      rowItem.map((item) => {
                        return item.isAction ?
                          <Grid>
                            {item.actions.map((item) => {
                              return (
                                <span className={item.buttonColor} margin="dense">
                                  <IconButton onClick={item.event} aria-label="add to favorites" size="large">
                                    {getIcon(item.icon)}
                                  </IconButton>
                                </span>
                              );
                            })}
                          </Grid>
                          :
                          <StyledTableCell component="th" scope="row">
                            {item.value}
                          </StyledTableCell>;
                      }) : ''
                  }
                </StyledTableRow>
              )) : ''
          }
        </TableBody>
      </Table>
      <Collapse in={pageDados.totalElements  ? true : false}>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pageDados ? pageDados.totalElements : ''}
        rowsPerPage={pageDados ? pageDados.size : ''}
        page={pageDados? pageDados.number : ''}
        onPageChange={handleChangePaginacao}
        labelRowsPerPage="Registros por página"
        onRowsPerPageChange={handleRowsPerPage}
        labelDisplayedRows={
          ({ from, to, count }) => {
              return '' + from + '-' + to + ' de ' + count
          }
      }
      />
      </Collapse>
    </TableContainer>
  );
}
