import React, { Component } from 'react';
import Container from '@mui/material/Container';
import {
    Button,
    Checkbox,
    Collapse,
    Divider,
    Fab,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Icon,
    IconButton,
    TextField, Tooltip,
    Typography
} from '@mui/material';
import './../index.css';
import Table from '../../../../components/table/table';
import DateInput from '../../../../components/general/dateInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal, changeModal, resetConfirmModal } from '../../../../actions/geral/actions';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextFieldAutocomplete from '../../../../components/general/autocomplete';
import { fetchBackdrop } from '../../../../actions/geral/actions';
import AgendamentoForm from './AgendamentoForm';
import SearchIcon from '@mui/icons-material/Search';
import {
    filtrarPaciente,
    filtrarPrestador,
    listarAgendamentos,
    editarAgendamento,
    atualizarAgendamento
} from '../../../../actions/atendimento/assistencia_social/actions';
import { formatarListaAgendamentos } from '../../../../services/listFormat';
import { formatDate } from '../../../../services/general';
import {toast} from "react-toastify";
import { dataServidor } from '../../../../actions/configuracao/actions';
import ConfirmacaoBiometrica from './ConfirmacaoBiometrica';


const INITIAL_STATE = {
    agendamento: '',
    situacao:['A'],
    date: new Date(),
    dataAtual: null,
    modalCadastroOpen: false,
    modalEditarOpen: false,
    modalConfirmarOpen: false,
    filterExpanded: true,
    prestador: null,
    paciente: null,
    especialidade: 125,
    event: '',
    idAgendamento: 0,
    idPaciente: 0,
    agendamentos: {
        data: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 0,
        first: false,
        last: false,
    }
};


class RecepcaoPage extends Component {

    constructor(props){
        super(props);
        this.state = INITIAL_STATE;
    }

    async componentDidMount() {
        document.title = "Assistência Social - Recepção";
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);
        let data = await dataServidor();
        this.setState({ data: data, dataAtual: data });
        let response = await listarAgendamentos(formatDate(data), this.state.agendamento, this.state.especialidade, this.state.prestador, this.state.paciente, this.state.situacao);        
        if(!response.empty){
            let agendamentos = this.state.agendamentos;
            agendamentos.data = response.content;
            agendamentos.totalElements = response.totalElements;
            agendamentos.totalPages = response.totalPages; 
            agendamentos.pageNumber = response.pageable.pageNumber;
            agendamentos.pageSize = response.pageable.pageSize;
            this.setState({ agendamentos: agendamentos });
        } else {
            let agendamentos = this.state.agendamentos;
            agendamentos.data = [];
            this.setState({ agendamentos: agendamentos });
        }
        this.props.fetchBackdrop('BACKDROP_FETCHED', false);
    }

    componentWillUnmount(){
        this.setState(INITIAL_STATE);
    }

    handleDate = (date) => {
        this.setState({ date: date });
    }

    changePaciente = (paciente) => {
        this.setState({paciente : paciente})
    } 

    changePrestador = (prestador) => {
        this.setState({prestador : prestador})
    } 

    openModalCadastro = () => {
        this.setState({ modalCadastroOpen: true });
    }

    closeModalCadastro = () => {
        this.setState({ modalCadastroOpen: false });
    }

    openModalEditar = () => {
        this.setState({ modalEditarOpen: true });
    }

    closeModalEditar = () => {
        this.setState({ modalEditarOpen: false });
    }

    editar = (val) => {
        this.setState({ event: `editar`, idAgendamento: val.id })
        this.props.changeModal(
            'Editar Agendamento',
            `Deseja realmente editar o agendamento nº ${val.id} ?`, 
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }

    cancelar = (val) => {
        this.setState({ event: `cancelar`, idAgendamento: val.id })
        this.props.changeModal(
            'Cancelar Agendamento', 
            `Deseja realmente cancelar o agendamento nº ${val.id} ?`,                
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }

    confirmarChegada = (val) => {
        this.setState({ event: `chegada`, idAgendamento: val.id, idPaciente: val.idPaciente, modalConfirmarOpen: true });
        // this.setState({ event: `chegada`, idAgendamento: val.id, idPaciente: val.idPaciente })
        // this.props.changeModal(
        //     'Corfimação de Presença do Paciente', 
        //     `Deseja realmente confirmar a chegada do paciente?`,                
        //     'sm', 
        //     'SIM', 
        //     'NÃO'
        // );
        // this.props.openModal();
    }

    cancelarChegada = (val) => {
        this.setState({ event: `cancelarChegada`, idAgendamento: val.id, idPaciente: val.idPaciente })
        this.props.changeModal(
            'Cancelamento de Presença do Paciente', 
            `Deseja realmente cancelar a chegada do paciente?`,                
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }

    atender = (val) => {
        this.setState({ event: `atender`, idAgendamento: val.id })
        this.props.changeModal(
            'Realizar Atendimento', 
            `Deseja realmente iniciar o atendimento?`,
            'sm', 
            'SIM', 
            'NÃO'
        );
        this.props.openModal();
    }

    criarAgendamento = () => {
        this.openModalCadastro();
    }

    handleActionModal = async () => {
        let response;
        switch(this.state.event){
            case 'editar':
                this.props.resetConfirmModal();
                this.openModalEditar();
                break;
            case 'cancelar':
                this.props.fetchBackdrop('BACKDROP_FETCHED', true);
                response = await atualizarAgendamento(this.state.idAgendamento, null, "C", null);

                if(response.status === 204){
                    this.props.resetConfirmModal();
                    this.pesquisarAgendamento(0, 'ASC');
                    toast.success('Agendamento cancelado!');
                } else {
                    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                    this.props.resetConfirmModal();
                    toast.error(response.message)
                }
                break;
            case 'chegada':
                this.props.fetchBackdrop('BACKDROP_FETCHED', true);
                response = await atualizarAgendamento(this.state.idAgendamento, this.state.idPaciente, null, 1);
    
                if(response.status === 204){
                    this.props.resetConfirmModal();
                    await this.pesquisarAgendamento(0, 'ASC');
                    toast.success('Chegada do paciente confirmada!');
                } else {
                    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                    this.props.resetConfirmModal();
                    toast.error(response.message)
                }
                break;
            case 'cancelarChegada':
                this.props.fetchBackdrop('BACKDROP_FETCHED', true);
                response = await atualizarAgendamento(this.state.idAgendamento, this.state.idPaciente, null, 3);
        
                if(response.status === 204){
                    this.props.resetConfirmModal();
                    await this.pesquisarAgendamento(0, 'ASC');
                    toast.success('Chegada do paciente cancelada!');
                } else {
                    this.props.fetchBackdrop('BACKDROP_FETCHED', false);
                    this.props.resetConfirmModal();
                    toast.error(response.message)
                }
                break;
            case 'atender':
                this.props.fetchBackdrop('BACKDROP_FETCHED', true);                
                this.props.history.push(`/atendimento/assistencia-social/consulta/${this.state.idAgendamento}`);
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

    filtroSituacoes = (situacoes) => {
        let situacoesAtend = [];
        let situacoesAgend = [];
        
        situacoes.map((situacao, index) =>{
            if(situacao === 'A' || situacao === 'C'){
                situacoesAgend.push(situacao);
            }
            if(situacao === 'AG'){
                situacoesAtend.push('1');
            }

            if(situacao === 'E'){
                situacoesAtend.push('2');
            }

            if(situacao === 'R'){
                situacoesAtend.push('4');
            }

        });

        return [situacoesAgend, situacoesAtend];
    }

    formIsValid = () => {
        const {date, situacao} = this.state;
        let valid = true;
        let situacoes = this.filtroSituacoes(situacao);
        let situacoesAgendamento = situacoes[0];
        let situacoesAtendimento = situacoes[1];
        
        if(!date){
            toast.warn('É necessário inserir uma data para fazer a busca!');
            valid = false;
        }

        if (valid && !situacoesAgendamento.length && !situacoesAtendimento.length){
            toast.warning('Selecione pelo menos um tipo de situação para filtrar os agendamentos!');
            valid = false;
        }

        return valid;
        
    }


    pesquisarAgendamento = async (page) => {
        const {agendamento, especialidade, date, paciente, prestador, situacao} = this.state;
        this.props.fetchBackdrop('BACKDROP_FETCHED', true);

        let situacoes = this.filtroSituacoes(situacao);
        let situacoesAgendamento = situacoes[0];
        let situacoesAtendimento = situacoes[1];

        if(this.formIsValid()){
            let response = await listarAgendamentos(formatDate(date), agendamento, especialidade, prestador, paciente, situacoesAgendamento, situacoesAtendimento, page, null);
            if(response && !response.empty){
                let agendamentos = this.state.agendamentos;
                agendamentos.data = response.content;
                agendamentos.totalElements = response.totalElements;
                agendamentos.totalPages = response.totalPages; 
                agendamentos.pageNumber = response.pageable.pageNumber;
                agendamentos.pageSize = response.pageable.pageSize;
                
                this.setState({ agendamentos: agendamentos })
            } else {
                this.setState({ agendamentos: {
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

    renderAgendamentoForm = () => {
        return this.state.modalCadastroOpen ?
            <AgendamentoForm open={this.state.modalCadastroOpen} closeModal={this.closeModalCadastro} actionSave={this.pesquisarAgendamento}/>
            :
            null;
    }

         
    render() {
        this.props.modal.confirm && this.handleActionModal()
         
        return (
            <Container maxWidth="xl">            
                { this.renderAgendamentoForm() }
                { this.state.modalConfirmarOpen && <ConfirmacaoBiometrica pacienteId={this.state.idPaciente} open={this.state.modalConfirmarOpen} closeModal={()=> this.setState({modalConfirmarOpen: false})} /> }
                <div className="Spacer"></div>
                <Typography color="textSecondary" variant="body1" gutterBottom>
                    <span className="TitlePage">Assistência Social - Agendamentos</span>
                </Typography>
                <div className="Spacer"></div>
                <Grid container>   
                    
                        <Grid item={true} sm={12} xs={12}>
                            <Divider/>
                        </Grid>
                        <Grid item={true} sm={12} xs={12}>
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
                            <Grid container spacing={1}>                                
                                <Grid item={true} sm={12} xs={12} md={4}>
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
                                <Grid item={true} sm={12} xs={12} md={4}>
                                    <TextFieldAutocomplete label="Paciente" actionFilter={filtrarPaciente} value={this.state.paciente} actionChangeOption={this.changePaciente} getOptionLabel={(option) => option.nome ? option.matricula + ' - ' + option.nome : ""} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()) || item.matricula.toString().includes(object.inputValue))}/>
                                </Grid>
                                <Grid item={true} sm={12} xs={12} md={4}>
                                    <TextFieldAutocomplete label="Prestador" actionFilter={filtrarPrestador} minSizeFilter={0} actionChangeOption={this.changePrestador} getOptionLabel={(option) => option.nome} filterOptions={(options, object) => options.filter((item) => item.nome.toUpperCase().includes(object.inputValue.toString().toUpperCase()))}/>
                                </Grid>
                            </Grid>
                            
                            <Grid container >
                                <Grid item={true} sm={12} xs={12} md={6}>
                                    <FormControl style={{paddingLeft:'6px'}}>
                                        <Typography>Situação</Typography>
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                onChange={this.changeSituacao}
                                                value="A"
                                                checked={this.state.situacao.some((val) => val === "A")}
                                                control={<Checkbox color="primary"/>}
                                                label="Agendado"
                                                labelPlacement="end"
                                            />                                          
                                            <FormControlLabel
                                                onChange={this.changeSituacao}
                                                value="AG"
                                                checked={this.state.situacao.some((val) => val === "AG")}
                                                control={<Checkbox color="primary"/>}
                                                label="Aguardando"
                                                labelPlacement="end"
                                            />                                            
                                            <FormControlLabel
                                                onChange={this.changeSituacao}
                                                value="E"
                                                checked={this.state.situacao.some((val) => val === "E")}
                                                control={<Checkbox color="primary"/>}
                                                label="Em atendimento"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                onChange={this.changeSituacao}
                                                value="R"
                                                checked={this.state.situacao.some((val) => val === "R")}
                                                control={<Checkbox color="primary"/>}
                                                label="Realizado"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                onChange={this.changeSituacao}
                                                value="C"
                                                checked={this.state.situacao.some((val) => val === "C")}
                                                control={<Checkbox color="primary"/>}
                                                label="Cancelado"
                                                labelPlacement="end"
                                            />                                        
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item={true} sm={12} xs={12} md={6} display="flex">
                                    <Grid container  spacing={1}>
                                        <Grid item={true} sm={12} xs={12} md={12}>
                                            <DateInput label="Data" value={this.state.date} handleDateChange={this.handleDate}/>                                   
                                        </Grid>
                                    </Grid>                           
                                {/* </Grid>
                                <Grid item={true} sm={12} xs={12} md={3}>
                                    <Grid container  spacing={1}> */}
                                        <Grid item={true} sm={12} xs={12} md={12} margin="dense">
                                            <Button variant="contained" color="primary" endIcon={<SearchIcon/>} fullWidth={true} onClick={() => this.pesquisarAgendamento(0, 'ASC')}>
                                                PESQUISAR
                                            </Button>
                                        </Grid>
                                    {/* </Grid> */}
                                </Grid>
                            </Grid>
                            <div className="Spacer"></div>
                        </Collapse>
                        </Grid>
                        
                        <Grid item={true} sm={12} xs={12}>                            
                            <Divider/>
                        </Grid>
                    <Grid container spacing={1}>
                        <Grid item={true} sm={9} xs={9} md={9}/>
                        <Grid item={true} sm={3} xs={3} md={3}>
                            <span className="ButtonPrimary">
                                <Tooltip title="Criar um novo agendamento" placement="bottom-end">
                                    <Fab size="small" style={{position: "fixed", bottom: 25, right: 25, zIndex: 100}}  aria-label="add" onClick={this.criarAgendamento}>
                                       <AddIcon />
                                    </Fab>                                  
                                </Tooltip>


                            </span>
                        </Grid> 
                    </Grid>
                    
                    <Grid container >
                        <Table 
                            rowsPerPage={this.state.agendamentos.pageSize}
                            pageNumber={this.state.agendamentos.pageNumber}
                            totalElements={this.state.agendamentos.totalElements}
                            totalPages={this.state.agendamentos.totalPages}
                            changePage={this.pesquisarAgendamento}
                            orderBy="agendamento"
                            headers={[
                                { id: 'agendamento', numeric: false, disablePadding: false, sortable: true, label: 'Agendamento' },
                                { id: 'paciente', numeric: false, disablePadding: false, sortable: true, label: 'Paciente' },
                                { id: 'matricula', numeric: false, disablePadding: false, sortable: true, label: 'Matrícula' },
                                { id: 'data', numeric: false, disablePadding: false, sortable: true, label: 'Data' },
                                { id: 'hora', numeric: false, disablePadding: false, sortable: true, label: 'Hora' },
                                { id: 'prestador', numeric: false, disablePadding: false, sortable: true, label: 'Prestador' },
                                { id: 'situacao', numeric: false, disablePadding: false, sortable: true, label: 'Situação' },
                                { id: 'acoes', numeric: false, disablePadding: false, sortable: false, label: 'Ações' },
                            ]}

                            rows={formatarListaAgendamentos(this.state.agendamentos, this.props.usuario, this.state.dataAtual, this.atender, this.editar, this.cancelar, this.confirmarChegada, this.cancelarChegada)}
                                    
                        />
                    </Grid> 
                    <div className="Spacer"></div>              
                    <div className="Spacer"></div>              
                    <div className="Spacer"></div>              
                </Grid>          
            
            </Container>
        );
    }
}


const mapStateToProps = state => ({ prestador: state.prestador, paciente: state.paciente, modal: state.modal, usuario: state.usuario });
const mapDispatchToProps = dispatch => bindActionCreators({ 
    openModal,
    changeModal, 
    fetchBackdrop,
    listarAgendamentos,
    editarAgendamento,
    resetConfirmModal
 }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RecepcaoPage);
