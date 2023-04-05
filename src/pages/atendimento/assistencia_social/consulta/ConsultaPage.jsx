import React, { Component } from 'react';
import Container from '@mui/material/Container';
import {
    Button,
    Checkbox,
    Collapse,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    TextField,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './../index.css';
import Table from '../../../../components/table/table';
import DateInput from '../../../../components/general/dateInput';
import SearchIcon from '@mui/icons-material/Search';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal, changeModal, resetConfirmModal } from '../../../../actions/geral/actions';
import TextFieldAutocomplete from '../../../../components/general/autocomplete';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import {
    assistenciaSocialListarPorPaciente,
    atualizarAgendamento,
    atualizarAtendimento,
    filtrarPaciente,
    listarAtendimentos,
} from '../../../../actions/atendimento/assistencia_social/actions';
import { formatarListaAtendimentos } from '../../../../services/listFormat';
import { formatDate } from '../../../../services/general';
import {toast} from "react-toastify";
import { dataServidor, usuarioLogado } from '../../../../actions/configuracao/actions';


const INITIAL_STATE = {
    agendamento: '',
    situacao:['1'],
    date: new Date(),
    dataAtual: null,
    modalCadastroOpen: false,
    modalEditarOpen: false,
    filterExpanded: true,
    paciente: null,
    especialidade: 125,
    event: '',
    cancelOption: null,
    itAtendimento: 0,
    atendimentos: {
        data: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 0,
        first: false,
        last: false,
    }
};


class ConsultaPage extends Component {

    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
    }

    async componentDidMount() {
        document.title = "Assistência Social - Consultas";
        let usuario = await usuarioLogado();
        if(usuario && usuario.prestador){
            this.props.fetchBackdrop('BACKDROP_FETCHED', true);
            this.setState(INITIAL_STATE);
            let data = await dataServidor();
            this.setState({date: data, dataAtual: data});
            let response = await listarAtendimentos(formatDate(data), this.state.agendamento, this.props.usuario.prestador, null);
            if(response && !response.empty){
                let atendimentos = this.state.atendimentos;
                atendimentos.data = response.content;
                atendimentos.totalElements = response.totalElements;
                atendimentos.totalPages = response.totalPages;
                atendimentos.pageNumber = response.pageable.pageNumber;
                atendimentos.pageSize = response.pageable.pageSize;
                this.setState({ atendimentos: atendimentos });
            } else {
                let atendimentos = this.state.atendimentos;
                atendimentos.data = [];
                this.setState({ atendimentos: atendimentos });
            }
            this.props.fetchBackdrop('BACKDROP_FETCHED', false);
        } else {
            this.props.history.goBack();
            toast.error('Essa funcionalidade só está disponível para prestadores!');
        }
    }

    handleDate = (date) => {
        this.setState({ date: date });
    }

    changePaciente = (paciente) => {
        this.setState({paciente : paciente})
    }

    openModalCadastro = () => {
        this.setState({ modalCadastroOpen: true });
    }

    openModalEditar = () => {
        this.setState({ modalEditarOpen: true });
    }

    closeModalEditar = () => {
        this.setState({ modalEditarOpen: false });
    }

    editar = (val) => {
        this.setState({ event: `editar`, itAtendimento: val })
        this.props.changeModal(
            'Editar Atendimento',
            `Deseja realmente editar o atendimento nº ${val.idAtendimento} ?`,
            'sm',
            'SIM',
            'NÃO'
        );
        this.props.openModal();
    }

    cancelar = async (val, status) => {
        
        let title = "";
        let description = "";
    
            
        if(status === 1){
            title = 'Cancelar Atendimento';
            description = `Deseja realmente cancelar o atendimento nº ${val.atendimentoId}?`;                
        }
    
        if(status === 2){
            title = 'Reativar Atendimento';
            description = `Deseja realmente reativar o atendimento?`;
        }
    
        if(status === 3){
            title = 'Cancelar Chegada do Paciente';
            description = `Deseja realmente cancelar a chegada do paciente?`;
        }
    
        this.setState({ event: `cancelar`, itAtendimento: val, cancelOption: status });
        this.props.changeModal(
            title,
            description,
            'sm',
            'SIM',
            'NÃO'
        );
        this.props.openModal();
    }

    atender = (val) => {
        this.setState({ event: `atender`, itAtendimento: val })
        this.props.changeModal(
            'Realizar Atendimento',
            `Deseja realmente iniciar o atendimento?`,
            'sm',
            'SIM',
            'NÃO'
        );
        this.props.openModal();
    }

    handleActionModal = async () => {
        switch(this.state.event){
            case 'editar':
                this.props.resetConfirmModal();
                this.openModalEditar();
                break;
            case 'cancelar':
                this.props.fetchBackdrop('BACKDROP_FETCHED', true);

                let response;

                if(this.state.cancelOption === 2){
                    response = await atualizarAtendimento({id: this.state.itAtendimento.atendimentoId, situacao: this.state.cancelOption});
                } else {
                    response = await atualizarAgendamento(this.state.itAtendimento.id, null, null, this.state.cancelOption);
                    response = response.status === 204;
                }

                if(response){
                    let action = this.state.cancelOption !== 3 ? this.state.cancelOption === 1 ? 'Atendimento cancelado!' : 'Atendimento reativado!'  : 'Chegada do paciente cancelada!';
                    this.pesquisarAtendimento(0, 20, 'ASC');
                    toast.success(action);
                } else {
                    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                    toast.error(response.message)
                }
                
                this.props.resetConfirmModal();
                break;
            case 'atender':
                this.props.fetchBackdrop('BACKDROP_FETCHED', true);
                this.props.history.push(`/atendimento/assistencia-social/consulta/${this.state.itAtendimento.id}`);
                this.props.resetConfirmModal();
                break;
        }
    }

    onChange = (e) => {
        if (e.target.name === 'paciente') {
            this.setState({ paciente: e.target.value });
        } else if (e.target.name === 'agendamento') {
            this.setState({ agendamento: e.target.value });
        } else if (e.target.name === 'matricula') {
            this.setState({ matricula: e.target.value });
        } else if (e.target.name === 'dateFrom') {
            this.setState({ dateFrom: e.target.value });
        } else if (e.target.name === 'dateTo') {
            this.setState({ dateTo: e.target.value });
        }
    }

    changeSituacao = (e) => {
        const index = this.state.situacao.findIndex(element => element == e.target.value);
        let situacao = this.state.situacao;
        if (index != -1) {
            situacao.splice(index, 1);
        } else {
            situacao.push(e.target.value)
        }

        this.setState({
            situacao: situacao
        })
    }

    buscarAssistenciasSociais = async (pacienteId, page, linesPerPage) => {
        let assistencias = await assistenciaSocialListarPorPaciente(pacienteId, page, linesPerPage);
        return assistencias;
    }

    formIsValid = () => {
        const {date, situacao} = this.state;
        let valid = true;
        
        if(!date){
            toast.warn('É necessário inserir uma data para fazer a busca!');
            valid = false;
        }

        if (valid && !situacao.length){
            toast.warning('Selecione pelo menos um tipo de situação para filtrar os atendimentos!');
            valid = false;
        }

        return valid;
        
    }

    pesquisarAtendimento = async (page, linesPerPage, direction) => {
        const {agendamento, date, paciente, situacao} = this.state;
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);
        
        if(this.formIsValid()){
            let response = await listarAtendimentos(formatDate(date), agendamento, this.props.usuario.prestador, paciente, situacao, page, linesPerPage, direction);
            if(response && !response.empty){
                let atendimentos = this.state.atendimentos;
                atendimentos.data = response.content;
                atendimentos.totalElements = response.totalElements;
                atendimentos.totalPages = response.totalPages;
                atendimentos.pageNumber = response.pageable.pageNumber;
                atendimentos.pageSize = response.pageable.pageSize;
                this.setState({ atendimentos: atendimentos })
            } else {
                this.setState({ atendimentos: {
                        data: [],
                        totalElements: 0,
                        totalPages: 0,
                        pageNumber: 0,
                        pageSize: 0,
                    }})
            }
        }

        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    render() {
        this.props.modal.confirm ? this.handleActionModal() : null;
        return (
            <Container maxWidth="xl">
                 <div className="Spacer"></div>
                <Typography color="textSecondary" variant="body1" gutterBottom>
                    <span className="TitlePage">Assistência Social - Atendimentos</span>
                </Typography>
                <div className="Spacer"></div>
                <Grid container>
                    <Grid item={true} sm={12} xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item={true} sm={12} xs={12} md={12}>
                        <Grid container alignContent="center" alignItems="center">
                            <Grid item={true} sm={11} xs={11}>
                                <Typography color="textSecondary" variant="body1" gutterBottom>
                                    <span className="TitleCard">Filtros</span>
                                </Typography>
                            </Grid>
                            <Grid item={true} sm={1} xs={1}>
                                <IconButton
                                    onClick={() => this.setState({ filterExpanded: !this.state.filterExpanded })}
                                    style={{ textAlign: 'end', float: 'right'}}
                                    size="large">
                                    {
                                        this.state.filterExpanded
                                        ?
                                        <ExpandLessIcon/>
                                        :
                                        <ExpandMoreIcon />
                                    }
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Collapse in={this.state.filterExpanded} style={{width:'100%'}} timeout="auto">
                        <Grid container  spacing={1}   >
                            <Grid item={true} sm={12} xs={12} md={6} >
                                <TextField
                                  
                                    label="Agendamento"
                                    name="agendamento"
                                    type="number"
                                    variant="outlined"
                                    value={this.state.agendamento}
                                    onChange={this.onChange}
                                    fullWidth={true}
                                    size="small"

                                />
                            </Grid>
                            <Grid item={true} sm={12} xs={12} md={6}>
                                <TextFieldAutocomplete label="Paciente" actionFilter={filtrarPaciente} actionChangeOption={this.changePaciente} getOptionLabel={(option) => option.matricula + ' - ' + option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))}/>
                            </Grid>
                        </Grid>

                        <Grid container margin="dense" justifyContent="center" >
                            <Grid item={true} sm={12} xs={12} md={6}>
                                <FormControl fullWidth>
                                    <Typography>Situação</Typography>
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            onChange={this.changeSituacao}
                                            value="1"
                                            checked={this.state.situacao.some((val) => val == "1")}
                                            control={<Checkbox color="primary"/>}
                                            label="Aguardando"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            onChange={this.changeSituacao}
                                            value="2"
                                            checked={this.state.situacao.some((val) => val == "2")}
                                            control={<Checkbox color="primary"/>}
                                            label="Em Atendimento"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            onChange={this.changeSituacao}
                                            value="3"
                                            checked={this.state.situacao.some((val) => val == "3")}
                                            control={<Checkbox color="primary"/>}
                                            label="Cancelado"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            onChange={this.changeSituacao}
                                            value="4"
                                            checked={this.state.situacao.some((val) => val == "4")}
                                            control={<Checkbox color="primary"/>}
                                            label="Finalizado"
                                            labelPlacement="end"
                                        />
                                       
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item={true} sm={12} xs={12} md={6} display="flex">
                                <Grid container  spacing={1} >
                                    <Grid item={true} sm={12} xs={12} md={12}>
                                        <DateInput label="Data" value={this.state.date} handleDateChange={this.handleDate}/>
                                    </Grid>
                                </Grid>
                            {/* </Grid>
                            <Grid item={true} sm={12} xs={12} md={3}> */}
                                {/* <Grid container  spacing={1}> */}
                                    <Grid item={true} sm={12} xs={12} md={12} margin="dense">
                                        <Button  variant="contained" color="primary" fullWidth={true} endIcon={<SearchIcon/>} onClick={() => this.pesquisarAtendimento(0, 20, 'ASC')}>
                                            PESQUISAR
                                        </Button>
                                    </Grid>
                                {/* </Grid> */}
                            </Grid>
                        </Grid>
                        </Collapse>
                    </Grid>
                    

                    <Grid item={true} sm={12} xs={12}>
                        <Divider/>
                    </Grid>
                    <div className="Spacer"></div>

                    <Grid container >
                        <Table
                            rowsPerPage={this.state.atendimentos.pageSize}
                            pageNumber={this.state.atendimentos.pageNumber}
                            totalElements={this.state.atendimentos.totalElements}
                            totalPages={this.state.atendimentos.totalPages}
                            changePage={this.pesquisarAtendimento}
                            orderBy="agendamento"
                            headers={[
                                { id: 'agendamento', numeric: false, disablePadding: false, sortable: true, label: 'Agendamento' },
                                { id: 'paciente', numeric: false, disablePadding: false, sortable: true, label: 'Paciente' },
                                { id: 'matricula', numeric: false, disablePadding: false, sortable: true, label: 'Matrícula' },
                                { id: 'data', numeric: false, disablePadding: false, sortable: true, label: 'Data' },
                                { id: 'hora', numeric: false, disablePadding: false, sortable: true, label: 'Hora' },
                                { id: 'situacao', numeric: false, disablePadding: false, sortable: true, label: 'Situação' },
                                { id: 'acoes', numeric: false, disablePadding: false, sortable: false, label: 'Ações' },
                            ]}

                            rows={formatarListaAtendimentos(this.state.atendimentos, this.props.usuario, this.state.dataAtual, this.atender, this.cancelar)}

                        />
                    </Grid>
                </Grid>

            </Container>
        );
    }
}


const mapStateToProps = state => ({ usuario: state.usuario, modal: state.modal });
const mapDispatchToProps = dispatch => bindActionCreators({
    openModal,
    changeModal,
    fetchBackdrop,
    resetConfirmModal
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ConsultaPage);
