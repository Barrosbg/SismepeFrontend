import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});





function Row(props) {
    const { row, tableRowBody } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {row[1].map((item) => (
                    <TableCell align="right">{item.value}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detalhes
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {
                                            tableRowBody.map((item) => (
                                                <TableCell component="th" scope="row">{item.value}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        {row[0].map((item) => (
                                            <TableCell >
                                                {item.value}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function CollapsibleTable(props) {
    const { rowsHeader, tableRowBody, rowsBody ,licencasDispensasOme,handleChangePaginacao,handleChangeRowsPerPage,size} = props
    let licencas = licencasDispensasOme === undefined ? '' : licencasDispensasOme
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table" size={'small'}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {rowsHeader.map((item) => (
                            
                            <TableCell align="right">{item.value}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsBody.map((row) => (
                         console.log(row),
                        <Row key={row.value} row={row} tableRowBody={tableRowBody} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25,50]}
                component="div"
                count={licencas.totalElements}
                rowsPerPage={licencas.size}
                page={licencas.number}
                onPageChange={handleChangePaginacao}
                labelRowsPerPage="Registros por página"
                onRowsPerPageChange={handleChangeRowsPerPage}
                
                labelDisplayedRows={
                    ({ from, to, count }) => {
                        return '' + from + '-' + to + ' de ' + count
                    }
                }
            />
        </TableContainer>
    );
}































// import React from 'react';
// import { makeStyles } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { Component } from 'react';
// // import "../../pages/jms/index.css"


//     const useRowStyles = () => makeStyles({
//         root: {
//             '& > *': {
//                 borderBottom: 'unset',
//             },
//         },
//     });



//    const Row = (props)=>{


//     }




//     // const  handleChangePage = (event, newPage,rowsPerPageOptions) => {
//     //     props.handleChangePaginacao(newPage, rowsPerPageOptions);
//     // }
//     const CollapsibleTable = (props)=>{
//             const { rowsHeader, rowsBody, tableRowHeader,rowsPerPage ,totalElements,pageNumber,onChange,licencasDispensasOme} = props
//             const { row, tableHeader } = props;
//             const [open, setOpen] = React.useState(false);
//             const classes = useRowStyles();
//             return (
//                 <TableContainer component={Paper}>
//                     <Table aria-label="collapsible table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell />
//                                 {rowsHeader.map((item) => (

//                                     <TableCell align="center" >{item.value}</TableCell>
//                                 ))}

//                             </TableRow>
//                         </TableHead>

//                         <TableBody>
//                             {rowsBody.map((row,index) => (

//                                   <React.Fragment>
//                                   <TableRow className={classes.root}>
//                                       <TableCell >
//                                           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//                                               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                                           </IconButton>
//                                       </TableCell>
//                                       {row[1].map((item) => (
//                                               <>
//                                                   <TableCell align="center" >{item.value}</TableCell>  
//                                               </>
//                                       ))}

//                                   </TableRow>
//                                   <TableRow>
//                                       <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                                           <Collapse in={open} timeout="auto" unmountOnExit>
//                                               <Box margin={1} >
//                                                   <Typography variant="h6" gutterBottom component="div">
//                                                       Detalhes
//                                                   </Typography>
//                                                   <Table aria-label="purchases">
//                                                       <TableHead>
//                                                           <TableRow key={index} >
//                                                               {tableRowHeader.map((rowHeade) => (

//                                                                   <TableCell>{rowHeade.value}</TableCell>
//                                                               ))}
//                                                           </TableRow>
//                                                       </TableHead>
//                                                       <TableBody>
//                                                           <TableRow >

//                                                               {row[0].map((item,index) => (
//                                                                   console.log(item,index),
//                                                                   <>

//                                                                       <TableCell key={index} component="th" scope="row">{item.value}</TableCell>

//                                                                   </>
//                                                               ))}
//                                                           </TableRow>
//                                                       </TableBody>
//                                                   </Table>
//                                               </Box>
//                                           </Collapse>
//                                       </TableCell>
//                                   </TableRow>
//                               </React.Fragment>
//                             ))}
//                         </TableBody>

//                     </Table>
//                     <TablePagination
//                     rowsPerPageOptions={[10, 25, 100]}
//                     component="div"
//                     count={totalElements}
//                     rowsPerPage={rowsPerPage}
//                     page={pageNumber}
//                     onChangePage={""}
//                     labelRowsPerPage="Registros por página"
//                     labelDisplayedRows={
//                       ({ from, to, count }) => {
//                         return '' + from + '-' + to + ' de ' + count
//                       }
//                     }
//                   />
//                 </TableContainer>
//             );
//         }
// export default  CollapsibleTable