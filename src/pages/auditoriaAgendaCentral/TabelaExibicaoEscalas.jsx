import * as React from 'react';
import { Collapse, Grid } from '@mui/material';
import Table from '../../components/table/table';
export default function TableEscala(props) {
    
    return (
        <Collapse in={props.exibirExame}>
            <Grid container >
                <Table
                    rowsPerPage={props.tablePagination.pageSize}
                    pageNumber={props.tablePagination.pageNumber}
                    totalElements={props.tablePagination.totalElements}
                    totalPages={props.tablePagination.totalPages}
                    ChangePage={(e) => handleChangePage(e)}
                    order="desc"
                    orderBy="data"
                    headers={[
                        // { id: 'id', numeric: false, disablePadding: false, sortable: true, label: 'Id' },
                        { id: 'Escala_id', numeric: false, disablePadding: false, sortable: true, label: 'Escala id' },
                        { id: 'especialidade', numeric: false, disablePadding: false, sortable: true, label: 'Especialidade' },
                        { id: 'prestador', numeric: false, disablePadding: false, sortable: true, label: 'Prestador' },
                        { id: 'Conselho', numeric: false, disablePadding: false, sortable: true, label: 'Número do Conselho' },
                        { id: 'acoes', numeric: false, disablePadding: false, sortable: false, label: 'Ações' },
                    ]}

                    rows={props.exames}
                />
            </Grid>
            {/* {modalOpen && <ModalDetalhesAgenda idPrestador={prestadorId} setModalOpen={modalOpen} closeFunction={(e) => closeFunction(e)} />} */}
        </Collapse>
    )


}