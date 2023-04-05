import React, {memo} from "react";
import {
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography,
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

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

const areEqual = (prevProps, nextProps) => {
    return JSON.stringify(prevProps.rows) === JSON.stringify(nextProps.rows);
}

function CustomList(props) {

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
                return <Tooltip title="Imprimir" placement='top-start'><LocalPrintshopIcon /></Tooltip>;
            case 'remover':
                return <Tooltip title="Remover Permissão" placement='top-start'><ClearIcon /></Tooltip>;
            case 'relatorios':
                return <Tooltip title="Relatórios" placement='top-start'><AssessmentIcon /></Tooltip>;
            default:
                return '';
        }
    }

    const showHeaderDesktop = () => {
        return props.columns && props.columns.length
            ?
            <span className="liWithoutPadding">
                <ListItem >
                    {
                        props.columns.map((item, index) => {
                            return <Grid item={true} sm={item.size} xs={item.size} style={{paddingLeft:'10px'}}>
                                <Typography color="textSecondary" variant="body1" style={{textAlign: item.align || 'left'}}
                                    gutterBottom>
                                        <span className="TitleHeaderTable" style={{
                                            fontSize: '6px !important'
                                        }}>{item.value}</span>
                                        </Typography>
                            </Grid>
                        })
                    }
                </ListItem>
                <Divider />
            </span>
            :
            ""
    }


    const showBodyDesktop = () => {
        return props.rows && props.rows.length
        ?
        <div>
            {props.rows.map((item, index) => {

                return (
                    <span className="liWithoutPadding">
                        <ListItem style={{
                            backgroundColor: props.noAlternateStyle ? '#fff' : (index % 2 == 0) ? "#fff" : "#f2f2f2",
                            color: "#808080",
                            fontSize: `${props.fontSizeBody} !important` ? props.fontSizeBody : 'default'
                        }}>
                            {
                                item && item.length
                                    ?
                                    item.map((itemRow, indexRow) => {
                                        {
                                            return itemRow.isAction
                                                ?
                                                <Grid item={true} sm={props.size || 1} xs={props.size || 1} style={{paddingLeft:'10px'}}>
                                                    <ListItemSecondaryAction style={{textAlign: item.align || 'left'}}>
                                                        {
                                                            itemRow.actions.map((action, index) => {

                                                                // Tipo de cor: BgRed,BgPrimary, BgGreen
                                                                return (
                                                                    <span className={action.colorButton}>
                                                                        <IconButton onClick={action.event} aria-label="add to favorites" size="large">
                                                                            {getIcon(action.icon)}
                                                                        </IconButton>
                                                                    </span>
                                                                );
                                                            })
                                                        }
                                                    </ListItemSecondaryAction>
                                                </Grid>


                                                :
                                                <Grid item={true} sm={itemRow.size} xs={itemRow.size} style={{paddingLeft:'10px'}}>
                                                    <ListItemText primary={itemRow.value} />
                                                </Grid>;
                                        }
                                    })
                                    :
                                    ""
                            }
                        </ListItem>
                        <Divider />
                    </span>
                );
            })}

        </div>
        :
        "";
    }

    const showListMobile = () => {
        return props.rows && props.rows.length
        ?
        <div>
            <Divider />
            {props.rows.map((item, index) => {

                return (
                    <span className="liWithoutPadding">
                        <ListItem style={{
                            backgroundColor: props.noAlternateStyle ? '#fff' : (index % 2 == 0) ? "#fff" : "#f2f2f2",
                            color: "#808080",
                            fontSize: `${props.fontSizeBody} !important` ? props.fontSizeBody : 'default'
                        }}>
                            <Grid container>
                                {
                                    item && item.length
                                        ?
                                        item.map((itemRow, indexRow) => {
                                            {
                                                return itemRow.isAction
                                                    ?
                                                        <Grid item={true} xs={12} sm={12}>
                                                            <Grid container>
                                                                <Grid item={true} xs={9} sm={9}></Grid>
                                                                <Grid item={true} sm={3} xs={3} style={{paddingLeft:'10px'}}>
                                                                    <ListItemSecondaryAction style={{textAlign: item.align || 'left'}}>
                                                                        {
                                                                            itemRow.actions.map((action, index) => {
                                                                                // Tipo de cor: BgRed,BgPrimary, BgGreen
                                                                                return (
                                                                                    <span className={action.colorButton}>
                                                                                        <IconButton onClick={action.event} size="large">
                                                                                            {getIcon(action.icon)}
                                                                                        </IconButton>
                                                                                    </span>
                                                                                );
                                                                            })
                                                                        }
                                                                    </ListItemSecondaryAction>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>


                                                    :
                                                    <Grid item={true} sm={12} xs={12} style={{paddingLeft:'10px'}}>
                                                        <Typography color="textSecondary" variant="body1" gutterBottom>
                                                            <span className="TitleHeaderTable" style={{
                                                                fontSize: '6px !important'
                                                            }}>{props.columns[indexRow].value}: </span> {itemRow.value}
                                                        </Typography>
                                                    </Grid>;
                                            }
                                        })
                                        :
                                        ""                                    
                                }
                            </Grid>
                        </ListItem>
                        <Divider />
                    </span>
                );
            })}

        </div>
        :
        "";        
    }

    return (
        <Grid container spacing={1}>
            <div className="Spacer"></div>
            <Grid item={true} sm={12} xs={12}>
                <div>
                    <List dense="true">
                        {/* QUANDO O TAMANHO DE TELA FOR MD OU MAIOR */}
                        { props.width === 'md' ? showHeaderDesktop() : null }
                        { props.width === 'md' ? showBodyDesktop() : null }

                        {/* QUANDO O TAMANHO DE TELA FOR XS OU SM */}
                        { props.width === 'xs' || props.width === 'sm' ? showListMobile() : null }
                    </List>

                </div>
            </Grid>
            {
                props.showPagination && props.pageCount > 1 ?
                    <Grid container display="flex" justifyContent="center" alignItems="center">
                        <Pagination count={props.pageCount} page={props.page} onChange={props.handlePage} color="primary" />
                    </Grid>
                    :
                    ""
            }

        </Grid>
    );
}

export default withWidth()(memo(CustomList, areEqual));