import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  TableContainer,
  Tooltip,
  Typography,
} from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PhoneIcon from '@mui/icons-material/Phone';
import PrintIcon from '@mui/icons-material/Print';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import RedoIcon from '@mui/icons-material/Redo';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LoopIcon from '@mui/icons-material/Loop';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import './styles.css';
import { Component } from 'react';


function CustomTableHead(props) {
  const classes = useStyles();

  const { order, orderBy, onRequestSort, headers } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.header}>                  
      <TableRow>
        {headers.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index !== (headers.length - 1) ? 'left' : 'right'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {
              
              headCell.sortable 
              
              ? 

              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label.toUpperCase()}
                {orderBy === headCell.id && headCell.sortable ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>

              : 

              headCell.label.toUpperCase()
            
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

CustomTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '5px'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  header: {
    backgroundColor: '#e7e5e5',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    // props.onChangePage(event, page + 1);
    console.log(props)
    // this.props.changePage(page + 1, null);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

class CustomTable extends Component{
  constructor(props){
    super(props);
    this.state = {
      order: props.order || 'asc',
      orderBy: props.orderBy,
      dense: true,
      rows: props.rows,
    }
  }


  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({ order: isAsc ? 'desc' : 'asc', orderBy: property });
  }

  shouldComponentUpdate(nextProps, nextState){
    const currentRows = this.props.rows.map(row => row[this.props.headers[0].id]);
    const nextRows = nextProps.rows.map(row => row[nextProps.headers[0].id]);
    return (JSON.stringify(currentRows) !== JSON.stringify(nextRows)) || (this.state.orderBy !== nextState.orderBy) || (this.state.order !== nextState.order);
  }

  formatData = (headers, data) => {
    let format = []
    data.map((item) => {      
      let row = {}
      headers.map((header, index) => {
        row[header.id] = item[index]
      })
      format.push(row)
    });

    return format;
  }

  handleChangePage = (event, newPage) => {
    this.props.changePage(newPage, null);
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 20), page: 0 });
  }
  
  descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  }
  
  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  getIcon = (name, description) => {
    switch(name){
        case 'editar':
          return <Tooltip title={description} placement='top-start'><EditIcon/></Tooltip>;
        case 'cancelar':
          return <Tooltip title={description} placement='top-start'><HighlightOffIcon/></Tooltip>;
        case 'cancelar_final':
          return <Tooltip title={description} placement='top-start'><DeleteForeverIcon/></Tooltip>;
        case 'atender':
          return <Tooltip title={description} placement='top-start'><PhoneIcon/></Tooltip>;
        case 'retomar':
          return <Tooltip title={description} placement='top-start'><RedoIcon/></Tooltip>;
        case 'deletar':
          return <Tooltip title={description} placement='top-start'><DeleteIcon/></Tooltip>;
        case 'adicionar':
          return <Tooltip title={description} placement='top-start'><AddIcon/></Tooltip>;
        case 'chegada':
          return <Tooltip title={description} placement='top-start'><EmojiPeopleIcon/></Tooltip>;
        case 'saida':
          return <Tooltip title={description} placement='top-start'><HighlightOffIcon/></Tooltip>;
        case 'ativar':
          return <Tooltip title={description} placement='top-start'><ReplayIcon/></Tooltip>;
        case 'mais_detalhes':
          return <Tooltip title={description} placement='top-start'><SearchOutlinedIcon/></Tooltip>;
        case 'autorizar':
          return <Tooltip title={description} placement='top-start'><PlaylistAddCheckIcon/></Tooltip>;
        case 'imprimir':
          return <Tooltip title={description} placement='top-start'><PrintIcon/></Tooltip>;
        case 'revalidar':
          return <Tooltip title={description} placement='top-start'><LoopIcon/></Tooltip>;
        case 'detalhes_agenda':
          return <Tooltip title={description} placement='top-start'><ContentPasteSearchIcon/></Tooltip>;
        default:
          return '';
    }
  }

  render(){
    const { classes, rows, totalElements, rowsPerPage, pageNumber, headers } = this.props;

    return rows.length 
    ?
    <Grid item={true} sm={12} xs={12}>
      <Box component="div" my={1} overflow="auto">
        <div className={classes.root}>
        <TableContainer
          // component={Paper}
          style={{
            border: '0.3px solid #eeeeee',
            // borderRadius: '4px'
          }}
        >
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={this.state.dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <CustomTableHead
              order={this.state.order}
              orderBy={this.state.orderBy}
              headers={this.props.headers}
              onRequestSort={this.handleRequestSort}
              rowCount={this.props.totalRows}
            />                  
            <TableBody>
              
              {
              
              this.stableSort(this.formatData(headers, rows), this.getComparator(this.state.order, this.state.orderBy))
              .map((row, index) => {
              
                  const labelId = `enhanced-table-checkbox-${index}`;  
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      style ={ index % 2 ? { background : "#f1ededfd" }:{ background : "white" }}
                    >

                      <TableCell component="th" id={labelId} scope="row">
                        {row[headers[0].id]}
                      </TableCell>
                      {headers.map((item, index) => {
                        
                        return (
                          index !== 0 && index !== (headers.length - 1) 
                          ?
                            <TableCell align="left">{row[item.id]}</TableCell>
                          :
                            ''
                        )
                      })}

                      <TableCell align="left" style={{ whiteSpace: 'nowrap'}}>                        
                        {
                        row[headers[headers.length - 1].id].map((item) => {
                          const { action } = item;
                          return (
                            <span className={item.color}>
                              <IconButton onClick={() => action()} size="large">
                                  {this.getIcon(item.title, item.description)}
                              </IconButton>
                            </span>
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
                                
              </TableBody>
            </Table>
            </TableContainer>
        </div>
          <TablePagination
            rowsPerPageOptions={[rowsPerPage]}
            component="div"
            style={{backgroundColor: '#e7e5e5', width: '100%', borderTop: '2px solid #3388d6a8'}}
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={pageNumber}
            onPageChange={this.handleChangePage}
            ActionsComponent={TablePaginationActions}
            labelRowsPerPage="Registros por página"
            labelDisplayedRows={
              ({ from, to, count }) => {
                return '' + from + '-' + to + ' de ' + count
              }
            }
            />
      </Box>
    </Grid>
    :

    <Grid   
      container
      sm={12} xs={12}      
      style={{marginTop: '40px'}}            
      alignItems="center"
      justifyContent="center"
    >
      <Typography>Nenhum resultado encontrado!</Typography>
    </Grid>;
  }  
}

export default withStyles()(CustomTable);
